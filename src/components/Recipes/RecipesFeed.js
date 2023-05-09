import propTypes from 'prop-types';

import { recipePropType } from '../../types/recipe.type';

import { RecipesCard } from './RecipesCard';

function RecipesFeed({ recipes }) {
  console.log(recipes);
  return (
    <>
      <h1>RecipesFeed</h1>
      { recipes.map((recipe, index) => (
        <RecipesCard
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
        />
      )) }
    </>
  );
}

RecipesFeed.propTypes = {
  recipes: propTypes.arrayOf(recipePropType).isRequired,
};

export { RecipesFeed };
