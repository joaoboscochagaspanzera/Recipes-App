import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

function Recipes() {
  const { pathname } = useLocation();

  const recipeType = pathname.replace('/', '');

  const URL = `${getBaseUrl(recipeType)}/search.php?s=`;

  const { recipes, setRecipes } = useRecipes();

  const { user } = useUser();

  const { fetchData } = useFetch();

  useEffect(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType,
      url: URL,
    })
      .then((data) => setRecipes({ [recipeType]: data }))
      .catch((err) => console.log(err));

    return setRecipes({ drinks: [], meals: [] });
  }, [URL, fetchData, recipeType, setRecipes]);

  console.log(recipes[recipeType], 'recipes', recipeType);
  console.log(user, 'user');

  return (
    <>
      <h1>Drinks</h1>
      <Header />
      <RecipesFilterBar recipeType={ recipeType } />
      <RecipesFeed recipes={ recipes[recipeType] } />
      <Footer />
    </>
  );
}

export { Recipes };
