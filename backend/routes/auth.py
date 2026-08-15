"""
Auth routes — structure only. Replace the mock logic with real password
hashing (passlib), JWT issuing (python-jose), and a MongoDB lookup against
the `students` collection (see database/schema.md) when going live.
"""

from fastapi import APIRouter, HTTPException
from models.student import StudentRegister, StudentLogin, AuthResponse, StudentOut

router = APIRouter()

_MOCK_STUDENT = StudentOut(
    id="stu_1042",
    name="Ashmi Rao",
    email="ashmi@college.edu",
    avatar_initials="AR",
    streak_days=6,
    today_progress_percent=62,
    topics_learned=18,
    weak_areas=["Recursion", "Normalization", "Process Scheduling"],
)


@router.post("/register", response_model=AuthResponse)
def register(payload: StudentRegister):
    """Create a new student account. TODO: hash password, insert into MongoDB."""
    if not payload.name or not payload.email or not payload.password:
        raise HTTPException(status_code=400, detail="Name, email, and password are all required.")
    student = _MOCK_STUDENT.model_copy(update={"name": payload.name, "email": payload.email})
    return AuthResponse(token="mock-jwt-token", student=student)


@router.post("/login", response_model=AuthResponse)
def login(payload: StudentLogin):
    """Authenticate a student. TODO: verify password hash against MongoDB record."""
    return AuthResponse(token="mock-jwt-token", student=_MOCK_STUDENT)
