import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const UploadImageWindow = ({ id, update }) => {
  const [file, setFile] = useState(null);

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="ModalBase"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      testId={"modalwindow"}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Upload New Image
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="row modal-body">
            <FileUploader
              handleChange={setFile}
              name="file"
              types={["JPG", "PNG"]}
              single
            />
            {file && (
              <div className="row my-2 justify-content-center">
                <img
                  src={URL.createObjectURL(file)}
                  alt="profile"
                  className="rounded align-self-center m-2"
                  style={{
                    width: 200,
                    aspectRatio: 1,
                    objectFit: "scale-down",
                  }}
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => setFile(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!file}
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => update(file)}
            >
              Update Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImageWindow;
