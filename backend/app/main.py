from fastapi import FastAPI

app = FastAPI(title="CrewSignal Backend - Initial Scaffold")

@app.get('/health')
async def health():
    return {"status": "ok"}
