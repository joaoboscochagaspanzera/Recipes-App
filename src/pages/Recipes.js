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
  const recipeType = pathname.split('/')[1];

  const { recipes, setRecipes, setRecipeType } = useRecipes();

  const { user } = useUser();
  console.log(user);

  const { fetchData } = useFetch();

  useEffect(() => {
    setRecipeType(recipeType);
  }, [recipeType, setRecipeType]);

  useEffect(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType,
      url: `${getBaseUrl(recipeType)}/search.php?s=`,
    })
      .then((data) => setRecipes((prevState) => ({ ...prevState, [recipeType]: data })));
  }, [fetchData, recipeType, setRecipes]);

  return (
    <>
      <Header />
      <RecipesFilterBar />
      <RecipesFeed recipes={ recipes[recipeType] } />
      <Footer />
    </>
  );
}

export { Recipes };
