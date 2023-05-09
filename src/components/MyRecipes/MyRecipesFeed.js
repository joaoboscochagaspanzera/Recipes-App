import { useLocalStorage } from '../../hooks/useLocalStorage';
import { MyRecipesCard } from './MyRecipesCard';

function MyRecipesFeed() {
  const [storagedFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  console.log(storagedFavoriteRecipes);

  return (
    <>
      <h1>MyRecipesFeed</h1>
      {
        storagedFavoriteRecipes.map((recipe, index) => (
          <MyRecipesCard key={ recipe.id } recipe={ recipe } index={ index } />
        ))
      }
    </>
  );
}

export { MyRecipesFeed };
