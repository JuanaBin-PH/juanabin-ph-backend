from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_stellar_service
from app.db.session import get_db
from app.repositories.stellar_transaction import StellarTransactionRepository
from app.schemas.stellar_transaction import StellarTransactionRead
from app.services.stellar import StellarService

router = APIRouter(prefix="/stellar", tags=["stellar"])


@router.get("/transactions/{transaction_id}", response_model=StellarTransactionRead)
def get_transaction(
    transaction_id: int, db: Session = Depends(get_db)
) -> StellarTransactionRead:
    tx = StellarTransactionRepository(db).get(transaction_id)
    if tx is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found"
        )
    return StellarTransactionRead.model_validate(tx)


@router.post("/validate")
def validate_transaction_hash(
    transaction_hash: str = Query(..., alias="hash", min_length=1),
    service: StellarService = Depends(get_stellar_service),
) -> dict[str, object]:
    """Validate a hash against Horizon Testnet."""
    return service.validate_transaction(transaction_hash)
