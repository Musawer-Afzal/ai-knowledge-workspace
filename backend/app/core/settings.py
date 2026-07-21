from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    jwt_secret: str
    database_url: str
    cors_origins: list[str] = ["http://localhost:5173"]
    
    model_config = SettingsConfigDict(
        env_file = ".env",
        case_sensitive = False
        )

settings = Settings()