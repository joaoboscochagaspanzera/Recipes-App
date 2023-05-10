import { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/Shared/Header';
import { MyRecipesFeed } from '../components/MyRecipes/MyRecipesFeed';
import { MyRecipesFilterBar } from '../components/MyRecipes/MyRecipesFilterBar';
import { useRecipes } from '../hooks/useRecipes';

function FavoriteRecipes() {
  const { favoriteRecipes } = useRecipes();
  const [
    filteredFavoritesRecipes,
    setFilteredFavoritesRecipes,
  ] = useState(favoriteRecipes);
  const [filterSelected, setFilterSelected] = useState('all');

  const handleFilterFavoriteRecipes = useCallback((type) => {
    const filteredRecipes = favoriteRecipes
      .filter((favoriteRecipe) => favoriteRecipe.type === type);
    setFilteredFavoritesRecipes(type === 'all' ? favoriteRecipes : filteredRecipes);
    if (type !== filterSelected) {
      setFilterSelected(type);
    }
  }, [favoriteRecipes, filterSelected]);

  useEffect(() => {
    handleFilterFavoriteRecipes(filterSelected);
  }, [favoriteRecipes, filterSelected, handleFilterFavoriteRecipes]);
  return (
    <>
      <Header />
      <MyRecipesFilterBar handleFilterRecipes={ handleFilterFavoriteRecipes } />
      <MyRecipesFeed recipes={ filteredFavoritesRecipes } />
      <h1>FavoriteRecipes</h1>
    </>
  );
}

export { FavoriteRecipes };
