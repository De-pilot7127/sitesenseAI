# SiteSense AI

SiteSense AI is a construction intelligence platform with a React frontend and
a Python FastAPI backend.

## Repository layout

```text
frontend/       React and Vite application
main.py         FastAPI application entry point
database.py     SQLAlchemy database configuration
models.py       Database models
schemas.py      API schemas
analysis.py     Analysis routes and service boundaries
auth.py         Authentication service boundaries
gemma.py        AI provider integration boundary
requirements.txt Python dependencies
```

## Frontend

Requirements:

- Node.js 20 or newer
- npm

```bash
cd frontend
npm install
npm run dev
```

The frontend is available at `http://localhost:5173`.

## Backend

Requirements:

- Python 3.13 or newer
- PostgreSQL 16 or newer

Create and activate a virtual environment, install dependencies, and configure
the environment:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Set `DATABASE_URL` and any required AI provider configuration before starting:

```bash
uvicorn main:app --reload
```

The API is available at `http://localhost:8000`. The health endpoint is
`GET /health`.

## Production checks

- Never commit `.env` files or API credentials.
- Restrict FastAPI CORS to the deployed frontend origin.
- Use database migrations before production schema changes.
- Backend and frontend should be deployed or developed independently.
