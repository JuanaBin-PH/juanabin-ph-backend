from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.reward import RewardCreate, RewardRead
from app.services.reward import RewardService

router = APIRouter(prefix="/rewards", tags=["rewards"])


@router.get("", response_model=list[RewardRead])
def list_rewards(db: Session = Depends(get_db)) -> list[RewardRead]:
    return [RewardRead.model_validate(item) for item in RewardService(db).list_rewards()]


@router.post("", response_model=RewardRead, status_code=status.HTTP_201_CREATED)
def create_reward(payload: RewardCreate, db: Session = Depends(get_db)) -> RewardRead:
    reward = RewardService(db).create_reward(payload)
    return RewardRead.model_validate(reward)
