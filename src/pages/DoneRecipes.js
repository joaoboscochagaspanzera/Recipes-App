import { Header } from '../components/Shared/Header';
import { MyRecipesFeed } from '../components/MyRecipes/MyRecipesFeed';
import { MyRecipesFilterBar } from '../components/MyRecipes/MyRecipesFilterBar';

function DoneRecipes() {
  return (
    <>
      <Header />
      <MyRecipesFilterBar />
      <MyRecipesFeed />
      <h1>DoneRecipes</h1>
    </>
  );
}

export { DoneRecipes };
