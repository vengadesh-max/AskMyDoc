from fastapi import APIRouter, File, UploadFile, HTTPException
from utils import get_pdf_text, get_text_chunks, get_vector_store
import shutil
import os

router = APIRouter()

@router.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    # Define the target directory
    upload_directory = "uploaded_files"

    # Create the directory if it doesn't exist
    if not os.path.exists(upload_directory):
        os.makedirs(upload_directory)
    else:
        # Delete any existing files in the directory
        for filename in os.listdir(upload_directory):
            file_path = os.path.join(upload_directory, filename)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print(f"Error deleting file {file_path}: {e}")

    # Save the uploaded PDF file
    file_location = os.path.join(upload_directory, file.filename)
    try:
        with open(file_location, "wb") as f:
            f.write(await file.read())  # Ensure async file read
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving PDF: {e}")

    # Process the PDF to create embeddings
    try:
        raw_text = get_pdf_text(file_location)  # Extract text from the PDF
        text_chunks = get_text_chunks(raw_text)  # Split the text into chunks
        get_vector_store(text_chunks)  # Create and save vector store embeddings
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {e}")

    return {"info": f"File '{file.filename}' uploaded and processed successfully"}
