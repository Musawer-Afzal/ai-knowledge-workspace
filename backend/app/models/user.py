from datetime import datetime
from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

# from .workspace import Workspace
from .base import Base
import uuid


def new_id():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(
        primary_key = True, 
        default = new_id
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique = True,
        index = True
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255)
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default = func.now()
    )

    workspaces: Mapped[list["Workspace"]] = relationship(
        "Workspace",
        back_populates = "owner"
    )