from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import date


app = FastAPI()

# ✅ Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ In-memory storage
job_storage = []

# ✅ Pydantic model
class Job(BaseModel):
    company: str
    title: str
    status: str
    applied_date: date

# ✅ Test GET route
@app.get("/api/hello")
def get_hello():
    return {"message": "Hello from FastAPI"}

# ✅ POST route to receive jobs
@app.post("/api/jobs")
def create_job(job: Job):
    job_id = len(job_storage) + 1
    job_entry = {
        "id": job_id,
        "company": job.company,
        "title": job.title,
        "status": job.status,
        "applied_date": str(job.applied_date),
    }
    job_storage.append(job_entry)
    return {"message": "Job saved successfully", "job": job_entry}

# ✅ GET route to return all jobs
@app.get("/api/jobs")
def get_jobs():
    return {"jobs": job_storage}


# ✅ NEW: Update job status
@app.put("/api/jobs/{job_id}")
def update_job_status(job_id: int, updated: Job):
    for job in job_storage:
        if job["id"] == job_id:
            job["status"] = updated.status
            return {"message": "Job updated", "job": job}
    raise HTTPException(status_code=404, detail="Job not found")