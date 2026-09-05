from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class WasteEventBase(BaseModel):
    officer_id: int
    waste_type: str
    weight_grams: int


class WasteEventCreate(WasteEventBase):
    pass


class WasteEventRead(WasteEventBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    points_awarded: int
    created_at: datetime
