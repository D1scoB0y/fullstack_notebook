from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import src.routers.users as users
import src.routers.notes as notes
from src.config import Config


# Fastapi instance
app = FastAPI()

# CORS middleware config (configured for localhost:3000 Next.js app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[Config.FRONTEND_APP_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router)
app.include_router(notes.router)
