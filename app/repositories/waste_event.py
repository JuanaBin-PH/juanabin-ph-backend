from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.waste_event import WasteEvent


class WasteEventRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self) -> list[WasteEvent]:
        return self.db.query(WasteEvent).order_by(WasteEvent.id.asc()).all()

    def create(self, *, officer_id: int, waste_type: str, weight_grams: int, points_awarded: int) -> WasteEvent:
        record = WasteEvent(
            officer_id=officer_id,
            waste_type=waste_type,
            weight_grams=weight_grams,
            points_awarded=points_awarded,
        )
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record
