from datetime import datetime
from sqlalchemy import String, DateTime, func, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

import uuid


def new_id():
    return str(uuid.uuid4())


class Base(DeclarativeBase):
    pass

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
        back_populates = "owner"
    )

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
        back_populates = "workspace",
        cascade = "all, delete-orphan"
    )

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
        back_populates = "documents"
    )