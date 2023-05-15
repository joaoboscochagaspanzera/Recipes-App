import propTypes from 'prop-types';
import { MyRecipesCardDone } from './MyRecipesCardDone';

function MyRecipesFeedDone({ recipes }) {
  return (
    <>
      <h1>MyRecipesFeedDone</h1>
      {
        recipes.map((recipe, index) => (
          <MyRecipesCardDone
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            doneDate={ recipe.doneDate }
            tags={ recipe.tags }
          />
        ))
      }
    </>
  );
}

MyRecipesFeedDone.propTypes = {
  recipes: propTypes.arrayOf(propTypes.shape({
    image: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    nationality: propTypes.string.isRequired,
    alcoholicOrNot: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    doneDate: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  })).isRequired,
};

export { MyRecipesFeedDone };
