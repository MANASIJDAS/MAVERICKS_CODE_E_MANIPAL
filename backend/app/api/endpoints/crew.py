from fastapi import APIRouter
from ..simulation.synthetic_data import generate_crew_profile, generate_measurement_stream, generate_mission_timeline

router = APIRouter(prefix="/crew", tags=["crew"])


@router.get('/profile')
def crew_profile():
    return generate_crew_profile()


@router.get('/timeline')
def crew_timeline():
    return generate_mission_timeline()


@router.get('/stream')
def crew_stream():
    return generate_measurement_stream(10)
