from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.officers import router as officers_router
from app.api.v1.endpoints.rewards import router as rewards_router
from app.api.v1.endpoints.stellar import router as stellar_router
from app.api.v1.endpoints.waste_events import router as waste_events_router

__all__ = [
    "health_router",
    "officers_router",
    "waste_events_router",
    "rewards_router",
    "stellar_router",
]
