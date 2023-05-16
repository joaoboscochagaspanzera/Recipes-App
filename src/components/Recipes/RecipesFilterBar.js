import { useState, useEffect } from 'react';

import { useFetch } from '../../hooks/useFetch';
import { getBaseUrl, getRecipeCategories, useRecipes } from '../../hooks/useRecipes';

import { RecipesFilterItem } from './RecipesFilterItem';

import '../../styles/RecipesFilterBar.css';

function RecipesFilterBar() {
  const [recipesCategories, setRecipesCategories] = useState([]);
  const { recipeType } = useRecipes();

  const { fetchData } = useFetch();

  useEffect(() => {
    if (recipeType) {
      getRecipeCategories({
        fetcher: fetchData,
        recipeType,
        url: `${getBaseUrl(recipeType)}/list.php?c=list`,
      })
        .then((data) => setRecipesCategories(data))
        .catch((err) => console.log(err));
    }

    return setRecipesCategories([]);
  }, [fetchData, recipeType]);

  return (
    <div className="recipes-filter-bar">
      <RecipesFilterItem category="All" />
      { recipesCategories.map((recipeCategory) => (
        <RecipesFilterItem key={ recipeCategory } category={ recipeCategory } />
      )) }
    </div>
  );
}

export { RecipesFilterBar };
