import jwt
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.settings import settings
from app.core.security import verify_password, hash_password
from app.database.db import get_user_by_email, get_db
from app.dependencies.auth import current_user
from app.schemas.auth import UserCreate, UserOut
from app.models import User

router = APIRouter()

def create_access_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours = 12),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm = "HS256")


@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(form.username, db)

    if not user or not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code = 401, detail = "Incorrect Email or Password")
    
    token = create_access_token(user.id)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def me(user: dict = Depends(current_user)):
    return {
        "id": user.id,
        "email": user.email
    }

@router.post(
    "/register",
    response_model=UserOut,
    status_code=201,
)
def register(
    body: UserCreate,
    db: Session = Depends(get_db),
):

    existing = db.scalar(
        select(User).where(User.email == body.email)
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    user = User(
        email=body.email,
        hashed_password=hash_password(body.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user