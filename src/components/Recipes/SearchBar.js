import React from 'react';

function SearchBar() {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('teste');
  };

  return (
    <div>
      Search Bar
      <form>
        <input
          type="text"
          data-testid="search-input"
        />
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            id="ingredient"
            name="selectFilter"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            name="selectFilter"
            value="name"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="firstLetter">
          First Letter
          <input
            type="radio"
            id="firstLetter"
            name="selectFilter"
            value="firstLetter"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ () => handleClick }
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
