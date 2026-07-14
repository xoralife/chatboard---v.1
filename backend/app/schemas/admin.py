from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_users: int
    active_users: int
    total_chats: int
    total_messages: int
