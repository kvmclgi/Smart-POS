import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/upload`;

// will return imageURL
export function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(ApiEndPoint, formData, config);
}

export function uploadMultipleImage(files) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  console.log(formData);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(`${ApiEndPoint}-multiple`, formData, config);
}
