from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.user import User
from app.models.chat import Chat
from app.models.message import Message
from app.schemas.user import UserOut
from app.schemas.admin import DashboardStats
from app.deps import get_current_admin_user

router = APIRouter(dependencies=[Depends(get_current_admin_user)])


@router.get("/dashboard", response_model=DashboardStats)
async def dashboard(db: AsyncSession = Depends(get_db)):
    total_users = await db.scalar(select(func.count(User.id)))
    active_users = await db.scalar(
        select(func.count(User.id)).where(User.is_online == True)
    )
    total_chats = await db.scalar(select(func.count(Chat.id)))
    total_messages = await db.scalar(select(func.count(Message.id)))

    return DashboardStats(
        total_users=total_users or 0,
        active_users=active_users or 0,
        total_chats=total_chats or 0,
        total_messages=total_messages or 0,
    )


@router.get("/users", response_model=list[UserOut])
async def list_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    return result.scalars().all()


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role == "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete admin users",
        )
    await db.delete(user)
    await db.commit()


@router.patch("/users/{user_id}/deactivate", response_model=UserOut)
async def deactivate_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role == "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot deactivate admin users",
        )
    user.is_active = False
    await db.commit()
    await db.refresh(user)
    return user
