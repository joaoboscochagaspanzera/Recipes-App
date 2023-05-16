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
            <input type="radio" />
            Ingredient
          </label>
          <label>
            <input type="radio" />
            Name
          </label>
          <label>
            <input type="radio" />
            First Letter
          </label>
        </div>
        <button>
          Search
        </button>
      </div>
    </div>
  );
}

export { SearchBar };
