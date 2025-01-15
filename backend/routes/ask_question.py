from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from utils import get_conversational_chain
from utils import question_answer_history
import os

router = APIRouter()


# Define your request model
class QuestionInput(BaseModel):
    user_question: str


@router.post("/ask_question/")
async def ask_question(question_input: QuestionInput):
    user_question = question_input.user_question
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    try:
        new_db = FAISS.load_local(
            os.path.join(os.getcwd(), "faiss_index"),
            embeddings,
            allow_dangerous_deserialization=True,
        )
    except Exception as e:
        print(f"Error loading FAISS index: {e}")
        return

    # Retrieve document objects from the FAISS index
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()

    # Join all text chunks to create the full context
    full_text = " ".join([str(doc) for doc in docs])

    # Pass the input_documents key to the chain along with the context and question
    response = chain(
        {"input_documents": docs, "context": full_text, "question": user_question},
        return_only_outputs=True,
    )

    # Append the new question-answer pair to the history
    question_answer_history.append(
        {"question": user_question, "answer": response["output_text"]}
    )

    return {"question": user_question, "answer": response["output_text"]}


@router.websocket("/ws/ask_question")
async def websocket_ask_question(websocket: WebSocket):
    await websocket.accept()

    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    chain = get_conversational_chain()

    try:
        # Load the FAISS index
        new_db = FAISS.load_local(
            os.path.join(os.getcwd(), "faiss_index"),
            embeddings,
            allow_dangerous_deserialization=True,
        )
    except Exception as e:
        print(f"Error loading FAISS index: {e}")
        await websocket.send_text("Error loading FAISS index")
        await websocket.close()
        return

    try:
        while True:
            user_question = await websocket.receive_text()
            docs = new_db.similarity_search(user_question)
            full_text = " ".join([str(doc) for doc in docs])

            response = chain(
                {
                    "input_documents": docs,
                    "context": full_text,
                    "question": user_question,
                },
                return_only_outputs=True,
            )
            await websocket.send_text(response["output_text"])

    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"An error occurred: {e}")
        await websocket.send_text("An error occurred while processing your request.")
    finally:
        await websocket.close()
