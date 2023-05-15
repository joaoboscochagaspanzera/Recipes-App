import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { recipePropType } from '../../types/recipe.type';

import '../../styles/RecipesCard.css';

function RecipesCard({ recipe, index, isRecommended = false }) {
  return (
    <Link
      to={ `/${recipe.type}/${recipe.id}` }
      data-testid={ `${index}-${isRecommended ? 'recommendation-card' : 'recipe-card'}` }
      className="recipe-card-item"
    >
      <div className="recipe-card-item-content">
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-card-img` }
          width={ 150 }
        />
        <p
          className="recipe-card-item-name"
          data-testid={
            `${index}-${isRecommended ? 'recommendation-title' : 'card-name'}`
          }
        >
          {recipe.name}

        </p>
      </div>
    </Link>
  );
}

RecipesCard.propTypes = {
  recipe: recipePropType.isRequired,
  index: propTypes.number.isRequired,
  isRecommended: propTypes.bool,
};

export { RecipesCard };
