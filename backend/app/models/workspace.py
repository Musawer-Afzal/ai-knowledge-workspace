from datetime import datetime
from sqlalchemy import String, DateTime, func, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

# from .document import Document
# from .user import User
from .base import Base

import uuid


def new_id():
    return str(uuid.uuid4())


class Workspace(Base):
    __tablename__ = "workspaces"

    id: Mapped[str] = mapped_column(
        primary_key = True, 
        default = new_id
    )

    name: Mapped[str] = mapped_column(
        String(60)
    )

    description: Mapped[str] = mapped_column(
        String(200),
        default = ""
    )

    owner_id: Mapped[str] = mapped_column(
        ForeignKey("users.id"),
        index = True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default = func.now()
    )

    owner: Mapped["User"] = relationship(
        back_populates = "workspaces"
    )

    documents: Mapped[list["Document"]] = relationship(
        "Document",
        back_populates = "workspace",
        cascade = "all, delete-orphan"
    )