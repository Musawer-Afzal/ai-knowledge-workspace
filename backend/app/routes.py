from sqlalchemy import select

from fastapi import APIRouter, Depends
from models import Workspace
from schemas import (
    WorkspaceCreate,
    WorkspaceUpdate,
    WorkspaceOut,
)
from deps import current_user, owned_workspace
from db import get_db

from sqlalchemy.orm import Session, selectinload

router = APIRouter()


PAGE_SIZE = 20


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/workspaces", response_model = WorkspaceOut, status_code = 201)
def create_workspace(
    body: WorkspaceCreate, 
    user= Depends(current_user),
    db: Session = Depends(get_db)):
    workspace = Workspace(
        name = body.name,
        description = body.description,
        owner_id = user.id,
    )

    db.add(workspace)
    db.commit()
    db.refresh(workspace)

    return workspace


@router.get("/workspaces", response_model = list[WorkspaceOut])
def list_workspaces(
    db: Session = Depends(get_db),
    user = Depends(current_user),
    page: int = 0
    ):
    stmt = (
        select(Workspace)
        .options(selectinload(Workspace.documents))
        .where(Workspace.owner_id == user.id)
        .order_by(Workspace.created_at.desc())
        .limit(PAGE_SIZE)
        .offset(page * PAGE_SIZE)
    )

    return db.scalars(stmt).all()


@router.get("/workspaces/{workspace_id}", response_model = WorkspaceOut,)
def get_workspace(workspace = Depends(owned_workspace)):
    return workspace


@router.put("/workspaces/{workspace_id}", response_model = WorkspaceOut,)
def update_workspace(
    body: WorkspaceUpdate, 
    workspace = Depends(owned_workspace),
    db: Session = Depends(get_db)):

    updates = body.model_dump(exclude_unset = True)

    for key, value in updates.items():
        setattr(workspace, key, value)

    db.commit()
    db.refresh(workspace)

    return workspace


@router.delete("/workspaces/{workspaces_id}", status_code = 204)
def delete_workspace(
    workspace = Depends(owned_workspace), 
    user = Depends(current_user),
    db: Session = Depends(get_db)):

    db.delete(workspace)
    db.commit()

    return None