from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class StellarTransactionBase(BaseModel):
    officer_id: int
    stellar_transaction_hash: str
    amount: float
    asset_code: str
    status: str


class StellarTransactionCreate(StellarTransactionBase):
    pass


class StellarTransactionRead(StellarTransactionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
