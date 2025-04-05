# 🧠 AskMyDoc  ## Main Title

**AskMyDoc** is a full-stack application that empowers users to interact with PDF documents using natural language. Simply upload a PDF, ask questions about its content, and receive intelligent, context-aware answers—powered by modern NLP tools.

📎 **GitHub Repository**: [https://github.com/vengadesh-max/AskMyDoc](https://github.com/vengadesh-max/AskMyDoc)


## 🚀 Features 

- 📄 Upload PDF documents
- 🤖 Ask context-based questions about the uploaded file
- 🧠 AI-driven answers using language models (via LangChain)
- 💬 User-friendly interface with smooth interactions

---



### 🔧 Backend Setup

1. **Clone the repository:**
 - git clone https://github.com/vengadesh-max/AskMyDoc.git
2. **Navigate to the backend:**

 - cd backend
3. **Install dependencies:** 
 - pip install -r requirements.txt
4. **Set up environment variables:**
 - Create a .env file in the backend folder to store any required configurations (like API keys or model settings).
5. **Start the backend server:**
 - uvicorn app:app --reload


### 🌐 Frontend Setup (React.js)

1. **Navigate to the frontend directory:**
 - cd ../frontend
2. **Install frontend dependencies:**
 - npm install
3. **Run the server:**
 - npm run dev


## 🧩 System Overview 
1. **Backend (FastAPI + LangChain)** 
 - Manages PDF ingestion, parsing, and embedding.

 - Handles user queries with a semantic search over the document content.

 - Generates relevant answers using language models.

2. **Frontend (React.js)**
 - Clean, modern UI for document interaction.
 - PDF upload and real-time Q&A experience.
 - Error handling and user feedback mechanisms built-in.


#### 📂 Folder Structure Overview 

 - AskMyDoc/
 - ├── backend/
 - │   ├── app.py
 - │   ├── utils/
 - │   └── ...
 - ├── frontend/
 - │   ├── src/
 - │   └── ...
 - ├── README.md
 - └── ...
.
## 📄 License
 - MIT License
