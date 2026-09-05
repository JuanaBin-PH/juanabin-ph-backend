from __future__ import annotations

import logging
from typing import Any

from fastapi import HTTPException, status
from stellar_sdk import Network, Server, TransactionEnvelope

logger = logging.getLogger(__name__)

HORIZON_TESTNET_URL = "https://horizon-testnet.stellar.org"

# Stellar transaction hashes are 32-byte values, hex-encoded.
_HASH_LENGTH = 64


class StellarService:
    """Thin abstraction around Horizon **Testnet**.

    Returns plain application-level dicts - no stellar-sdk objects cross this
    boundary, so routes and tests never depend on SDK types. Mainnet and Soroban
    are deliberately out of scope.
    """

    def __init__(self, horizon_url: str = HORIZON_TESTNET_URL) -> None:
        self.horizon = Server(horizon_url=horizon_url)
        self.network_passphrase = Network.TESTNET_NETWORK_PASSPHRASE

    def validate_transaction(self, transaction_hash: str) -> dict[str, Any]:
        """Look a transaction up on Horizon Testnet and summarise it."""
        hash_value = (transaction_hash or "").strip()

        if len(hash_value) != _HASH_LENGTH or not _is_hex(hash_value):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Stellar transaction hash",
            )

        try:
            tx = self.horizon.transactions().transaction(hash_value).call()
        except Exception as exc:  # pragma: no cover - network/integration layer
            logger.warning("Horizon lookup failed for %s: %s", hash_value, exc)
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Stellar transaction not found",
            ) from exc

        if not tx.get("hash"):
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Unexpected Horizon response",
            )

        return {
            "hash": tx["hash"],
            "successful": bool(tx.get("successful", False)),
            "status": "success" if tx.get("successful") else "failed",
            "ledger": tx.get("ledger"),
            "created_at": tx.get("created_at"),
            "source_account": tx.get("source_account"),
            "network": "testnet",
        }

    def validate_transaction_xdr(self, xdr_payload: str) -> dict[str, Any]:
        """Parse a transaction envelope XDR against the Testnet passphrase."""
        try:
            envelope = TransactionEnvelope.from_xdr(xdr_payload, self.network_passphrase)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Stellar XDR payload",
            ) from exc

        source = envelope.transaction.source
        return {
            "valid": True,
            "network": "testnet",
            "hash": envelope.hash_hex(),
            "source_account": getattr(source, "account_id", None) or str(source),
        }


def _is_hex(value: str) -> bool:
    try:
        int(value, 16)
    except ValueError:
        return False
    return True


stellar_service = StellarService()
