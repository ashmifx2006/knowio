"""
Knowio — FastAPI entrypoint.

This is a STRUCTURE-ONLY backend for the prototype: every route currently
returns mock JSON (see the `mock_data` module in each route file) instead of
hitting MongoDB. The route signatures, request/response models, and folder
layout mirror the real system so the mock responses can be swapped for real
database + AI-diagnosis calls without changing the frontend contract.

Run locally:
    pip install -r requirements.txt
    uvicorn main:app --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import api_router

app = FastAPI(
    title="Knowio API",
    description="Diagnostic learning assistant API — identifies knowledge gaps instead of just answering questions.",
    version="0.1.0",
)

# Allow the Vite dev server (and, later, the deployed frontend) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/")
def read_root():
    """Simple health check / welcome route."""
    return {"message": "Knowio API is running.", "docs": "/docs"}
