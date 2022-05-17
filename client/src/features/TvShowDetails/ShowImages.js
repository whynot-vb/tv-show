import React from "react";
import { useSelector } from "react-redux";
import ImageGallery from "react-image-gallery";

import "../../features/features.css";

const selectImages = (state) => state.details.images.backdrops;

export default function ShowImages() {
  const images = useSelector(selectImages);
  let tvImages = [];
  images?.forEach((image) => {
    if (image?.iso_639_1 === null) {
      tvImages?.push({
        original: `https://image.tmdb.org/t/p/w500${image.file_path}`,
        thumbnail: `https://image.tmdb.org/t/p/w200${image.file_path}`,
      });
    }
  });
  return (
    <>
      <div className="actors-text">
        <h2>GALLERY</h2>
      </div>
      <div className="images-container" style={{ backgroundColor: "white" }}>
        <ImageGallery items={tvImages} />
      </div>
    </>
  );
}
