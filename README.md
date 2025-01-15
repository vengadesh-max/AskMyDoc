# AskmyDoc
I developed a backend service using FastAPI to allow users to upload PDF documents and interact with them through real-time question answering via WebSocket.
For text extraction and NLP processing, I used PyMuPDF and LangChain, enabling the system to retrieve relevant content and support follow-up questions within a session. Document metadata and content are stored in a PostgreSQL database, with files saved in local storage. Rate limiting is implemented to manage load, and I wrote comprehensive tests with Pytest for all functionality.
The project is deployed on Vercel and available on GitHub.
