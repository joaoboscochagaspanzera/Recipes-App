import { recipePropType } from '../../types/recipe.type';

import '../../styles/RecipeInstruction.css';

function RecipeInstruction({ recipe }) {
  return (
    <>
      <h2
        className="instructions"
      >
        Instructions
      </h2>
      <div className="recipe-instruction-container">
        <p data-testid="instructions">{ recipe.instruction }</p>
      </div>
    </>
  );
}

RecipeInstruction.propTypes = {
  recipe: recipePropType.isRequired,
};

export { RecipeInstruction };
