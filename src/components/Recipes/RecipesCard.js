import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';

import { recipePropType } from '../../types/recipe.type';

function RecipesCard({ recipe, index }) {
  const { recipeType } = useRecipes();
  return (
    <Link
      to={ `/${recipeType}/${recipe.id}` }
      data-testid={ `${index}-recipe-card` }
    >
      <p data-testid={ `${index}-card-name` }>{recipe.name}</p>
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
};

export { RecipesCard };
