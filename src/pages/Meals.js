import { useEffect } from 'react';

import { Footer } from '../components/Shared/Footer';
import { Header } from '../components/Shared/Header';
import { RecipesFeed } from '../components/Recipes/RecipesFeed';
import { RecipesFilterBar } from '../components/Recipes/RecipesFilterBar';

import { getRecipes, MEAL_API_BASE_URL, useRecipes } from '../hooks/useRecipes';
import { useFetch } from '../hooks/useFetch';
import { useUser } from '../hooks/useUser';

function Meals() {
  const { recipes: { meals }, setRecipes } = useRecipes();
  const { user } = useUser();

  const { fetchData } = useFetch();

  useEffect(() => {
    getRecipes({
      fetcher: fetchData,
      recipeType: 'meals',
      url: `${MEAL_API_BASE_URL}/search.php?s=`,
    })
      .then((data) => setRecipes({ meals: data, drinks: [] }))
      .catch((err) => err);
  }, [fetchData, setRecipes]);

  console.log(meals, 'meals');
  console.log(user, 'user');
  return (
    <>
      <Header />
      <RecipesFilterBar />
      <RecipesFeed />
      <h1>Meals</h1>
      <Footer />
    </>
  );
}

export { Meals };
