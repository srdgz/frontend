import React from "react";
import PropTypes from "prop-types";
import ImageItem from "./ImageItem";

const ImageGrid = ({ images, onRemoveImage }) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {images.map((image, index) => (
        <ImageItem key={index} image={image} onRemoveImage={onRemoveImage} />
      ))}
    </section>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRemoveImage: PropTypes.func.isRequired,
};

export default ImageGrid;
