const BASE_URL = "http://127.0.0.1:8000";

export async function registerUser(values) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
    }

    return data;
}

export async function loginUser(email, password) {
    const form = new URLSearchParams();

    form.append("username", email);
    form.append("password", password);

    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: form,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Login failed");
    }

    return data;
}