from fastapi.testclient import TestClient

def test_register_user(client: TestClient):
    response = client.post("/register",json = {
        "email": "alice@example.com",
        "password": "Password123!"
    },
    )

    assert response.status_code == 201

    data = response.json()
    assert data["email"] ==  "alice@example.com"
    assert "id" in data

def test_login_user(client: TestClient):
    client.post("/register",json = {
        "email": "bob@example.com",
        "password": "Password123!"
    },
    )

    response = client.post("/login", data = {
        "username": "bob@example.com",
        "password": "Password123!"
    },
    )

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_invalid_password(client: TestClient):
    client.post("/register",json = {
        "email": "charlie@example.com",
        "password": "Password123!"
    },
    )

    response = client.post("/login", data = {
        "username": "bob@example.com",
        "password": "WrongPassword"
    },
    )

    assert response.status_code == 401

def test_protected_route_requires_token(client: TestClient):
    response = client.get("/workspaces")
    assert response.status_code == 401