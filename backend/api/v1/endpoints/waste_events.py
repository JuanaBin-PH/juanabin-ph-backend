from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.waste_event import WasteEventCreate, WasteEventRead
from app.services.waste_event import WasteEventService

router = APIRouter(prefix="/waste-events", tags=["waste_events"])


@router.get("", response_model=list[WasteEventRead])
def list_waste_events(db: Session = Depends(get_db)) -> list[WasteEventRead]:
    return [WasteEventRead.model_validate(item) for item in WasteEventService(db).list_waste_events()]


@router.post("", response_model=WasteEventRead, status_code=status.HTTP_201_CREATED)
def create_waste_event(payload: WasteEventCreate, db: Session = Depends(get_db)) -> WasteEventRead:
    item = WasteEventService(db).create_waste_event(payload)
    return WasteEventRead.model_validate(item)
