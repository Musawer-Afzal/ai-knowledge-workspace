import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from settings import settings
from db import get_user_by_id
from store import _WORKSPACES

oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "login")

def current_user(token: str = Depends(oauth2_scheme)):
    creds_error = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials",
        headers = {"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms = ["HS256"])
        user_id = payload.get("sub")

        if user_id is None:
            raise creds_error
        
    except jwt.PyJWTError:
        raise creds_error
    
    user = get_user_by_id(user_id)
    
    if user is None:
        raise creds_error
    
    return user

def owned_workspace(workspace_id: str, user: dict = Depends(current_user)):
    workspace = _WORKSPACES.get(workspace_id)

    if workspace is None:
        raise HTTPException(status_code = 404, detail = "Workspace not found")
    
    if workspace["owner_id"] != user["id"]:
        raise HTTPException(status_code = 404, detail = "Workspace not found")
    
    return workspace