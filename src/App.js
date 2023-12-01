import React, { useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  const handleButtonClick = () => {
    axios
      .get("https://api.unsplash.com/photos/random", {
        params: {
          query: "car", 
          count: 1,
          client_id: '2irblVvO1iJ9yYTUN3P4HcNGLmt_9DxJk-bOWL4kJ9A', 
        },
      })
      .then(response => {
        const photo = response.data[0];
        const imageInfo = {
          imageUrl: photo.urls.regular,
          description: photo.alt_description || "Nema dostupnih informacija",
        };
        setImageData(imageInfo);
        setError(null);
      })
      .catch(error => {
        console.error("Greška prilikom dohvaćanja podataka:", error.message);
        setError("Greška prilikom dohvaćanja informacija o slici");
      });
  };

  return (
    <Container className="mt-4">
      <h1>Galerija slika</h1>
      <Button onClick={handleButtonClick} className="btn btn-primary mt-2">
        Dohvati sliku
      </Button>
      {error && <p className="text-danger mt-2">{error}</p>}
      {imageData && (
        <div className="mt-3">
          <div
            style={{
              border: `1cm solid ${getRandomColor()}`,
              overflow: "hidden",
            }}
          >
            <img
              src={imageData.imageUrl}
              alt="Slika"
              style={{ maxWidth: "100%", display: "block" }}
            />
          </div>
          <p className="mt-2" style={{ color: "red", fontSize: "20px" }}>
            Opis slike: {imageData.description}
          </p>
        </div>
      )}
    </Container>
  );
};

export default App;

