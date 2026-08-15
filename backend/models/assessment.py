"""
Pydantic schemas for the adaptive diagnostic assessment.

`QuestionType` intentionally goes beyond MCQ — the product's core premise is
that gap-detection needs short-answer, scenario, conceptual, and applied
reasoning, not just multiple choice.
"""

from enum import Enum
from typing import List, Optional, Dict
from pydantic import BaseModel


class QuestionType(str, Enum):
    mcq = "mcq"
    short_answer = "short-answer"
    scenario = "scenario"
    conceptual = "conceptual"
    application = "application"


class Difficulty(str, Enum):
    easy = "Easy"
    medium = "Medium"
    hard = "Hard"


class Question(BaseModel):
    id: str
    type: QuestionType
    difficulty: Difficulty
    prompt: str
    options: Optional[List[str]] = None  # only present for `mcq`


class AssessmentSubmission(BaseModel):
    """Body for POST /assessment/{topic_id}/submit"""
    answers: Dict[str, str]  # question_id -> student's raw answer text
