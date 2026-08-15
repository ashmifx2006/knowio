"""
Pydantic schemas for the diagnosis output: the Knowledge Mirror report and
the day-by-day personalized learning path generated from it.
"""

from typing import List
from pydantic import BaseModel


class Dimension(BaseModel):
    key: str
    label: str
    score: int  # 0-100


class KnowledgeMirrorReport(BaseModel):
    topic: str
    subject: str
    dimensions: List[Dimension]
    strengths: List[str]
    weaknesses: List[str]
    misconceptions: List[str]
    missing_prerequisites: List[str]


class LearningPathDay(BaseModel):
    day: int
    title: str
    focus: str
    minutes: int
    done: bool = False
