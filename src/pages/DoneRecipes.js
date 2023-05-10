import { Header } from '../components/Shared/Header';
import { MyRecipesFeed } from '../components/MyRecipes/MyRecipesFeed';
import { MyRecipesFilterBar } from '../components/MyRecipes/MyRecipesFilterBar';
import { useRecipes } from '../hooks/useRecipes';

function DoneRecipes() {
  const { doneRecipes } = useRecipes();
  return (
    <>
      <Header />
      <MyRecipesFilterBar />
      <MyRecipesFeed recipes={ doneRecipes } />
      <h1>DoneRecipes</h1>
    </>
  );
}

export { DoneRecipes };
