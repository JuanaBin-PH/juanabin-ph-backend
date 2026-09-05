from fastapi import APIRouter

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.officers import router as officers_router
from app.api.v1.endpoints.rewards import router as rewards_router
from app.api.v1.endpoints.stellar import router as stellar_router
from app.api.v1.endpoints.waste_events import router as waste_events_router

api_v1 = APIRouter(prefix="/api/v1")

api_v1.include_router(health_router)
api_v1.include_router(officers_router)
api_v1.include_router(waste_events_router)
api_v1.include_router(rewards_router)
api_v1.include_router(stellar_router)
