"""
Pydantic schemas for student accounts and auth payloads.
Mirrors the `students` collection described in database/schema.md.
"""

from pydantic import BaseModel, EmailStr
from typing import List, Optional


class StudentBase(BaseModel):
    name: str
    email: EmailStr


class StudentRegister(StudentBase):
    password: str


class StudentLogin(BaseModel):
    email: EmailStr
    password: str


class StudentOut(StudentBase):
    id: str
    avatar_initials: str
    streak_days: int
    today_progress_percent: int
    topics_learned: int
    weak_areas: List[str] = []

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    token: str
    student: StudentOut
