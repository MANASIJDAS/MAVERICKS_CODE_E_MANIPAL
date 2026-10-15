# CrewSignal

CrewSignal is a synthetic, offline-first health monitoring and decision-support prototype for astronauts on long-duration missions.

## Overview

This project demonstrates a mission-health dashboard with:
- astronaut profile and mission context
- personal baseline monitoring and anomaly detection
- evidence-based alerts with uncertainty states
- symptom logging and follow-up workflow
- scenario replay using synthetic, reproducible data
- local offline storage with IndexedDB and synchronization queue
- Python FastAPI backend with synthetic model training and inference

## Tech stack

Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React
- Dexie.js
- vite-plugin-pwa

Backend:
- Python 3.12
- FastAPI
- Uvicorn
- Pydantic
- NumPy
- pandas
- SciPy
- scikit-learn

## Structure

- frontend/
- backend/
- docs/

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Environment variables

Copy `.env.example` and adjust values as needed.

## Model training

```bash
cd backend
python -m app.machine_learning.train_model
```

## Deployment

Render static site and web service are configured through `render.yaml`.

## Notes

All health data and model training inputs are synthetic. The system is a decision-support prototype and is not a diagnosis or treatment system.
