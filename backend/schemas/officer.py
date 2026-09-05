from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class OfficerBase(BaseModel):
    name: str
    email: EmailStr


class OfficerCreate(OfficerBase):
    pass


class OfficerRead(OfficerBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
