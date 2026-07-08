from fastapi import FastAPI
from routes import router
from auth import router as auth_router

app = FastAPI(
    title = "AI Knowedge Workspace",
    version = "1.0.0",
)

app.include_router(router)
app.include_router(auth_router)