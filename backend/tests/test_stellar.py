"""Stellar service tests.

Every case here is offline by design - no test touches Horizon over the network.
"""

import pytest
from fastapi import HTTPException

from app.services.stellar import StellarService


@pytest.fixture()
def service() -> StellarService:
    return StellarService()


@pytest.mark.parametrize(
    "bad_hash",
    [
        "",
        "   ",
        "abc123def456",       # too short
        "a" * 63,             # one char short
        "a" * 65,             # one char long
        "z" * 64,             # right length, not hex
    ],
)
def test_validate_transaction_rejects_malformed_hash(service, bad_hash):
    """Malformed hashes fail fast, before any Horizon round trip."""
    with pytest.raises(HTTPException) as exc_info:
        service.validate_transaction(bad_hash)

    assert exc_info.value.status_code == 400
    assert "Invalid Stellar transaction hash" in exc_info.value.detail


def test_validate_transaction_xdr_rejects_garbage(service):
    with pytest.raises(HTTPException) as exc_info:
        service.validate_transaction_xdr("not-a-valid-xdr-payload")

    assert exc_info.value.status_code == 400
    assert "Invalid Stellar XDR payload" in exc_info.value.detail


def test_service_targets_testnet_only(service):
    """Guard against a mainnet Horizon URL or passphrase slipping in."""
    assert "horizon-testnet.stellar.org" in service.horizon.horizon_url
    assert "Test Network" in service.network_passphrase


def test_validate_endpoint_rejects_bad_hash(test_db):
    """The route surfaces the service's validation error, not a stack trace."""
    response = test_db.post("/api/v1/stellar/validate", params={"hash": "tooshort"})

    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid Stellar transaction hash"


def test_unknown_stellar_transaction_returns_404(test_db):
    response = test_db.get("/api/v1/stellar/transactions/999999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Transaction not found"
