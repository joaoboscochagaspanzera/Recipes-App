import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';
import { RecipeIngredients } from '../components/Recipes/RecipeIngredients';
import { RecipeInstruction } from '../components/Recipes/RecipeInstruction';

import '../styles/RecipeDetails.css';

import { useFetch } from '../hooks/useFetch';

import {
  getRecipeDetail,
  useRecipes } from '../hooks/useRecipes';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const recipeType = pathname.split('/')[1];

  const [recipe, setRecipe] = useState();

  const { recipesInProgress, finishRecipe } = useRecipes();
  const { fetchData } = useFetch();

  useEffect(() => {
    getRecipeDetail({
      fetcher: fetchData,
      id,
      recipeType,
    })
      .then((data) => setRecipe(data));
  }, [fetchData, id, recipeType]);

  const usedIngredients = recipesInProgress[recipeType][id] || [];

  const buttonFinishRecipeIsDisabled = usedIngredients.length
    !== recipe?.ingredients.length;

  const handleClickFinishRecipe = useCallback(() => {
    finishRecipe({ recipe });
    push('/done-recipes');
  }, [finishRecipe, push, recipe]);

  return (
    recipe && (
      <>
        <RecipeDetailHeader recipe={ recipe } />
        <RecipeIngredients recipe={ recipe } inProgress />
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
        <button
          className="start-recipe-btn"
          disabled={ buttonFinishRecipeIsDisabled }
          data-testid="finish-recipe-btn"
          onClick={ handleClickFinishRecipe }
        >
          FINISH RECIPE
        </button>
      </>
    )
  );
}

export { RecipeInProgress };
