import "./App.css";
import { Header } from "./components/Header";
import { ChatBox } from "./components/ChatBox";
import KeepAlive from "./components/KeepAlive";

function App() {
  return (
    <div className="App flex flex-col min-h-screen items-center">
      <KeepAlive />
      <Header />
      <ChatBox />
      <p className="w-3/4 mt-4 text-center text-gray-500">
        A backend service for PDF document upload and real-time
        question-answering using NLP over WebSocket communication.
      </p>
      <p className="text-sm mt-2 text-gray-500">
        Designed by{" "}
        <a
          href="https://vengadesh-max.github.io/Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {" "}
          Vengadeshwaran B
        </a>
      </p>
    </div>
  );
}

export default App;
