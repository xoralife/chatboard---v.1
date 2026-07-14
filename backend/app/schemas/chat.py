from datetime import datetime

from pydantic import BaseModel


class ChatCreate(BaseModel):
    title: str = "New Chat"


class ChatOut(BaseModel):
    id: int
    user_id: int
    title: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
