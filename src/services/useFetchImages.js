import { useEffect, useState } from "react";

const useFetchImages = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`
      );
      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.statusText}`);
      }
      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data]);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 300 >=
        document.documentElement.scrollHeight
      ) {
        if (!isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return { images, isLoading, handleRemoveImage };
};

export default useFetchImages;
