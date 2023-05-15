import { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/Shared/Header';
import { MyRecipesFeedDone } from '../components/MyRecipes/MyRecipesFeedDone';
import { MyRecipesFilterBar } from '../components/MyRecipes/MyRecipesFilterBar';
import { useRecipes } from '../hooks/useRecipes';

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
      <MyRecipesFilterBar handleFilterRecipes={ handleFilterDoneRecipes } />
      <MyRecipesFeedDone recipes={ filteredDoneRecipes } />
      <h1>DoneRecipes</h1>
    </>
  );
}

export { DoneRecipes };
