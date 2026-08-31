from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = Field(
        default="postgresql+psycopg2://postgres:postgres@127.0.0.1:5432/juanabin",
        validation_alias="DATABASE_URL",
    )
    frontend_url: str = Field(default="http://localhost:5173", validation_alias="FRONTEND_URL")
    allowed_origins: str = Field(
        default="http://localhost:5173",
        validation_alias="ALLOWED_ORIGINS",
    )
    kinde_enabled: bool = Field(default=False, validation_alias="KINDE_AUTH_ENABLED")
    kinde_issuer: str = Field(default="", validation_alias="KINDE_ISSUER")
    kinde_audience: str = Field(default="juanabin-ph", validation_alias="KINDE_AUDIENCE")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    @property
    def cors_origins(self) -> list[str]:
        raw_values = self.allowed_origins or self.frontend_url
        values = [item.strip() for item in raw_values.replace(" ", "").split(",") if item.strip()]
        return [item.rstrip("/") for item in values]


settings = Settings()