import { useCallback } from 'react';
import propTypes from 'prop-types';

import { getBaseUrl, getRecipes, useRecipes } from '../../hooks/useRecipes';
import { useFetch } from '../../hooks/useFetch';

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
        setRecipes({ [recipeType]: data });
      })
      .catch((err) => console.log(err));
  }, [category, fetchData, recipeType, setCategoryFilterSelected, setRecipes, url]);

  return (
    <button
      data-testid={ `${category}-category-filter` }
      onClick={ handleClickFilterButton }
    >
      {category}
    </button>
  );
}

RecipesFilterItem.propTypes = {
  category: propTypes.string.isRequired,
};

export { RecipesFilterItem };
