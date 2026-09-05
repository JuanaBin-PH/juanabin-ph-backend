from __future__ import annotations

from typing import Any

from fastapi import Depends, HTTPException, status

from app.core.security import get_current_user, kinde_auth
from app.services.stellar import StellarService, stellar_service


def get_authenticated_user() -> dict[str, Any] | None:
    """Resolve the caller, or None when no valid principal is present.

    Swapping in real Kinde JWT validation happens in app/core/security.py - this
    dependency and every route that uses it stay unchanged.
    """
    return get_current_user()


def current_user(
    user: dict[str, Any] | None = Depends(get_authenticated_user),
) -> dict[str, Any] | None:
    """Optional authentication - returns None for anonymous callers."""
    return user


def require_user(
    user: dict[str, Any] | None = Depends(get_authenticated_user),
) -> dict[str, Any]:
    """Mandatory authentication - use on routes that must not be anonymous."""
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def get_stellar_service() -> StellarService:
    """Injected so tests can override Horizon access without network calls."""
    return stellar_service


__all__ = [
    "current_user",
    "get_authenticated_user",
    "get_stellar_service",
    "kinde_auth",
    "require_user",
]
