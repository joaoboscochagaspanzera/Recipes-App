import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { ButtonFavoriteRecipe } from '../components/Recipes/ButtonFavoriteRecipe';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';
import { RecipeIngredients } from '../components/Recipes/RecipeIngredients';
import { RecipeInstruction } from '../components/Recipes/RecipeInstruction';
import { RecommendedRecipes } from '../components/Recipes/RecommendedRecipes';
import { ButtonCopyClipboard } from '../components/Shared/ButtonCopyClipboard';

import { useFetch } from '../hooks/useFetch';

import {
  getRecipeDetail,
  getRecommendedRecipesType,
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

  const recommendedRecipesType = getRecommendedRecipesType({ recipeType });

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
          <embed
            type="video/webm"
            src={ recipe.video_url }
            width="250"
            height="200"
            data-testid="video"
          />
        )}
        <RecommendedRecipes type={ recommendedRecipesType } />
        <ButtonCopyClipboard
          testId="share-btn"
          text="Compartilhar"
          textToCopy={ `${window.location.origin}/${recipeType}/${id}` }
        />
        <ButtonFavoriteRecipe recipe={ recipe } />
        <button
          disabled={ buttonFinishRecipeIsDisabled }
          data-testid="finish-recipe-btn"
          onClick={ handleClickFinishRecipe }
        >
          Finish Recipe
        </button>
      </>
    )
  );
}

export { RecipeInProgress };
