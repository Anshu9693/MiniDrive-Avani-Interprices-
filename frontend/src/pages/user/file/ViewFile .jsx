import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../../components/UserNabar";

const ViewFile = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchFile = async () => {
      const res = await axios.get(
        `${BACKEND_URL}/api/files/view/${id}`,
        { withCredentials: true }
      );
      setFile(res.data);
    };
    fetchFile();
  }, []);

  if (!file) return <p className="text-white">Loading...</p>;

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-black p-6 flex justify-center items-center">
        {file.fileType === "image" ? (
          <img src={file.fileUrl} className="max-h-screen" />
        ) : (
          <iframe
            src={file.fileUrl}
            className="w-full h-screen"
            title="PDF Viewer"
          />
        )}
      </div>
    </>
  );
};

export default ViewFile;
