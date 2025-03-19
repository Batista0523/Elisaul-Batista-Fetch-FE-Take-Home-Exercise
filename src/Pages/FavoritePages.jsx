
import React, { useState, useEffect } from 'react';
import './favorite.css';

function FavoritePages() {
  const [favorites, setFavorites] = useState([]);
  const [selectedDogs, setSelectedDogs] = useState([]);
  const [comparisonText, setComparisonText] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);
  
  const handleSelectDog = (dog) => {
    if (selectedDogs.some(selected => selected.id === dog.id)) {
      setSelectedDogs(selectedDogs.filter(selected => selected.id !== dog.id));
    } else if (selectedDogs.length < 2) {
      setSelectedDogs([...selectedDogs, dog]);
    }
  };
  
  const generateComparison = async () => {
    if (selectedDogs.length !== 2) {
      alert('Please select exactly two dogs to compare.');
      return;
    }
    
    const breed1 = selectedDogs[0].breed;
    const breed2 = selectedDogs[1].breed;
    
    setLoading(true);
    setComparisonText('');
    
    const openAIurl = import.meta.env.VITE_OPENAI_LOCAL_URL
    try {
      const response = await fetch(`${openAIurl}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ breed1, breed2 })
      });
     console.log(openAIurl,'url open')
      if (!response.ok) {
        throw new Error('Failed to generate comparison');
      }

      const data = await response.json();
      setComparisonText(data.comparison);
    } catch (error) {
      console.error('Error generating comparison:', error);
      setComparisonText('An error occurred while generating the comparison.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="favorites-page">
      <h4>Favorites</h4>
      {favorites.length === 0 ? (
        <p>You do not have any favorite dogs.</p>
      ) : (
        <div>
          <div className="dog-list">
            {favorites.map((dog) => (
              <div 
                key={dog.id} 
                className={`dog-card ${selectedDogs.some(selected => selected.id === dog.id) ? 'selected' : ''}`}
              >
                <img className="dog-image" src={dog.img} alt={dog.name} />
                <h5>Name: {dog.name}</h5>
                <p>Breed: {dog.breed}</p>
                <p>Zip Code: {dog.zip_code}</p>
                <button 
                  onClick={() => handleSelectDog(dog)} 
                  className="select-button"
                >
                  {selectedDogs.some(selected => selected.id === dog.id) ? 'Deselect' : 'Select'}
                </button>
              </div>
            ))}
          </div>
          <button 
            className="compare-button" 
            onClick={generateComparison} 
            disabled={loading}
          >
            {loading ? 'Comparing...' : 'Compare Selected Dogs using AI'}
          </button>
          {comparisonText && (
            <div className="comparison-result">
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
