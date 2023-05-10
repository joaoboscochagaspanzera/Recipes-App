import { recipePropType } from '../../types/recipe.type';

function RecipeIngredients({ recipe }) {
  return (
    recipe.ingredients.map(({ ingredientName, ingredientMensure }, index) => (
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
    ))
  );
}

RecipeIngredients.propTypes = {
  recipe: recipePropType.isRequired,
};

export { RecipeIngredients };
