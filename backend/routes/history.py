from fastapi import APIRouter
from utils import question_answer_history

router = APIRouter()

@router.get("/history/")
async def get_history():
    return question_answer_history
