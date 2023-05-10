import propTypes from 'prop-types';

import { recipePropType } from '../../types/recipe.type';

import { RecipesCard } from './RecipesCard';

function RecipesFeed({ recipes, isRecommended = false }) {
  return (
    <>
      <h1>RecipesFeed</h1>
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
    </>
  );
}

RecipesFeed.propTypes = {
  recipes: propTypes.arrayOf(recipePropType).isRequired,
  isRecommended: propTypes.bool,
};

export { RecipesFeed };
