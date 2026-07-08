import uuid
from datetime import datetime, timezone
from fastapi import HTTPException
from security import hash_password

_WORKSPACES: dict[str, dict] = {}

_USERS = {
    "u1": {
        "id": "u1",
        "email": "admin@test.com",
        "password_hash": hash_password("password123")
    }
}

def _now():
    return datetime.now(timezone.utc)

def get_or_404(workspace_id: str) -> dict:
    workspace = _WORKSPACES.get(workspace_id)

    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    
    return workspace

def generate_id():
    return uuid.uuid4().hex # Now we can just call generate_id for uuid. Following DRY principle


def get_user_by_email(email: str):
    for user in _USERS.values():
        if user["email"] == email:
            return user
        
    return None


def get_user_by_id(user_id: str):
    return _USERS.get(user_id)