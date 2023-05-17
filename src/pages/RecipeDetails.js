import { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';

import {
  getRecipeDetail,
  getRecommendedRecipesType,
  useRecipes,
} from '../hooks/useRecipes';
import { useFetch } from '../hooks/useFetch';

import { RecipeIngredients } from '../components/Recipes/RecipeIngredients';
import { RecipeInstruction } from '../components/Recipes/RecipeInstruction';
import { RecommendedRecipes } from '../components/Recipes/RecommendedRecipes';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();

  const { id } = useParams();
  const { pathname } = useLocation();
  const { push } = useHistory();

  const recipeType = pathname.split('/')[1];
  const recommendedRecipesType = getRecommendedRecipesType({ recipeType });

  const {
    setRecipeType,
    startOrEditRecipe,
    recipesInProgress,
    doneRecipes,
  } = useRecipes();
  const { fetchData } = useFetch();

  const recipeIsInProgress = !!recipesInProgress[recipeType][id];

  const handleClickStartRecipe = useCallback(() => {
    if (!recipeIsInProgress) {
      startOrEditRecipe({ recipe });
    }
    push(`/${recipe.type}/${recipe.id}/in-progress`);
  }, [push, recipe, recipeIsInProgress, startOrEditRecipe]);

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

  const recipeIsFinished = !!doneRecipes.find(
    (finishRecipe) => finishRecipe.id === id,
  );

  return (
    recipe && (
      <>
        <RecipeDetailHeader recipe={ recipe } />
        <RecipeIngredients recipe={ recipe } />
        <RecipeInstruction recipe={ recipe } />
        {recipeType === 'meals' && (
          <>
            <h2>Video</h2>
            <embed
              type="video/webm"
              src={ recipe.video_url }
              width="336px"
              height="205.09px"
              data-testid="video"
            />
          </>
        )}
        <h2>Recommended</h2>
        <RecommendedRecipes type={ recommendedRecipesType } />
        { !recipeIsFinished && (
          <button
            data-testid="start-recipe-btn"
            onClick={ handleClickStartRecipe }
            style={ {
              position: 'fixed',
              bottom: 0,
              right: '50%',
            } }
          >
            { recipeIsInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}

      </>
    )
  );
}

export { RecipeDetails };
