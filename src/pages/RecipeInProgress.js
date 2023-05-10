import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
  const recipeType = pathname.split('/')[1];

  const [recipe, setRecipe] = useState();

  const { recipesInProgress } = useRecipes();
  const { fetchData } = useFetch();
  console.log(recipesInProgress);

  useEffect(() => {
    getRecipeDetail({
      fetcher: fetchData,
      id,
      recipeType,
    })
      .then((data) => setRecipe(data));
  }, [fetchData, id, recipeType]);

  const recommendedRecipesType = getRecommendedRecipesType({ recipeType });

  return (
    recipe && (
      <>
        <RecipeDetailHeader recipe={ recipe } />
        <RecipeIngredients recipe={ recipe } />
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
        <button data-testid="finish-recipe-btn">Finish Recipe</button>
      </>
    )
  );
}

export { RecipeInProgress };
