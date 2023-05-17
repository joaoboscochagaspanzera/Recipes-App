import { useCallback, useMemo } from 'react';
import propTypes from 'prop-types';

import { useRecipes } from '../../hooks/useRecipes';

import { recipePropType } from '../../types/recipe.type';

import '../../styles/RecipeIngredients.css';

function RecipeIngredients({ recipe, inProgress = false }) {
  const { recipesInProgress, startOrEditRecipe } = useRecipes();

  const ingredientsUsed = useMemo(
    () => recipesInProgress[recipe.type][recipe.id] || [],
    [recipe.id, recipe.type, recipesInProgress],
  );

  const handleToggleCheckIngredient = useCallback(({ ingredient }) => {
    const ingredientWasUsed = ingredientsUsed
      .find((ingredientUsed) => ingredientUsed.id === ingredient.id);

    if (ingredientWasUsed) {
      const ingredientUsedIndex = ingredientsUsed
        .findIndex((ingredientUsed) => ingredientUsed.id === ingredient.id);

      ingredientsUsed.splice(ingredientUsedIndex, 1);

      startOrEditRecipe({ recipe, ingredients: ingredientsUsed });
    } else {
      startOrEditRecipe({ recipe, ingredients: [...ingredientsUsed, ingredient] });
    }
  }, [ingredientsUsed, recipe, startOrEditRecipe]);

  return (
    inProgress
      ? (
        <>
          <h2 className="recipe-detail-header-h2">Ingredients</h2>
          <div className="recipe-ingredients-todo">
            { recipe.ingredients.map(({ name, meansure, id }, index) => {
              const ingredientWasUsed = ingredientsUsed
                .find((ingredient) => ingredient.id === id);

              const ingredient = { name, meansure, id };
              return (
                <label
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                  style={ {
                    textDecoration: ingredientWasUsed
                      ? 'line-through solid rgb(0, 0, 0)'
                      : '',
                  } }
                >
                  <input
                    type="checkbox"
                    name="ingredient"
                    checked={ ingredientWasUsed }
                    onChange={ () => handleToggleCheckIngredient({ ingredient }) }
                  />
                  {meansure}
                  {' '}
                  {name}
                </label>
              );
            })}
          </div>
        </>
      )
      : (
        <>
          <h2 className="recipe-detail-header-h2">Ingredients</h2>
          <ul className="recipe-ingredients-list">
            {recipe.ingredients.map(({ name, meansure }, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {meansure && (
                  <>
                    {meansure}
                    {' '}
                  </>
                )}
                {name}
              </li>
            ))}
          </ul>
        </>
      )
  );
}

RecipeIngredients.propTypes = {
  recipe: recipePropType.isRequired,
  inProgress: propTypes.bool,
};

export { RecipeIngredients };
