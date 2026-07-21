def test_create_workspace(client, auth_header):
    response = client.post("/workspaces", json = {
        "name": "Research",
        "description": "AI papers"
    },
    headers = auth_header,
    )

    assert response.status_code == 201

    data = response.json()
    assert data["name"] == "Research"
    assert data["description"] == "AI papers"
    assert "id" in data


def test_list_workspaces(client, auth_header):
    client.post("/workspaces", json = {
        "name": "Workspace One",
        "description": ""
    },
    headers = auth_header,
    )

    response = client.get(
        "/workspaces",
        headers = auth_header
    )

    assert response.status_code == 200

    data = response.json()
    assert len(data) >= 1
    assert data[0]["name"] == "Workspace One"


def test_get_workspace_by_id(client, auth_header):
    response = client.post("/workspaces", json = {
        "name": "Demo Workspace",
        "description": ""
    },
    headers = auth_header,
    )

    workspace_id = response.json()["id"]

    response = client.get(
        f"/workspaces/{workspace_id}",
        headers = auth_header,
    )

    assert response.status_code == 200

    assert response.json()["id"] == workspace_id


def test_update_workspace(client, auth_header):
    response = client.post("/workspaces", json = {
        "name": "Old name",
        "description": ""
    },
    headers = auth_header,
    )

    workspace_id = response.json()["id"]

    response = client.put(
        f"/workspaces/{workspace_id}",
        json = {
            "name": "New Name",
            "description": "New Description"
        },
        headers = auth_header,
    )

    assert response.status_code == 200

    assert response.json()["name"] == "New Name"


def test_delete_workspace(client, auth_header):
    response = client.post("/workspaces", json = {
        "name": "Delete Me",
        "description": ""
    },
    headers = auth_header,
    )

    workspace_id = response.json()["id"]

    response = client.delete(
        f"/workspaces/{workspace_id}",
        headers = auth_header,
    )

    assert response.status_code == 204

    response = client.get(
        f"/workspaces/{workspace_id}",
        headers = auth_header,
    )

    assert response.status_code == 404


def test_cannot_access_another_user_workspace(client):
    # ------- User 1 -------
    client.post("/register", json = {
        "email": "owner@example.com",
        "password": "Password123!"
    },
    )

    login = client.post("/login", data = {
        "username": "owner@example.com",
        "password": "Password123!"
    },
    )

    owner_header = {
        "Authorization": f"Bearer {login.json()['access_token']}"
    }

    response = client.post("/workspaces", json = {
        "name": "Private Workspace",
        "description": ""
    },
    headers = owner_header,
    )

    workspace_id = response.json()["id"]

    # ------- User 2 -------    
    client.post("/register", json = {
        "email": "intruder@example.com",
        "password": "Password123!"
    },
    )

    login = client.post("/login", data = {
        "username": "intruder@example.com",
        "password": "Password123!"
    },
    )

    intruder_headers = {
        "Authorization": f"Bearer {login.json()['access_token']}"
    }

    response = client.get(
        f"/workspaces/{workspace_id}",
        headers = intruder_headers,
    )

    assert response.status_code in (403, 404)