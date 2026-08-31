from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.officer import OfficerCreate, OfficerRead
from app.services.officer import OfficerService

router = APIRouter(prefix="/officers", tags=["officers"])


@router.get("", response_model=list[OfficerRead])
def list_officers(db: Session = Depends(get_db)) -> list[OfficerRead]:
    return [OfficerRead.model_validate(item) for item in OfficerService(db).list_officers()]


@router.post("", response_model=OfficerRead, status_code=status.HTTP_201_CREATED)
def create_officer(payload: OfficerCreate, db: Session = Depends(get_db)) -> OfficerRead:
    officer = OfficerService(db).create_officer(payload)
    return OfficerRead.model_validate(officer)


@router.get("/{officer_id}", response_model=OfficerRead)
def get_officer(officer_id: int, db: Session = Depends(get_db)) -> OfficerRead:
    officer = OfficerService(db).get_officer(officer_id)
    return OfficerRead.model_validate(officer)
