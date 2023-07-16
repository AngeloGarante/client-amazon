import { useEffect, useState } from "react";
import MovieCard from "./assets/MovieCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    console.log("Fetching movies...");
    async function fetchMovies() {
      try {
        const response = await fetch("https://myflix-angelo.cyclic.app/movies");
        const movies = await response.json();
        console.log(movies);
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchImages = async () => {
      try {
        const response = await fetch("http://52.59.254.42/:3000/objects");
        const data = await response.json();
        setImages(data);
        fetchThumbnails(data); // Fetch thumbnails for the images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchMovies();
    fetchImages();
  }, []);
  const fetchThumbnails = async (imageList) => {
    try {
      const thumbnails = [];
      for (const image of imageList) {
        const response = await fetch(
          `http://52.59.254.42/:3000/objects/${encodeURIComponent(image)}`
        );
        const blob = await response.blob();
        const thumbnailUrl = URL.createObjectURL(blob);
        thumbnails.push(thumbnailUrl);
      }
      setThumbnails(thumbnails);
    } catch (error) {
      console.error("Error fetching thumbnails:", error);
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://52.59.254.42/:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div>
      <Row>
        {movies.map((movie) => (
          <Col className="mb-4" key={movie.id} md={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <div>
        <h1>Upload File</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>

        <h1>Image Gallery</h1>
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Thumbnail ${index}`}
            style={{ width: "150px" }}
          />
        ))}

        <h1>Original Images</h1>
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://52.59.254.42/:3000/objects/${encodeURIComponent(
              image
            )}`}
            alt={`Image ${index}`}
            style={{ width: "500px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
