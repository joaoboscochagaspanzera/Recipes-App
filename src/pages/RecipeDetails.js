import { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';

import '../styles/RecipeDetails.css';

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
          <div className="recipe-video">
            <h2>Video</h2>
            <embed
              type="video/webm"
              src={ recipe.video_url }
              width="360px"
              height="202.5px"
              data-testid="video"
            />
          </div>
        )}
        <h2>Recommended</h2>
        <RecommendedRecipes type={ recommendedRecipesType } />
        { !recipeIsFinished && (
          <button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
            onClick={ handleClickStartRecipe }
          >
            { recipeIsInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}

      </>
    )
  );
}

export { RecipeDetails };
