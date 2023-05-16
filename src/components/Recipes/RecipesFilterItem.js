import { useCallback } from 'react';
import propTypes from 'prop-types';

import { getBaseUrl, getRecipes, useRecipes } from '../../hooks/useRecipes';
import { useFetch } from '../../hooks/useFetch';

import '../../styles/RecipesFilterItem.css';

function RecipesFilterItem({ category }) {
  const { fetchData } = useFetch();
  const {
    recipeType,
    setRecipes,
    categoryFilterSelected,
    setCategoryFilterSelected,
  } = useRecipes();

  const endPoint = (category === 'All' || category === categoryFilterSelected)
    ? '/search.php?s='
    : `/filter.php?c=${category}`;

  const url = `${getBaseUrl(
    recipeType,
  )}${endPoint}`;

  const handleClickFilterButton = useCallback(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType,
      url,
    })
      .then((data) => {
        setCategoryFilterSelected(category);
        setRecipes((prevState) => ({ ...prevState, [recipeType]: data }));
      })
      .catch((err) => console.log(err));
  }, [category, fetchData, recipeType, setCategoryFilterSelected, setRecipes, url]);
  const parsedCategoryFileName = category.replace('/', '').replace(/ +/, '');
  return (
    <button
      className="recipes-filter-item"
      data-testid={ `${category}-category-filter` }
      onClick={ handleClickFilterButton }
    >
      <div className="recipes-filter-item-content">
        <img
          src={ `./icons/${recipeType}/${parsedCategoryFileName}.svg` }
          alt={ category }
          width={ 40 }
          height={ 40 }
        />
        {category}
      </div>
    </button>
  );
}

RecipesFilterItem.propTypes = {
  category: propTypes.string.isRequired,
};

export { RecipesFilterItem };
