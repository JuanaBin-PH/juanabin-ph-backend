from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class WasteEvent(Base):
    __tablename__ = "waste_events"
    __table_args__ = (
        CheckConstraint(
            "waste_type IN ('biodegradable', 'recyclable_paper', 'recyclable_plastic')",
            name="waste_type_check",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    officer_id: Mapped[int] = mapped_column(ForeignKey("officers.id"), nullable=False, index=True)
    waste_type: Mapped[str] = mapped_column(String(50), nullable=False)
    weight_grams: Mapped[int] = mapped_column(Integer, nullable=False)
    points_awarded: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    officer: Mapped["Officer"] = relationship(back_populates="waste_events")
