"""Subject & topic listing routes. Backed by mock data until MongoDB is wired in."""

from fastapi import APIRouter, HTTPException
from typing import List
from models.subject import Subject, Topic

router = APIRouter()

_SUBJECTS = [
    Subject(id="python", name="Python", icon="🐍", mastery=74, topic_count=12),
    Subject(id="ai", name="Artificial Intelligence", icon="🧠", mastery=58, topic_count=10),
    Subject(id="ml", name="Machine Learning", icon="📈", mastery=49, topic_count=14),
    Subject(id="dbms", name="DBMS", icon="🗄️", mastery=66, topic_count=11),
    Subject(id="os", name="Operating Systems", icon="⚙️", mastery=41, topic_count=9),
    Subject(id="ds", name="Data Structures", icon="🌲", mastery=70, topic_count=13),
]

_TOPICS_BY_SUBJECT = {
    "python": [
        Topic(id="variables", name="Variables", mastery=88, subject_id="python"),
        Topic(id="loops", name="Loops", mastery=80, subject_id="python"),
        Topic(id="functions", name="Functions", mastery=52, subject_id="python"),
        Topic(id="oop", name="OOP", mastery=61, subject_id="python"),
        Topic(id="file-handling", name="File Handling", mastery=44, subject_id="python"),
        Topic(id="recursion", name="Recursion", mastery=28, subject_id="python"),
    ],
}


@router.get("", response_model=List[Subject])
def list_subjects():
    """GET /api/subjects — list all subjects with mastery snapshot."""
    return _SUBJECTS


@router.get("/{subject_id}/topics", response_model=List[Topic])
def list_topics(subject_id: str):
    """GET /api/subjects/{subject_id}/topics"""
    topics = _TOPICS_BY_SUBJECT.get(subject_id)
    if topics is None:
        raise HTTPException(status_code=404, detail=f"No topics found for subject '{subject_id}'.")
    return topics
