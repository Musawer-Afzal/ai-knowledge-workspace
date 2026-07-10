import uuid
from datetime import datetime, timezone
from fastapi import HTTPException

_WORKSPACES: dict[str, dict] = {}

def _now():
    return datetime.now(timezone.utc)

def generate_id():
    return uuid.uuid4().hex # Now we can just call generate_id for uuid. Following DRY principle