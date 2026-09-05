from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class StellarTransaction(Base):
    __tablename__ = "stellar_transactions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    officer_id: Mapped[int] = mapped_column(ForeignKey("officers.id"), nullable=False, index=True)
    stellar_transaction_hash: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    amount: Mapped[float] = mapped_column(Numeric(18, 7), nullable=False)
    asset_code: Mapped[str] = mapped_column(String(12), nullable=False)
    status: Mapped[str] = mapped_column(String(32), nullable=False, default="pending")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    officer: Mapped["Officer"] = relationship(back_populates="stellar_transactions")
