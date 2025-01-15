import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Button } from "./Button";

export function Header() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    setLoading(true);
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/upload_pdf/", formData, {
        //   await axios.post("https://querypdf.onrender.com/upload_pdf/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedFileName(acceptedFiles[0].name);
      alert("File uploaded and processed successfully");
    } catch (err) {
      setError("Failed to upload file");
      console.error("Error uploading file:", err);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex justify-between shadow bg-white mb-2 items-center p-4 fixed w-full">
      <div className="m-2 flex items-center">
        <img src="./icon.svg" alt="Icon" className="text-2xl mr-2" />
        <span className="tracking-tighter font-bold text-2xl">AskMyDoc</span>
      </div>
      <div {...getRootProps()} className="flex items-center">
        <input
          {...getInputProps()}
          aria-label="Upload PDF"
          className="hidden"
        />
        <div
          className={`w-34 h-10 flex items-center justify-center ${
            uploadedFileName ? "bg-green-200" : "bg-transparent"
          } text-gray-700 font-semibold mr-4 rounded-md p-2`}
        >
          {uploadedFileName && (
            <span className="truncate">{uploadedFileName}</span>
          )}
        </div>
        <Button>{loading ? "Uploading..." : "Upload PDF"}</Button>
        {error && <div className="text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
}
