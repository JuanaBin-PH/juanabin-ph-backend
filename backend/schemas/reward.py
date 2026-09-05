from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RewardBase(BaseModel):
    officer_id: int
    points: int
    reason: str


class RewardCreate(RewardBase):
    pass


class RewardRead(RewardBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
