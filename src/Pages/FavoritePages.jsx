import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./favorite.css";

// FavoritePages Component - Displays favorite dogs, allows selection and AI comparison
function FavoritePages() {
  // State to store favorite dogs loaded from localStorage
  const [favorites, setFavorites] = useState([]);
  // State to store the two selected dogs for comparison
  const [selectedDogs, setSelectedDogs] = useState([]);
  // State to store the comparison result text
  const [comparisonText, setComparisonText] = useState("");
  // State to manage loading state during the comparison process
  const [loadingComparison, setLoadingComparison] = useState(false);
  // State to store the AI result, if needed for further processing
  const [resultAI, setResultAI] = useState(null);
  // Ref to scroll smoothly to the comparison result
  const containerAI = useRef();

  // Effect to load favorite dogs from localStorage when the component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Function to handle dog selection (select or deselect dogs)
  const handleSelectDog = (dog) => {
    // Check if the dog is already selected
    if (selectedDogs.some((selected) => selected.id === dog.id)) {
      // If yes, remove the dog from selectedDogs
      setSelectedDogs(
        selectedDogs.filter((selected) => selected.id !== dog.id)
      );
    } else if (selectedDogs.length < 2) {
      // If not and less than two dogs are selected, add the new dog to selectedDogs
      setSelectedDogs([...selectedDogs, dog]);
    }
  };

  // Function to generate a comparison using AI when two dogs are selected
  const generateComparison = async () => {
    // Check if exactly two dogs are selected
    if (selectedDogs.length !== 2) {
      alert("Please select exactly two dogs to compare.");
      return;
    }

    // Extract breeds from selected dogs
    const breed1 = selectedDogs[0].breed;
    const breed2 = selectedDogs[1].breed;

    // Update state to indicate loading process and clear previous result
    setLoadingComparison(true);
    setComparisonText("");

    
    // Retrieve the AI API URL from environment variables
    const openAIurl = import.meta.env.VITE_OPENAI_LOCAL_URL;

    try {
      // Send a POST request to the AI API for comparison
      const response = await axios.post(openAIurl, { breed1, breed2 });

      // Update comparison text and save result from AI response
      setComparisonText(
        response.data.comparison || "No comparison result available."
      );
      setResultAI(response.data[0]);
    } catch (error) {
      console.error("Error generating comparison:", error);
      setComparisonText("An error occurred while generating the comparison.");
    } finally {
      // Stop the loading process
      setLoadingComparison(false);
    }
  };

  // Effect to handle smooth scrolling to the comparison result
  useEffect(() => {
    if (comparisonText && containerAI.current) {
      containerAI.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comparisonText]);

  return (
    <div className="favorites-page">
      <h4>🦴 Favorites 🦴</h4>

      {/* Link to join Fetch Rewards */}
      <a
        className="fetch-link"
        href="https://fetch.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Fetch Rewards Now 🐶
      </a>
      <br />

      {/* Check if there are any favorite dogs */}
      {favorites.length === 0 ? (
        <p>You do not have any favorite dogs.</p>
      ) : (
        <div>
          {/* Display the list of favorite dogs */}
          <div className="dog-list">
            {favorites.map((dog) => (
              <div
                key={dog.id}
                className={`dog-card ${
                  selectedDogs.some((selected) => selected.id === dog.id)
                    ? "selected"
                    : ""
                }`}
              >
                <h5>
                  <strong>Name:</strong> {dog.name}
                </h5>
                <img className="dog-image" src={dog.img} alt={dog.name} />
                <p>
                  <strong>Age:</strong> {dog.age}
                </p>
                <p>
                  <strong>Breed:</strong> {dog.breed}
                </p>
                <p>
                  <strong>Zip Code:</strong> {dog.zip_code}
                </p>
                <button
                  onClick={() => handleSelectDog(dog)}
                  className="select-button"
                >
                  {selectedDogs.some((selected) => selected.id === dog.id)
                    ? "Deselect"
                    : "Select"}
                </button>
              </div>
            ))}
          </div>

          {/* Compare button to trigger AI comparison */}
          <div className="button-group">
            <button
              className="compare-button"
              onClick={generateComparison}
              disabled={loadingComparison}
            >
              {loadingComparison ? "Comparing..." : "Compare Dogs With Our AI"}
            </button>
          </div>

          {/* Display comparison result if available */}
          {comparisonText && (
            <div
              className="comparison-result animate-fade-in"
              ref={containerAI}
            >
              <h4>Comparison Result:</h4>
              <p>{comparisonText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FavoritePages;
