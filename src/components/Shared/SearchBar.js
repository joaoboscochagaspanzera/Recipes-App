import { useCallback } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { getBaseUrl, mapRecipe, useRecipes } from '../../hooks/useRecipes';
import '../../styles/SearchBar.css';

function SearchBar() {
  const { push } = useHistory();

  const { recipeType, setRecipes } = useRecipes();

  const inputSearch = useForm();
  const inputFilterOptions = useForm({
    initialValue: 'ingredient',
  });

  const { fetchData } = useFetch();

  const handleSearch = useCallback(async () => {
    let endpoint;

    switch (inputFilterOptions.value) {
    case 'ingredient':
      endpoint = '/filter.php?i=';
      break;
    case 'name':
      endpoint = '/search.php?s=';
      break;
    case 'first-letter':
      if (inputSearch.value.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      endpoint = '/search.php?f=';
      break;
    default:
    }

    const url = `${getBaseUrl(recipeType)}${endpoint}${inputSearch.value}`;

    const data = await fetchData(url);

    const MAX_ITENS = 12;

    const fetchedRecipes = data[recipeType] ? data[recipeType]
      .map((recipe) => mapRecipe(recipe, recipeType))
      .splice(0, MAX_ITENS)
      : [];

    if (fetchedRecipes.length === 1) {
      push(`/${recipeType}/${fetchedRecipes[0].id}`);
    } else if (fetchedRecipes.length === 0) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setRecipes((prevState) => ({ ...prevState, [recipeType]: fetchedRecipes }));
    }
  }, [
    fetchData,
    inputFilterOptions.value,
    inputSearch.value,
    push,
    recipeType,
    setRecipes,
  ]);

  return (
    <div className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search"
        className="search-input"
        { ...inputSearch }
      />
      <div className="search-bar-interface">
        <div className="search-bar-filters">
          <label>
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              value="ingredient"
              checked={ inputFilterOptions.value === 'ingredient' }
              onChange={ inputFilterOptions.onChange }
            />
            Ingredient
          </label>
          <label>
            <input
              type="radio"
              data-testid="name-search-radio"
              value="name"
              checked={ inputFilterOptions.value === 'name' }
              onChange={ inputFilterOptions.onChange }
            />
            Name
          </label>
          <label>
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              value="first-letter"
              checked={ inputFilterOptions.value === 'first-letter' }
              onChange={ inputFilterOptions.onChange }
            />
            First Letter
          </label>
        </div>
        <button onClick={ handleSearch } data-testid="exec-search-btn">
          Search
        </button>
      </div>
    </div>
  );
}

export { SearchBar };
