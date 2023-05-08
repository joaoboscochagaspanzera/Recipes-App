import { useEffect } from 'react';
import propTypes from 'prop-types';

import { Footer } from '../components/Shared/Footer';
import { Header } from '../components/Shared/Header';
import { RecipesFilterBar } from '../components/Recipes/RecipesFilterBar';
import { RecipesFeed } from '../components/Recipes/RecipesFeed';

import { useFetch } from '../hooks/useFetch';
import {
  getRecipes,
  useRecipes,
  getBaseUrl,
} from '../hooks/useRecipes';
import { useUser } from '../hooks/useUser';

function Recipes({ recipeType }) {
  const { recipes, setRecipes, setRecipeType } = useRecipes();

  const { user } = useUser();

  const { fetchData } = useFetch();

  useEffect(() => {
    console.log('setou recipeType');
    setRecipeType(recipeType);
  }, [recipeType, setRecipeType]);

  useEffect(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType,
      url: `${getBaseUrl(recipeType)}/search.php?s=`,
    })
      .then((data) => setRecipes({ [recipeType]: data }))
      .catch((err) => console.log(err));

    return setRecipes({ drinks: [], meals: [] });
  }, [fetchData, recipeType, setRecipes]);

  console.log(recipes[recipeType], 'recipes', recipeType);
  console.log(user, 'user');

  return (
    <>
      <h1>Drinks</h1>
      <Header />
      <RecipesFilterBar />
      <RecipesFeed recipes={ recipes[recipeType] } />
      <Footer />
    </>
  );
}

Recipes.propTypes = {
  recipeType: propTypes.string.isRequired,
};

export { Recipes };
