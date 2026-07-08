import jwt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from settings import settings
from security import verify_password
from db import get_user_by_email
from deps import current_user

router = APIRouter()

def create_access_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours = 12),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm = "HS256")


@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_email(form.username)

    if not user or not verify_password(form.password, user["password_hash"]):
        raise HTTPException(status_code = 401, detail = "Incorrect Email or Password")
    
    token = create_access_token(user["id"])
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def me(user: dict = Depends(current_user)):
    return {
        "id": user["id"],
        "email": user["email"]
    }