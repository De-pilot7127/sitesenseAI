from contextlib import asynccontextmanager

import os

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

load_dotenv()

from database import Base, engine
from database import get_db
from gemma import analyze_with_gemma
from models import Analysis, User
from schemas import AnalysisCreate, AnalysisResponse, HealthResponse


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="SiteSense API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "FRONTEND_URL", "http://localhost:5173,http://127.0.0.1:5173"
        ).split(",")
        if origin.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", service="sitesense-api")


@app.get("/api/v1/health", response_model=HealthResponse)
def api_health() -> HealthResponse:
    return HealthResponse(status="ok", service="sitesense-api")


@app.post("/api/v1/analyses", response_model=AnalysisResponse)
def create_analysis(
    request: AnalysisCreate,
    db: Session = Depends(get_db),
) -> AnalysisResponse:
    findings, recommendations = analyze_with_gemma(request.input_text)
    analysis = Analysis(
        user_id=1,
        input_text=request.input_text,
        findings=findings,
        recommendations=recommendations,
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return AnalysisResponse.model_validate(analysis)
