from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.reward import Reward


class RewardRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self) -> list[Reward]:
        return self.db.query(Reward).order_by(Reward.id.asc()).all()

    def create(self, *, officer_id: int, points: int, reason: str) -> Reward:
        reward = Reward(officer_id=officer_id, points=points, reason=reason)
        self.db.add(reward)
        self.db.commit()
        self.db.refresh(reward)
        return reward
