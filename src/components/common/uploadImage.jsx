import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const UploadImage = ({ fileTypes, setFiles }) => {
  const [filePreview, setFilePreview] = useState([]);

  const handleChange = (file) => {
    setFiles(file);
    setFilePreview([...file]);
  };

  return (
    <>
      <label
        className="mx-2 mb-1"
        style={{ color: "rgba(var(--bs-body-color-rgb), 0.65)" }}
      >
        Images:
      </label>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple
      />
      {filePreview.length > 0 && (
        <div
          className="row my-2"
          style={{
            borderColor: "rgb(6, 88, 194)",
            borderWidth: 2,
            borderStyle: "solid",
            width: "fit-content",
            marginLeft: 5,
          }}
        >
          {filePreview.map((imgSrc, index) => (
            <img
              key={index}
              src={URL.createObjectURL(imgSrc)}
              alt="profile"
              className="rounded"
              style={{
                width: 100,
                aspectRatio: 1,
                margin: 5,
                objectFit: "scale-down",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UploadImage;
