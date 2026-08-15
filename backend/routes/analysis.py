"""Routes for re-fetching a previously generated Knowledge Mirror report."""

from fastapi import APIRouter
from models.knowledge_mirror import KnowledgeMirrorReport, Dimension

router = APIRouter()


@router.get("/{topic_id}", response_model=KnowledgeMirrorReport)
def get_knowledge_mirror(topic_id: str):
    """
    GET /api/analysis/{topic_id}

    TODO: fetch the most recent stored report for this student + topic from
    the `knowledge_mirrors` collection instead of returning this mock.
    """
    return KnowledgeMirrorReport(
        topic="Functions & Recursion",
        subject="Python",
        dimensions=[
            Dimension(key="definitions", label="Definitions", score=86),
            Dimension(key="understanding", label="Understanding", score=64),
            Dimension(key="application", label="Application", score=47),
            Dimension(key="criticalThinking", label="Critical Thinking", score=38),
            Dimension(key="confidence", label="Confidence", score=71),
            Dimension(key="problemSolving", label="Problem Solving", score=42),
        ],
        strengths=["Definitions", "Loop syntax", "Variable scope basics"],
        weaknesses=["Recursion", "Base case design", "Stack depth reasoning"],
        misconceptions=[
            'Believes "return" and "print" are interchangeable',
            "Assumes recursion always needs two base cases",
        ],
        missing_prerequisites=["Call stack fundamentals", "Functions (parameter passing)"],
    )
