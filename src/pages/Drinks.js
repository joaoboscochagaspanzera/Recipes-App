import { useEffect } from 'react';

import { Footer } from '../components/Shared/Footer';
import { Header } from '../components/Shared/Header';
import { RecipesFilterBar } from '../components/Recipes/RecipesFilterBar';
import { RecipesFeed } from '../components/Recipes/RecipesFeed';

import { useFetch } from '../hooks/useFetch';
import { DRINK_API_BASE_URL, getRecipes, useRecipes } from '../hooks/useRecipes';

function Drinks() {
  const { recipes: { drinks }, setRecipes } = useRecipes();

  const { fetchData } = useFetch();

  useEffect(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType: 'drinks',
      url: `${DRINK_API_BASE_URL}/search.php?s=`,
    })
      .then((data) => setRecipes({ drinks: data, meals: [] }))
      .catch((err) => err);
  }, [fetchData, setRecipes]);

  console.log(drinks, 'drinks');
  return (
    <>
      <Header />
      <RecipesFilterBar />
      <RecipesFeed />
      <h1>Drinks</h1>
      <Footer />
    </>
  );
}

export { Drinks };
