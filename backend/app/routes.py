from fastapi import APIRouter
from store import _WORKSPACES, _now, get_or_404, generate_id
from models import Workspace, WorkspaceCreate, WordspaceUpdate

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/workspaces", response_model = Workspace, status_code = 201)
def create_workspace(body: WorkspaceCreate):
    workspace = {
        "id": generate_id(),
        "name": body.name,
        "description": body.description,
        "owner_id": "u1",
        "created_at": _now(),
    }

    _WORKSPACES[workspace["id"]] = workspace

    return workspace


@router.get("/workspaces", response_model = list[Workspace])
def list_workspaces():
    return list(_WORKSPACES.values())


@router.get("/workspaces/{workspaces_id}", response_model = Workspace,)
def get_workspace(workspaces_id: str):
    return get_or_404(workspaces_id)


@router.put("/workspaces/{workspaces_id}", response_model = Workspace,)
def update_workspace(workspaces_id: str, body: WordspaceUpdate,):
    workspace = get_or_404(workspaces_id)

    updates = body.model_dump(exclude_unset = True)

    workspace.update(updates)

    return workspace


@router.delete("/workspaces/{workspaces_id}", status_code = 204)
def delete_workspace(workspaces_id: str):
    get_or_404(workspaces_id)

    del _WORKSPACES[workspaces_id]

    return None