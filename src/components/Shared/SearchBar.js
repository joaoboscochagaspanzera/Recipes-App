import '../../styles/SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search"
        className="search-input"
      />
      <div className="search-bar-interface">
        <div className="search-bar-filters">
          <label>
            <input
              type="radio"
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label>
            <input
              type="radio"
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label>
            <input
              type="radio"
              data-testid="first-letter-search-radio"
            />
            First Letter
          </label>
        </div>
        <button data-testid="exec-search-btn">
          Search
        </button>
      </div>
    </div>
  );
}

export { SearchBar };
