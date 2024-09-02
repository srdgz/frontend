import React from "react";
import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const ImageItem = ({ image, onRemoveImage }) => {
  const handleClick = () => {
    onRemoveImage(image.id);
  };

  return (
    <motion.card
      className="relative cursor-pointer overflow-hidden rounded-xl shadow-lg"
      whileHover={{ scale: 1.1 }}
      data-testid={`image-item-${image.id}`}
    >
      <img
        src={image.thumbnailUrl}
        alt={image.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs truncate">
        {image.title}
      </div>
      <motion.button
        className="absolute top-2 right-2 p-2 text-black bg-white rounded-full hover:text-white hover:bg-red-700"
        onClick={handleClick}
        aria-label="Remove image"
        whileTap={{ scale: 0.8 }}
        data-testid={`removeButton-${image.id}`}
      >
        <FaRegTrashAlt className="w-4 h-4 sm:w-4 sm:h-4" />
      </motion.button>
    </motion.card>
  );
};

ImageItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveImage: PropTypes.func.isRequired,
};

export default ImageItem;
