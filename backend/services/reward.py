from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.reward import Reward
from app.repositories.reward import RewardRepository
from app.schemas.reward import RewardCreate


class RewardService:
    def __init__(self, db: Session) -> None:
        self.repository = RewardRepository(db)

    def list_rewards(self) -> list[Reward]:
        return self.repository.list()

    def create_reward(self, payload: RewardCreate) -> Reward:
        return self.repository.create(
            officer_id=payload.officer_id,
            points=payload.points,
            reason=payload.reason,
        )
