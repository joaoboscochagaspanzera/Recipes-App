import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';
import { RecipesCard } from '../components/Recipes/RecipesCard';

import { getBaseUrl, getRecipeDetail, getRecipes, useRecipes } from '../hooks/useRecipes';
import { useFetch } from '../hooks/useFetch';
import { chunkArray } from '../utils/chunckArray';

function RecipeDetail({ inProgress = false }) {
  console.log(inProgress);
  const [recipe, setRecipe] = useState();

  const { id } = useParams();
  const { pathname } = useLocation();

  const recipeType = pathname.split('/')[1];
  const recommendedRecipesType = recipeType === 'meals' ? 'drinks' : 'meals';

  const { setRecipeType, recommendedRecipes, setRecommendedRecipes } = useRecipes();
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
        <button
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          Start Recipe
        </button>
      </>
    )
  );
}

RecipeDetail.propTypes = {
  inProgress: propTypes.bool,
};

export { RecipeDetail };
