from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload_pdf import router as upload_pdf_router
from routes.ask_question import router as ask_question_router
from routes.history import router as history_router

app = FastAPI()

# Define your updated CORS settings
origins = [
    "http://localhost:5173",
    "https://query-pdf-swart.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Properly include the routers
app.include_router(upload_pdf_router)
app.include_router(ask_question_router)
app.include_router(history_router)


@app.get("/api/ping")
async def ping():
    return {"message": "pong"}
