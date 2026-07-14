import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="app/.env")

from backend.app.database.db import SessionLocal
from app.models import User
from backend.app.core.security import hash_password

db = SessionLocal()

user = User(
    email="admin@example.com",
    hashed_password=hash_password("password123"),
)

db.add(user)
db.commit()

print("User created.")