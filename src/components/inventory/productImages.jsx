import React from "react";
import { getImageUrl } from "../../services/imageHandler";

const ProductImages = ({ images }) => {
  return (
    images?.length > 0 && (
      <>
        <div className="rounded-4 mb-3 d-flex justify-content-center">
          <img
            alt="display"
            style={{ width: "50%", aspectRatio: 1, margin: "auto" }}
            className="rounded-4 fit"
            src={getImageUrl(images[0])}
          />
        </div>
        <div className="d-flex justify-content-center mb-3">
          {images.length > 1 &&
            images
              .slice(1)
              .map((imgUri, index) => (
                <img
                  key={index}
                  alt="sub"
                  width="70"
                  height="70"
                  className="rounded-2 border mx-2 item-thumb"
                  src={getImageUrl(imgUri)}
                />
              ))}
        </div>
      </>
    )
  );
};

export default ProductImages;
