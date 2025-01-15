import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSpinner } from "@fortawesome/free-solid-svg-icons";

export function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userQuestion, setUserQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/ask_question");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      console.log(event);

      const botMessage = event.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: botMessage },
      ]);
      setLoading(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!userQuestion || !socket) return;

    setMessages([...messages, { type: "user", text: userQuestion }]);
    setLoading(true);
    socket.send(userQuestion);
    setUserQuestion("");
  };

  return (
    <main
      className="flex flex-col flex-1 p-4 mt-4 mx-auto bg-black"
      style={{ minWidth: "20rem", maxWidth: "75%", width: "100%" }}
    >
      <div className="flex-1 overflow-y-auto mt-20">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-2 ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.type === "bot" && (
              <img src="./icon.svg" alt="Icon" className="text-2xl mr-2" />
            )}
            <div
              className={`p-2 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
              } w-3/4 sm:w-1/2 lg:w-3/4`}
            >
              {message.text}
            </div>
            {message.type === "user" && (
              <FontAwesomeIcon icon={faUser} className="text-2xl ml-2 pt-2" />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-300 rounded-lg flex items-center">
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              Loading...
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleQuestionSubmit}
        className="flex items-center bg-white rounded-lg shadow-md"
      >
        <input
          className="flex-1 p-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask a question..."
          aria-label="Ask a question"
        />
        <button
          type="submit"
          className="p-2 text-blue-500 bg-transparent border-none"
          aria-label="Send"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1667 11L2.75 18.3333L6.01608 11L2.75 3.66666L20.1667 11ZM20.1667 11H5.95833"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </main>
  );
}
