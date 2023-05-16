import propTypes from 'prop-types';

import { recipePropType } from '../../types/recipe.type';

import { RecipesCard } from './RecipesCard';

import '../../styles/RecipesFeed.css';

function RecipesFeed({ recipes, isRecommended = false }) {
  return (
    <div className="recipes-feed">
      { isRecommended
        ? (
          recipes.map(({ element, index }) => (
            <RecipesCard
              key={ element.id }
              recipe={ element }
              index={ index }
              isRecommended={ isRecommended }
            />
          ))
        )
        : (
          recipes.map((recipe, index) => (
            <RecipesCard
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
              isRecommended={ isRecommended }
            />
          ))
        ) }
    </div>
  );
}

RecipesFeed.propTypes = {
  recipes: propTypes.arrayOf(recipePropType).isRequired,
  isRecommended: propTypes.bool,
};

export { RecipesFeed };
