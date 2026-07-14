from datetime import datetime
from sqlalchemy import String, DateTime, func, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

# from .workspace import Workspace
from .base import Base
import uuid


def new_id():
    return str(uuid.uuid4())


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[str] = mapped_column(
        primary_key = True,
        default = new_id
    )

    title: Mapped[str] = mapped_column(
        String(200)
    )

    workspace_id: Mapped[str] = mapped_column(
        ForeignKey("workspaces.id"),
        index = True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default = func.now()
    )

    workspace: Mapped["Workspace"] = relationship(
        "Workspace",
        back_populates = "documents"
    )