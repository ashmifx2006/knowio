"""
Aggregates every feature router into one `api_router` that main.py mounts
under the `/api` prefix. Add new route modules here as the backend grows.
"""

from fastapi import APIRouter

from routes import auth, subjects, assessment, analysis, learning_path, progress

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(subjects.router, prefix="/subjects", tags=["Subjects & Topics"])
api_router.include_router(assessment.router, prefix="/assessment", tags=["Diagnostic Assessment"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["Knowledge Mirror Analysis"])
api_router.include_router(learning_path.router, prefix="/learning-path", tags=["Learning Path"])
api_router.include_router(progress.router, prefix="/progress", tags=["Progress & Profile"])
