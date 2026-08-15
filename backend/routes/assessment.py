"""
Diagnostic assessment routes.

`submit_assessment` is the most important seam in this prototype: it's
where the real product would hand student answers to a diagnosis engine
(an LLM-backed evaluator, in production) that produces a KnowledgeMirrorReport.
Right now it just returns a fixed mock report.
"""

from fastapi import APIRouter, HTTPException
from typing import List

from models.assessment import Question, QuestionType, Difficulty, AssessmentSubmission
from models.knowledge_mirror import KnowledgeMirrorReport, Dimension

router = APIRouter()

_QUESTION_BANK = [
    Question(id="q1", type=QuestionType.conceptual, difficulty=Difficulty.easy,
             prompt="In your own words, what is a function used for in programming?"),
    Question(id="q2", type=QuestionType.mcq, difficulty=Difficulty.easy,
             prompt="Which keyword defines a function in Python?",
             options=["func", "def", "function", "lambda-only"]),
    Question(id="q3", type=QuestionType.short_answer, difficulty=Difficulty.medium,
             prompt="What is the difference between a parameter and an argument?"),
    Question(id="q4", type=QuestionType.scenario, difficulty=Difficulty.medium,
             prompt="A friend's function keeps returning None even though it prints the right value. "
                    "What mistake are they likely making?"),
    Question(id="q5", type=QuestionType.application, difficulty=Difficulty.hard,
             prompt="Write the base case and recursive case you would use to sum a list of numbers recursively."),
    Question(id="q6", type=QuestionType.conceptual, difficulty=Difficulty.hard,
             prompt="Why can excessive recursion cause a program to crash, and what mechanism is responsible?"),
]


@router.get("/{topic_id}/questions", response_model=List[Question])
def get_questions(topic_id: str):
    """
    GET /api/assessment/{topic_id}/questions

    TODO: select/generate an adaptive question set scoped to `topic_id`,
    increasing difficulty based on the student's running performance.
    """
    return _QUESTION_BANK


@router.post("/{topic_id}/submit", response_model=KnowledgeMirrorReport)
def submit_assessment(topic_id: str, submission: AssessmentSubmission):
    """
    POST /api/assessment/{topic_id}/submit

    TODO: send `submission.answers` to the diagnosis engine, persist the
    attempt in MongoDB (see `assessments` collection in database/schema.md),
    and return the freshly generated KnowledgeMirrorReport.
    """
    if not submission.answers:
        raise HTTPException(status_code=400, detail="No answers were submitted.")

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
