import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import propTypes from 'prop-types';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';

import { getRecipeDetail, useRecipes } from '../hooks/useRecipes';
import { useFetch } from '../hooks/useFetch';

function RecipeDetail({ inProgress = false }) {
  const { id } = useParams();
  const { pathname } = useLocation();

  const recipeType = pathname.split('/')[1];

  const [recipe, setRecipe] = useState();

  const { setRecipeType } = useRecipes();
  const { fetchData } = useFetch();

  useEffect(() => {
    setRecipeType(recipeType);
  }, [recipeType, setRecipeType]);

  useEffect(() => {
    getRecipeDetail({
      fetcher: fetchData,
      id,
      recipeType,
    })
      .then((data) => setRecipe(data));
  }, [fetchData, id, recipeType]);

  console.log('in-progress: ', inProgress);
  console.log(recipe, 'recipe');
  return (
    <>
      <RecipeDetailHeader />
      <h1>
        RecipeDetail =
        {' '}
        {id}
      </h1>
    </>
  );
}

RecipeDetail.propTypes = {
  inProgress: propTypes.bool,
};

export { RecipeDetail };
