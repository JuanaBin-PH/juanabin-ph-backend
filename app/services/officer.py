from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.officer import Officer
from app.repositories.officer import OfficerRepository
from app.schemas.officer import OfficerCreate


class OfficerService:
    def __init__(self, db: Session) -> None:
        self.repository = OfficerRepository(db)

    def list_officers(self) -> list[Officer]:
        return self.repository.list()

    def get_officer(self, officer_id: int) -> Officer:
        officer = self.repository.get(officer_id)
        if officer is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Officer not found"
            )
        return officer

    def create_officer(self, payload: OfficerCreate) -> Officer:
        # Normalise at the boundary so the unique index enforces the rule for real.
        email = str(payload.email).strip().lower()

        if self.repository.get_by_email(email) is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Officer email already exists",
            )

        try:
            return self.repository.create(name=payload.name.strip(), email=email)
        except IntegrityError as exc:
            # Lost a race against a concurrent insert; the unique constraint caught it.
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Officer email already exists",
            ) from exc
