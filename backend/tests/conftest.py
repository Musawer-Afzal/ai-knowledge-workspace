import os

os.environ["ENV"] = "test"

from fastapi.testclient import TestClient
import pytest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database.db import get_db
from app.models.base import Base


TEST_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://postgres:PostGreSQL14202!@localhost:5432/workspace_test",
)

engine = create_engine(TEST_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope = "session", autouse = True)
def setup_database():
    Base.metadata.create_all(bind = engine)

    yield

    Base.metadata.drop_all(bind = engine)


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def auth_header(client):
    email = "demo@example.com"
    password = "Password123!"

    client.post("/register", json = {
        "email": email,
        "password": password
    },
    )

    response = client.post("/login", data = {
        "username": email,
        "password": password
    },
    )

    token = response.json()["access_token"]

    return {"Authorization": f"Bearer {token}"}