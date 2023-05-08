import propTypes from 'prop-types';

import { recipePropType } from '../../types/recipe.type';

function RecipesCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
      <img
        src={ recipe.img_url }
        alt={ recipe.name }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

RecipesCard.propTypes = {
  recipe: recipePropType.isRequired,
  index: propTypes.number.isRequired,
};

export { RecipesCard };
