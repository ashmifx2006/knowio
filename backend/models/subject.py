"""Pydantic schemas for subjects and topics."""

from pydantic import BaseModel


class Subject(BaseModel):
    id: str
    name: str
    icon: str
    mastery: int
    topic_count: int


class Topic(BaseModel):
    id: str
    name: str
    mastery: int
    subject_id: str
