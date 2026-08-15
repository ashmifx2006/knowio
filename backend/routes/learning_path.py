"""Personalized learning path routes."""

from fastapi import APIRouter
from typing import List
from models.knowledge_mirror import LearningPathDay

router = APIRouter()

_MOCK_PATH = [
    LearningPathDay(day=1, title="Revise Functions", focus="Parameter passing & return values", minutes=25, done=True),
    LearningPathDay(day=2, title="Practice Recursion", focus="Base case vs recursive case design", minutes=35, done=True),
    LearningPathDay(day=3, title="Coding Problems", focus="Factorial, Fibonacci, sum of list", minutes=40, done=False),
    LearningPathDay(day=4, title="Mock Interview", focus="Explain your recursive solutions out loud", minutes=20, done=False),
]


@router.get("/{topic_id}", response_model=List[LearningPathDay])
def get_learning_path(topic_id: str):
    """
    GET /api/learning-path/{topic_id}

    TODO: generate this plan dynamically from the student's stored
    KnowledgeMirrorReport (weaknesses + missing_prerequisites) rather than
    returning a fixed mock sequence.
    """
    return _MOCK_PATH
