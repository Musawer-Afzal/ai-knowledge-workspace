from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

class WorkspaceCreate(BaseModel):
    name: str = Field(min_length=1, max_length=60)
    description: str = Field(default="", max_length=280)


class WorkspaceUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=60)
    description: str | None = Field(default=None, max_length=280)


class WorkspaceOut(BaseModel):
    id: str
    name: str
    description: str
    owner_id: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserOut(BaseModel):
    id: str
    email: EmailStr
    created_at: datetime

    model_config = {
        "from_attributes": True
    }