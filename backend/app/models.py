from datetime import datetime
from pydantic import BaseModel, Field

class WorkspaceCard(BaseModel):
    name: str = Field(min_length = 1, max_length = 60,)
    description: str = Field(default = "", max_length = 280,)

class WordspaceUpdate(BaseModel):
    name: str | None = Field(default = "", min_length = 1, max_length = 60,)
    description: str | None = Field(default = "", max_length = 280,)

class Workspace(BaseModel):
    id: str
    name: str
    description: str
    owner_id: str
    created_at: datetime