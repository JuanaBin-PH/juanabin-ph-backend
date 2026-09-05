from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.officer import Officer


class OfficerRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self) -> list[Officer]:
        return self.db.query(Officer).order_by(Officer.id.asc()).all()

    def get(self, officer_id: int) -> Officer | None:
        return self.db.query(Officer).filter(Officer.id == officer_id).first()

    def get_by_email(self, email: str) -> Officer | None:
        """Exact match - emails are normalised to lowercase before storage, so
        this uses the unique index on officers.email."""
        return self.db.query(Officer).filter(Officer.email == email).first()

    def create(self, *, name: str, email: str) -> Officer:
        officer = Officer(name=name, email=email)
        self.db.add(officer)
        try:
            self.db.commit()
        except Exception:
            self.db.rollback()
            raise
        self.db.refresh(officer)
        return officer
