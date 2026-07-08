from security import hash_password


_USERS = {
    "u1": {
        "id": "u1",
        "email": "admin@test.com",
        "password_hash": hash_password("password123")
    }
}


def get_user_by_email(email: str):
    for user in _USERS.values():
        if user["email"] == email:
            return user
        
    return None


def get_user_by_id(user_id: str):
    return _USERS.get(user_id)