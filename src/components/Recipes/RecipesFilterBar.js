import propTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { useFetch } from '../../hooks/useFetch';
import { getBaseUrl, getRecipeCategories } from '../../hooks/useRecipes';

import { RecipesFilterItem } from './RecipesFilterItem';

function RecipesFilterBar({ recipeType }) {
  const [recipesCategories, setRecipesCategories] = useState([]);

  const URL = `${getBaseUrl(recipeType)}/list.php?c=list`;

  const { fetchData } = useFetch();

  useEffect(() => {
    getRecipeCategories({ fetcher: fetchData, recipeType, url: URL })
      .then((data) => setRecipesCategories(data))
      .catch((err) => console.log(err));

    return setRecipesCategories([]);
  }, [URL, fetchData, recipeType]);

  return (
    <>
      <h1>RecipesFilterBar</h1>
      { recipesCategories.map((recipeCategory) => (
        <RecipesFilterItem key={ recipeCategory } category={ recipeCategory } />
      )) }
    </>
  );
}

RecipesFilterBar.propTypes = {
  recipeType: propTypes.string.isRequired,
};

export { RecipesFilterBar };
