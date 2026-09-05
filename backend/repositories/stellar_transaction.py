from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.stellar_transaction import StellarTransaction


class StellarTransactionRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create(
        self,
        *,
        officer_id: int,
        stellar_transaction_hash: str,
        amount: float,
        asset_code: str,
        status: str,
    ) -> StellarTransaction:
        record = StellarTransaction(
            officer_id=officer_id,
            stellar_transaction_hash=stellar_transaction_hash,
            amount=amount,
            asset_code=asset_code,
            status=status,
        )
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record

    def get(self, stellar_id: int) -> StellarTransaction | None:
        return self.db.query(StellarTransaction).filter(StellarTransaction.id == stellar_id).first()
