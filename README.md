# SiteSense Backend

FastAPI backend for SiteSense. It provides the API foundation, PostgreSQL
database integration, and the future boundaries for authentication, analysis,
and Gemma AI integration.

## Requirements

- Python 3.13 or newer
- PostgreSQL 16 or newer
- Docker (recommended for local PostgreSQL and deployment)

## Local development

Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Set the database connection:

```bash
export DATABASE_URL="postgresql+psycopg://sitesense:sitesense@localhost:5432/sitesense"
```

Start PostgreSQL separately, then run the API:

```bash
uvicorn main:app --reload
```

The API is available at `http://localhost:8000`. Verify it with:

```bash
curl http://localhost:8000/health
```

The application creates the initial SQLAlchemy tables on startup. Production
schema migrations should be introduced before making breaking schema changes.

## Docker

Build and run the API image:

```bash
docker build -t sitesense-api .
docker run --rm -p 8000:8000 \
  -e DATABASE_URL="$DATABASE_URL" \
  sitesense-api
```

The API container does not include PostgreSQL. Use a managed PostgreSQL
database or a separate PostgreSQL service.

## Deploying to DigitalOcean

DigitalOcean App Platform is the simplest deployment path for this container:

1. Push this repository to GitHub.
2. In DigitalOcean, create an App and select the GitHub repository.
3. Configure the component as a Docker service using this repository's
   `Dockerfile`.
4. Set the HTTP port to `8000`.
5. Add a DigitalOcean managed PostgreSQL database to the app, or provide an
   external PostgreSQL connection.
6. Add `DATABASE_URL` as an encrypted runtime environment variable.
7. Add `GEMINI_API_KEY` as an encrypted runtime environment variable when
   Gemma integration is enabled.
8. Set `GEMMA_MODEL` to the exact model identifier used by the Gemini API.
9. Configure a health check at `/health`.
10. Restrict CORS in `main.py` to the deployed frontend origin before
    production.

For production, use a managed database, backups, TLS, and secret environment
variables. Do not commit `.env` files, API keys, or database passwords.

## API foundation

- `GET /health` — service health response
- `backend/database.py` — SQLAlchemy engine and session dependency
- `backend/models.py` — initial `User` and `Analysis` models
- `backend/gemma.py` — reserved Gemma integration boundary

Authentication and AI analysis routes are intentionally reserved for later
development phases.
