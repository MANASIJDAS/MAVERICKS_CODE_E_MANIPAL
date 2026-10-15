from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.endpoints.measurements import router as measurements_router
from .api.endpoints.crew import router as crew_router

app = FastAPI(title="CrewSignal Backend - Initial Scaffold")

app.include_router(measurements_router)
app.include_router(crew_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/health')
async def health():
    return {"status": "ok"}
