import React from "react";
import ImageGrid from "./components/ImageGrid";
import Loader from "./components/Loader";
import useFetchImages from "./services/useFetchImages";

const App = () => {
  const { images, isLoading, handleRemoveImage } = useFetchImages();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <ImageGrid images={images} onRemoveImage={handleRemoveImage} />
      {isLoading && <Loader />}
    </main>
  );
};

export default App;
