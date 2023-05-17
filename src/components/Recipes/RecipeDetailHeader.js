import { recipePropType } from '../../types/recipe.type';

import { ButtonCopyClipboard } from '../Shared/ButtonCopyClipboard';
import { ButtonFavoriteRecipe } from './ButtonFavoriteRecipe';

import '../../styles/RecipeDetailHeader.css';

function RecipeDetailHeader({ recipe }) {
  console.log(recipe.type, recipe.category);
  return (
    <>
      <section className="recipe-detail-header">
        <div className="recipe-category-header">
          <img
            // imagem da categoria
            className="category-image"
            src={ `../icons/${recipe.type}/${recipe.category}.svg` }
            alt={ recipe.category }
          />
          <span
            data-testid="recipe-category"
            // nome da categoria
          >
            { recipe.alcoholicOrNot || recipe.category }
          </span>
          <div className="icons">
            <ButtonCopyClipboard
              className="btn-copy-clipboard"
              testId="share-btn"
              textToCopy={ window.location.href }
            />
            <ButtonFavoriteRecipe
              className="btn-favorite-recipe"
              recipe={ recipe }
            />
          </div>
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
      <h2 className="recipe-detail-header-h2">Ingredients</h2>
    </>
  );
}

RecipeDetailHeader.propTypes = {
  recipe: recipePropType.isRequired,
};

export { RecipeDetailHeader };
