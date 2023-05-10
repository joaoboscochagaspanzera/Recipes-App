import { recipePropType } from '../../types/recipe.type';

function RecipeInstruction({ recipe }) {
  return <p data-testid="instructions">{ recipe.instruction }</p>;
}

RecipeInstruction.propTypes = {
  recipe: recipePropType.isRequired,
};

export { RecipeInstruction };
