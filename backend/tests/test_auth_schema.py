import pytest
from pydantic import ValidationError

from app.schemas.auth import UserCreate


def test_valid_user():
    user = UserCreate(
        email="demo@test.com",
        password="password123"
    )

    assert user.email == "demo@test.com"


def test_invalid_email():
    with pytest.raises(ValidationError):
        UserCreate(
            email="not-an-email",
            password="password123"
        )


def test_short_password():
    with pytest.raises(ValidationError):
        UserCreate(
            email="demo@test.com",
            password="123"
        )