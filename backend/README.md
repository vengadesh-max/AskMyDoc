# Backend Architecture and Workflow Overview
The backend system is designed to handle PDF uploads, process user questions, generate answers, and maintain a history of interactions.

## Architecture Overview
1. **FastAPI Framework:**
   - Utilizes FastAPI for creating RESTful APIs with asynchronous capabilities, ensuring high performance and responsiveness.

2. **Text Processing:**
   - PDF uploads are processed to extract text using the `PyPDF2` library.
   - Text is segmented into chunks using LangChain's `RecursiveCharacterTextSplitter` for efficient storage and analysis.

3. **Embeddings and Similarity Search:**
   - `GoogleGenerativeAIEmbeddings` from LangChain is used to create vector embeddings from text chunks.
   - These embeddings are stored and indexed using `FAISS` (Facebook AI Similarity Search) for efficient similarity search operations.

4. **Question Answering Chain:**
   - Utilizes a conversational question-answering model powered by `ChatGoogleGenerativeA`I and LangChain's `load_qa_chain` functionality.
   - User queries are processed against indexed text chunks to generate relevant and accurate answers.

5. **Endpoints and Workflow:**
   - **PDF Upload Endpoint (`/upload_pdf/`):**
     - Accepts PDF files for upload and processes them to extract text and create embeddings.
     - Stores the processed data for future queries.

   - **Question Processing Endpoint (`/ask_question/`):**
     - Accepts user questions and retrieves relevant document chunks from the indexed data.
     - Utilizes the question-answering chain to generate answers based on the context and user query.

   - **History Retrieval Endpoint (`/history/`):**
     - Provides access to the history of user queries and corresponding answers.
     - Enables users to review past interactions and responses.


