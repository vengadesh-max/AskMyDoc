# test_ask_question.py

import pytest
from fastapi.testclient import TestClient
from app import app  # Ensure this points to your app

client = TestClient(app)


@pytest.mark.asyncio
async def test_websocket_ask_question():
    """Test WebSocket /ws/ask_question endpoint."""

    with client.websocket_connect("/ws/ask_question") as websocket:
        # Send a question
        question = "What is FastAPI?"
        websocket.send_text(question)

        # Receive and validate the response
        response = websocket.receive_text()
        assert response is not None
        assert isinstance(response, str)

        # Check if response is either an answer or a message about context availability
        assert (
            "FastAPI" in response
            or "Answer is not available in the context" in response
        )


@pytest.mark.asyncio
async def test_invalid_websocket_question():
    """Test WebSocket with invalid input."""

    with client.websocket_connect("/ws/ask_question") as websocket:
        # Send an empty question
        websocket.send_text("")

        # Check for an error message or response about context availability
        response = websocket.receive_text()
        assert response is not None
        assert (
            "Error" in response or "answer is not available in the context" in response
        )
