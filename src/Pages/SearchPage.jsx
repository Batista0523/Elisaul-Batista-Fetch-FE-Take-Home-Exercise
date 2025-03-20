import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./search.css";

function SearchPage() {
  // State variables to manage data and user interactions
  const [dogs, setDogs] = useState([]);
  const [breedFilter, setBreedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("breed:asc");
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(10);

  const fetchUrl = import.meta.env.VITE_BASE_FETCH_URL;

  const matchRef = useRef(null); // Reference to scroll to the matched dog

  useEffect(() => {
    fetchDogs();
  }, [breedFilter, sortOrder]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch all dogs based on filter and sorting options
  const fetchDogs = async () => {
    try {
      const response = await axios.get(`${fetchUrl}/dogs/search`, {
        params: {
          breeds: breedFilter ? [breedFilter] : undefined,
          sort: sortOrder,
          size: 100,
        },
        withCredentials: true,
      });

      const dogIds = response.data.resultIds;

      if (dogIds.length > 0) {
        const dogsResponse = await axios.post(`${fetchUrl}/dogs`, dogIds, {
          withCredentials: true,
        });
        setDogs(dogsResponse.data);
      }
    } catch (error) {
      console.error("Failed to fetch dogs", error);
      setError("Failed to fetch dogs. Please try again later.");
    }
  };

  // Toggle dog as a favorite or remove it
  const toggleFavorite = (dog) => {
    const isFavorite = favorites.some((fav) => fav.id === dog.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== dog.id));
    } else {
      setFavorites([...favorites, dog]);
    }
  };

  // Generate a match from the favorites list
  const generateMatch = async () => {
    try {
      const response = await axios.post(`${fetchUrl}/dogs/match`, favorites.map((dog) => dog.id), {
        withCredentials: true,
      });

      const matchedDogId = response.data.match;

      const matchResponse = await axios.post(`${fetchUrl}/dogs`, [matchedDogId], {
        withCredentials: true,
      });

      setMatch(matchResponse.data[0]);
      setTimeout(() => {
        matchRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Failed to generate match", error);
      setError("Failed to generate match. Please try again later.");
    }
  };

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  return (
    <div className="search-page">
      <h4>Dog Search 🦮</h4>
      <a className="fetch-link" href="https://fetch.com/" target="_blank" rel="noopener noreferrer">Join Fetch Rewards Now 🐶</a>

      {/* Filtering, sorting, and pagination controls */}
      <div className="filter-sort">
        <input type="text" placeholder="Filter by breed" value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)} />

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="breed:asc">Breed Ascending</option>
          <option value="breed:desc">Breed Descending</option>
          <option value="age:asc">Age Ascending</option>
          <option value="age:desc">Age Descending</option>
        </select>

        <select value={dogsPerPage} onChange={(e) => setDogsPerPage(Number(e.target.value))}>
          <option value={10}>Show 10 dogs per page</option>
          <option value={20}>Show 20 dogs per page</option>
        </select>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="dog-list">
        {currentDogs.map((dog) => (
          <div key={dog.id} className="dog-card">
            <h5><strong>Name:</strong> {dog.name}</h5>
            <img className="dog-image" src={dog.img} alt={dog.name} />
            <p><strong>Age:</strong> {dog.age}</p>
            <p><strong>Breed:</strong> {dog.breed}</p>
            <p><strong>Zip Code:</strong> {dog.zip_code}</p>
            <button onClick={() => toggleFavorite(dog)}>
              {favorites.some((fav) => fav.id === dog.id) ? "Unfavorite" : "Favorite"}
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button onClick={generateMatch} className="match-button" disabled={favorites.length === 0}>🐾 Generate Match 🐾</button>

      {match && (
        <div className="match-result" ref={matchRef}>
          <h4>Your Match 🐩</h4>
          <h5>{match.name} ({match.breed})</h5>
          <img className="match-dog-img" src={match.img} alt={match.name} />
          <p>Age: {match.age}</p>
          <p>Location: {match.zip_code}</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
