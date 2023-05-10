import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';
import { RecipesCard } from '../components/Recipes/RecipesCard';
import { ButtonCopyClipboard } from '../components/Shared/ButtonCopyClipboard';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import { getBaseUrl, getRecipeDetail, getRecipes, useRecipes } from '../hooks/useRecipes';
import { useFetch } from '../hooks/useFetch';

import { chunkArray } from '../utils/chunckArray';

const recommendedRecipesTypeName = {
  drinks: 'meals',
  meals: 'drinks',
};

function RecipeDetails() {
  const [recipe, setRecipe] = useState();

  const { id } = useParams();
  const { pathname } = useLocation();

  const recipeType = pathname.split('/')[1];
  const recommendedRecipesType = recommendedRecipesTypeName[recipeType];

  const {
    setRecipeType,
    recommendedRecipes,
    setRecommendedRecipes,
    favoriteRecipes,
    addRecipeToFavorites,
    removeRecipeFromFavorites,
    recipesInProgress,
    doneRecipes,
  } = useRecipes();
  const { fetchData } = useFetch();

  const recipeIsFavorite = favoriteRecipes.find(
    (favoritedRecipe) => favoritedRecipe.id === id,
  );

  const handleToggleFavoriteRecipe = useCallback(() => {
    if (recipeIsFavorite) {
      removeRecipeFromFavorites({ recipeId: id });
    } else {
      addRecipeToFavorites({ recipe });
    }
  }, [addRecipeToFavorites, id, recipe, recipeIsFavorite, removeRecipeFromFavorites]);

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
    getRecipes({
      fetcher: fetchData,
      recipeType: recommendedRecipesType,
      url: `${getBaseUrl(recommendedRecipesType)}/search.php?s=`,
      totalRecipes: 6,
    })
      .then((data) => setRecommendedRecipes(data));
  }, [fetchData, id, recipeType, recommendedRecipesType, setRecommendedRecipes]);

  const parsedRecommendedRecipes = chunkArray({
    arr: recommendedRecipes,
    chunkLength: 2,
  });

  const recipeIsFinished = !!doneRecipes.find(
    (finishRecipe) => finishRecipe.id === id,
  );

  const recipeInProgress = recipesInProgress[recipeType][id];

  return (
    recipe && (
      <>
        <RecipeDetailHeader recipe={ recipe } />
        <h1>
          RecipeDetail =
          {' '}
          {id}
        </h1>
        { recipe.ingredients.map(({ ingredientName, ingredientMensure }, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredientMensure && (
              <>
                {ingredientMensure}
                {' '}
              </>
            )}
            {ingredientName}
          </p>
        )) }
        <p data-testid="instructions">{ recipe.instruction }</p>
        {recipeType === 'meals' && (
          <embed
            type="video/webm"
            src={ recipe.video_url }
            width="250"
            height="200"
            data-testid="video"
          />
        )}
        <Carousel>
          {parsedRecommendedRecipes.map((chunkRecipes, i) => (
            <Carousel.Item key={ i }>
              {chunkRecipes.map(({ element, index }) => (
                <RecipesCard
                  key={ element.id }
                  index={ index }
                  recipe={ element }
                  isRecommended
                />
              ))}
            </Carousel.Item>
          ))}
        </Carousel>
        { !recipeIsFinished && (
          <Link
            to={ `/${recipe.type}/${recipe.id}/in-progress` }
            data-testid="start-recipe-btn"
            style={ {
              position: 'fixed',
              bottom: 0,
              right: '50%',
            } }
          >
            { recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </Link>
        )}
        <ButtonCopyClipboard
          testId="share-btn"
          text="Compartilhar"
          textToCopy={ window.location.href }
        />
        <button
          onClick={ handleToggleFavoriteRecipe }
          data-testid="favorite-btn"
          src={ recipeIsFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ recipeIsFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="heart"
          />
          Favoritar
        </button>
      </>
    )
  );
}

export { RecipeDetails };
