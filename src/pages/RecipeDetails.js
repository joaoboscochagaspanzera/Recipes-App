import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import copyToClipboard from 'clipboard-copy';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';
import { RecipesCard } from '../components/Recipes/RecipesCard';

import shareIcon from '../images/shareIcon.svg';

import { getBaseUrl, getRecipeDetail, getRecipes, useRecipes } from '../hooks/useRecipes';
import { useFetch } from '../hooks/useFetch';
import { chunkArray } from '../utils/chunckArray';
import { useLocalStorage } from '../hooks/useLocalStorage';

function RecipeDetails({ inProgress = false }) {
  console.log(inProgress);
  const [recipe, setRecipe] = useState();
  const [linkWasCopyToClipboard, setLinkWasCopyToClipboard] = useState(false);

  const { id } = useParams();
  const { pathname } = useLocation();

  const recipeType = pathname.split('/')[1];
  const recommendedRecipesType = recipeType === 'meals' ? 'drinks' : 'meals';

  const { setRecipeType, recommendedRecipes, setRecommendedRecipes } = useRecipes();
  const { fetchData } = useFetch();
  const [storagedDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [storagedFavoritedRecipes, setStoragedFavoritedRecipes] = useLocalStorage(
    'favoriteRecipes',
    [],
  );
  const [storagedInProgessRecipes] = useLocalStorage(
    'inProgressRecipes',
    { drinks: {}, meals: {} },
  );

  const handleClickShareButton = useCallback(() => {
    setLinkWasCopyToClipboard(true);
    copyToClipboard(window.location.href);
  }, []);

  const handleClickFavoriteRecipeButton = useCallback(() => {
    const recipeToStorage = {
      id: String(recipe.id),
      type: recipe.type.substr(0, recipe.type.length - 1),
      nationality: recipe.nationality,
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
    };
    setStoragedFavoritedRecipes([...storagedFavoritedRecipes, recipeToStorage]);
  }, [recipe, setStoragedFavoritedRecipes, storagedFavoritedRecipes]);

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

  const recipeIsFinished = !!storagedDoneRecipes.find(
    (finishRecipe) => finishRecipe.id === id,
  );

  const recipeInProgress = storagedInProgessRecipes[recipeType]
    ? storagedInProgessRecipes[recipeType][id]
    : null;

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
        <button
          data-testid="share-btn"
          onClick={ handleClickShareButton }
        >
          <img src={ shareIcon } alt="share icon" />
          Compartilhar
        </button>
        <button
          onClick={ handleClickFavoriteRecipeButton }
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        { linkWasCopyToClipboard && (
          <p>Link copied!</p>
        )}
      </>
    )
  );
}

RecipeDetails.propTypes = {
  inProgress: propTypes.bool,
};

export { RecipeDetails };
