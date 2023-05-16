import { recipePropType } from '../../types/recipe.type';

import '../../styles/RecipeDetailHeader.css';

function RecipeDetailHeader({ recipe }) {
  console.log(recipe.type, recipe.category);
  return (
    <section className="recipe-detail-header">
      <div className="recipe-category-header">
        <img
          src={ `../icons/${recipe.type}/${recipe.category}.svg` }
          alt={ recipe.category }
        />
        <span
          data-testid="recipe-category"
        >
          { recipe.alcoholicOrNot || recipe.category }
        </span>
      </div>
      <div className="recipe-image-container">
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid="recipe-photo"
        />
      </div>
      <h1 data-testid="recipe-title">{ recipe.name }</h1>
    </section>
  );
}

RecipeDetailHeader.propTypes = {
  recipe: recipePropType.isRequired,
};

export { RecipeDetailHeader };
