import { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/Shared/Header';
import { MyRecipesFeedDone } from '../components/MyRecipes/MyRecipesFeedDone';
import { MyRecipesFilterBar } from '../components/MyRecipes/MyRecipesFilterBar';
import { useRecipes } from '../hooks/useRecipes';

import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const { doneRecipes } = useRecipes();
  const [
    filteredDoneRecipes,
    setFilteredDoneRecipes,
  ] = useState(doneRecipes);
  const [filterSelected, setFilterSelected] = useState('all');

  const handleFilterDoneRecipes = useCallback((type) => {
    const filteredRecipes = doneRecipes
      .filter((doneRecipe) => doneRecipe.type === type);
    setFilteredDoneRecipes(type === 'all' ? doneRecipes : filteredRecipes);
    if (type !== filterSelected) {
      setFilterSelected(type);
    }
  }, [doneRecipes, filterSelected]);

  useEffect(() => {
    handleFilterDoneRecipes(filterSelected);
  }, [doneRecipes, filterSelected, handleFilterDoneRecipes]);

  return (
    <>
      <Header />
      <h1>Done Recipes</h1>
      <MyRecipesFilterBar handleFilterRecipes={ handleFilterDoneRecipes } />
      <MyRecipesFeedDone recipes={ filteredDoneRecipes } />
    </>
  );
}

export { DoneRecipes };
