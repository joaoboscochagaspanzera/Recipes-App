import { useCallback } from 'react';
import propTypes from 'prop-types';

import { getBaseUrl, getRecipes, useRecipes } from '../../hooks/useRecipes';
import { useFetch } from '../../hooks/useFetch';

function RecipesFilterItem({ category }) {
  const { fetchData } = useFetch();
  const { recipeType, setRecipes } = useRecipes();

  const url = `${getBaseUrl(
    recipeType,
  )}${category === 'All' ? '/search.php?s=' : `/filter.php?c=${category}`}`;

  const handleClickFilterButton = useCallback(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType,
      url,
    })
      .then((data) => setRecipes({ [recipeType]: data }));
  }, [fetchData, recipeType, setRecipes, url]);

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
