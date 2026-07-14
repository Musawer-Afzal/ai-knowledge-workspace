from app.models import User
from app.core.settings import settings

from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, Session


engine = create_engine(
    settings.database_url,
    pool_pre_ping = True
)

SessionLocal = sessionmaker(
    bind = engine,
    autoflush = False,
    expire_on_commit = False
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_user_by_email(email: str, db: Session):
    stmt = select(User).where(User.email == email)
    return db.scalar(stmt)


def get_user_by_id(user_id: str, db: Session):
    return db.get(User, user_id)