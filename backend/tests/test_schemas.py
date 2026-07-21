import pytest
from pydantic import ValidationError

from app.schemas.workspace import WorkspaceCreate


def test_workspace_name_is_required():
    with pytest.raises(ValidationError):
        WorkspaceCreate(
            name="",
            description="Test"
        )


def test_workspace_name_too_long():
    with pytest.raises(ValidationError):
        WorkspaceCreate(
            name="A" * 61,
            description="Test"
        )


def test_workspace_description_too_long():
    with pytest.raises(ValidationError):
        WorkspaceCreate(
            name="Research",
            description="A" * 281
        )


def test_valid_workspace():
    workspace = WorkspaceCreate(
        name="Research",
        description="Machine Learning papers"
    )

    assert workspace.name == "Research"
    assert workspace.description == "Machine Learning papers"