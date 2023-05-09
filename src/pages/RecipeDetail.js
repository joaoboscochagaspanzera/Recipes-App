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
      </>
    )
  );
}

RecipeDetail.propTypes = {
  inProgress: propTypes.bool,
};

export { RecipeDetail };
