import { recipePropType } from '../../types/recipe.type';

function RecipeDetailHeader({ recipe }) {
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ recipe.name }</h1>
      <span
        data-testid="recipe-category"
      >
        { recipe.alcoholicOrNot || recipe.category }
      </span>
    </div>
  );
}

RecipeDetailHeader.propTypes = {
  recipe: recipePropType.isRequired,
};

export { RecipeDetailHeader };
