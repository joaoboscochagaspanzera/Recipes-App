import propTypes from 'prop-types';
import { MyRecipesCardDone } from './MyRecipesCardDone';

function MyRecipesFeedDone({ recipes }) {
  return (
    <section className="section-favoriteRecipes">
      {
        recipes.map((recipe, index) => (
          <MyRecipesCardDone
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        ))
      }
    </section>
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
    tags: propTypes.arrayOf(propTypes.string),
  })).isRequired,
};

export { MyRecipesFeedDone };
