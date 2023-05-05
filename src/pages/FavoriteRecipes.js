import { Header } from '../components/Shared/Header';
import { MyRecipesFeed } from '../components/MyRecipes/MyRecipesFeed';
import { MyRecipesFilterBar } from '../components/MyRecipes/MyRecipesFilterBar';

function FavoriteRecipes() {
  return (
    <>
      <Header />
      <MyRecipesFilterBar />
      <MyRecipesFeed />
      <h1>FavoriteRecipes</h1>
    </>
  );
}

export { FavoriteRecipes };
