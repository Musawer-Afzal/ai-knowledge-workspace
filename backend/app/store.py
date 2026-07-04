import uuid
from datetime import datetime, timezone
from fastapi import HTTPException

_WORKSPACES: dict[str, dict] = {}

def _now():
    return datetime.now(timezone.utc)

def get_or_404(workspace_id: str) -> dict:
    workspace = _WORKSPACES.get(workspace_id)

    if workspace_id is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    
    return workspace

def generate_id():
    return uuid.uuid4().hex # Now we can just call generate_id for uuid. Following DRY principle