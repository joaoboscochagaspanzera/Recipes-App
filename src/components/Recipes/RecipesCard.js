import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { recipePropType } from '../../types/recipe.type';

function RecipesCard({ recipe, index, isRecommended = false }) {
  return (
    <Link
      to={ `/${recipe.type}/${recipe.id}` }
      data-testid={ `${index}-${isRecommended ? 'recommendation-card' : 'recipe-card'}` }
    >
      <p
        data-testid={ `${index}-${isRecommended ? 'recommendation-title' : 'card-name'}` }

      >
        {recipe.name}

      </p>
      <img
        src={ recipe.img_url }
        alt={ recipe.name }
        data-testid={ `${index}-card-img` }
      />
    </Link>
  );
}

RecipesCard.propTypes = {
  recipe: recipePropType.isRequired,
  index: propTypes.number.isRequired,
  isRecommended: propTypes.bool,
};

export { RecipesCard };
