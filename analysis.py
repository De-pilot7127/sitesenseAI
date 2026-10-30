"""Analysis service boundary for Phase 2."""

from schemas import AnalysisCreate


def validate_analysis_request(request: AnalysisCreate) -> AnalysisCreate:
    return request
