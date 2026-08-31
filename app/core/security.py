from __future__ import annotations

from typing import Any

from app.core.config import settings


class KindeAuthProvider:
    """Thin interface around Kinde JWT validation.

    The implementation can be swapped in later without changing routes or service code.
    """

    def __init__(self, *, enabled: bool = False, issuer: str = "", audience: str = "") -> None:
        self.enabled = enabled
        self.issuer = issuer
        self.audience = audience

    def validate_token(self, token: str) -> dict[str, Any]:
        if not self.enabled:
            return {"sub": "local-dev-user", "scope": "local"}

        if not token:
            raise ValueError("Missing Kinde token")

        # Real Kinde JWT validation should be implemented here later.
        return {"sub": "kinde-user", "token": token}


kinde_auth = KindeAuthProvider(
    enabled=settings.kinde_enabled,
    issuer=settings.kinde_issuer,
    audience=settings.kinde_audience,
)


def get_current_user() -> dict[str, Any] | None:
    if not kinde_auth.enabled:
        return {"sub": "local-dev-user", "scope": "local"}
    return None
