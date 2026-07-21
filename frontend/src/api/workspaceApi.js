const BASE_URL = import.meta.env.VITE_API_URL;

function authHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function fetchWorkspaces(token) {
    const response = await fetch(`${BASE_URL}/workspaces`, {
        headers: authHeaders(token),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
    }

    return response.json();
}

export async function fetchWorkspace(id, token) {
    const response = await fetch(`${BASE_URL}/workspaces/${id}`, {
        headers: authHeaders(token),
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Failed to fetch workspace");
    }

    return response.json();
}

export async function createWorkspace(values, token) {
    const response = await fetch(`${BASE_URL}/workspaces`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error("Failed to create workspace");
    }

    return response.json();
}

export async function updateWorkspace(id, values, token) {
    const response = await fetch(`${BASE_URL}/workspaces/${id}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error("Failed to update workspace");
    }

    return response.json();
}

export async function deleteWorkspace(id, token) {
    const response = await fetch(`${BASE_URL}/workspaces/${id}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });

    if (!response.ok) {
        throw new Error("Failed to delete workspace");
    }
}