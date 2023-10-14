import http from "./httpService";
// import uploader from "./uploaderService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/product`;

export function getProducts() {
  return http.get(ApiEndPoint);
}

export function getProduct(id) {
  return http.get(ApiEndPoint + "/" + id);
}

export function getProductWithCategory() {
  return http.get(ApiEndPoint + "/withcategory");
}

export function getProductsBySupplier(supplier_id) {
  return http.get(ApiEndPoint + "/supplier/" + supplier_id);
}

export function saveProduct(data, files) {
  // use uploader service to upload images
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  formData.append("product_name", data.product_name);
  formData.append("product_desc", data.product_desc);
  formData.append("category_id", data.category_id);
  formData.append("product_image", []);
  formData.append("buying_price", data.buying_price);
  formData.append("retail_price", data.retail_price);
  formData.append("discount", data.discount);
  formData.append("supplier_id", data.supplier_id);
  formData.append("product_barcode", data.product_barcode);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(ApiEndPoint, formData, config);
  // console.log(data);
  // console.log(images);
  // return http.post(ApiEndPoint, data);
}

export function updateProductDiscount(product_id, discount) {
  return http.put(`${ApiEndPoint}/discount/${product_id}`, { discount });
}

export function deleteProduct(product_id) {
  return http.delete(`${ApiEndPoint}/${product_id}`);
}
