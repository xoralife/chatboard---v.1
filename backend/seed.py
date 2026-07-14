import asyncio

from app.database import async_session, create_tables
from app.models.user import User
from app.services.auth import hash_password
from sqlalchemy import select


async def seed():
    await create_tables()

    async with async_session() as db:
        result = await db.execute(select(User).where(User.username == "admin"))
        admin = result.scalar_one_or_none()

        if admin:
            admin.role = "admin"
            print("Admin user already exists. Upgraded to admin role.")
        else:
            admin = User(
                username="admin",
                email="admin@chatboard.com",
                hashed_password=hash_password("admin123"),
                role="admin",
            )
            db.add(admin)
            print("Admin user created! Username: admin, Password: admin123")

        await db.commit()


if __name__ == "__main__":
    asyncio.run(seed())
