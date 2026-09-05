from __future__ import annotations

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.waste_event import WasteEvent
from app.repositories.waste_event import WasteEventRepository
from app.schemas.waste_event import WasteEventCreate

POINTS_BY_TYPE = {
    "biodegradable": 10,
    "recyclable_paper": 20,
    "recyclable_plastic": 30,
}


class WasteEventService:
    def __init__(self, db: Session) -> None:
        self.repository = WasteEventRepository(db)
        self.db = db

    def list_waste_events(self) -> list[WasteEvent]:
        return self.repository.list()

    def create_waste_event(self, payload: WasteEventCreate) -> WasteEvent:
        waste_type = payload.waste_type.strip().lower()
        if waste_type not in POINTS_BY_TYPE:
            raise HTTPException(status_code=400, detail="Unsupported waste type")

        points_awarded = int(payload.weight_grams / 100) * POINTS_BY_TYPE[waste_type]
        return self.repository.create(
            officer_id=payload.officer_id,
            waste_type=waste_type,
            weight_grams=payload.weight_grams,
            points_awarded=points_awarded,
        )
