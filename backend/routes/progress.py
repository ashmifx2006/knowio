"""Progress-chart and profile routes."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class GrowthPoint(BaseModel):
    week: str
    understanding: int
    application: int


class ImprovementPoint(BaseModel):
    week: str
    gapClosed: int


class GapReductionPoint(BaseModel):
    subject: str
    before: int
    after: int


class ProgressCharts(BaseModel):
    growthSeries: List[GrowthPoint]
    weeklyImprovement: List[ImprovementPoint]
    gapReduction: List[GapReductionPoint]


@router.get("/me", response_model=ProgressCharts)
def get_progress_charts():
    """
    GET /api/progress/me

    TODO: aggregate real historical assessment scores per student from
    MongoDB instead of returning this fixed mock series.
    """
    return ProgressCharts(
        growthSeries=[
            GrowthPoint(week="Wk 1", understanding=40, application=30),
            GrowthPoint(week="Wk 2", understanding=48, application=36),
            GrowthPoint(week="Wk 3", understanding=55, application=41),
            GrowthPoint(week="Wk 4", understanding=61, application=47),
            GrowthPoint(week="Wk 5", understanding=68, application=53),
            GrowthPoint(week="Wk 6", understanding=74, application=60),
        ],
        weeklyImprovement=[
            ImprovementPoint(week="Wk 1", gapClosed=4),
            ImprovementPoint(week="Wk 2", gapClosed=7),
            ImprovementPoint(week="Wk 3", gapClosed=5),
            ImprovementPoint(week="Wk 4", gapClosed=9),
            ImprovementPoint(week="Wk 5", gapClosed=6),
            ImprovementPoint(week="Wk 6", gapClosed=11),
        ],
        gapReduction=[
            GapReductionPoint(subject="Python", before=55, after=26),
            GapReductionPoint(subject="AI", before=62, after=41),
            GapReductionPoint(subject="ML", before=70, after=49),
            GapReductionPoint(subject="DBMS", before=48, after=22),
            GapReductionPoint(subject="OS", before=66, after=44),
        ],
    )
