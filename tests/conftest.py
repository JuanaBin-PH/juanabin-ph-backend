from __future__ import annotations

from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

import app.models  # noqa: F401  -- registers every table before create_all
from app.db.session import Base, get_db
from app.main import app


@pytest.fixture()
def test_db() -> Generator[TestClient, None, None]:
    """A TestClient backed by a private in-memory SQLite database.

    StaticPool + check_same_thread=False keep every connection pointed at the *same*
    in-memory database. Without them SQLAlchemy uses SingletonThreadPool, and the
    worker threads FastAPI runs sync routes in would each get their own empty
    database - so every query would fail with "no such table".
    """
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False,
        expire_on_commit=False,
    )
    Base.metadata.create_all(bind=engine)

    def override_get_db() -> Generator[Session, None, None]:
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    try:
        with TestClient(app) as client:
            yield client
    finally:
        app.dependency_overrides.clear()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()
