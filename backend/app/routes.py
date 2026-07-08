from fastapi import APIRouter, Depends
from store import _WORKSPACES, _now, generate_id
from models import Workspace, WorkspaceCreate, WordspaceUpdate
from deps import current_user, owned_workspace

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/workspaces", response_model = Workspace, status_code = 201)
def create_workspace(body: WorkspaceCreate, user= Depends(current_user)):
    workspace = {
        "id": generate_id(),
        "name": body.name,
        "description": body.description,
        "owner_id": user["id"],
        "created_at": _now(),
    }

    _WORKSPACES[workspace["id"]] = workspace

    return workspace


@router.get("/workspaces", response_model = list[Workspace])
def list_workspaces():
    return list(_WORKSPACES.values())


@router.get("/workspaces/{workspaces_id}", response_model = Workspace,)
def get_workspace(workspaces_id: str, user= Depends(current_user)):
    return Depends(workspaces_id)


@router.put("/workspaces/{workspaces_id}", response_model = Workspace,)
def update_workspace(body: WordspaceUpdate, workspace = Depends(owned_workspace),):
    updates = body.model_dump(exclude_unset = True)

    workspace.update(updates)

    return workspace


@router.delete("/workspaces/{workspaces_id}", status_code = 204)
def delete_workspace(workspace = Depends(owned_workspace), user = Depends(current_user)):
    del _WORKSPACES[workspace["id"]]

    return None