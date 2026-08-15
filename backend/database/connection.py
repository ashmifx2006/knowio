"""
MongoDB connection scaffold (design only — not wired into routes yet).

Once ready to go live, import `get_database()` inside route files and
replace the in-memory mock lists with real queries against these
collections, e.g.:

    from database.connection import get_database
    db = get_database()
    subject_docs = await db.subjects.find().to_list(length=100)
"""

import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "ai_learning_mirror")

_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(MONGO_URI)
    return _client


def get_database():
    return get_client()[DB_NAME]
