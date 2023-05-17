import propTypes from 'prop-types';
import { MyRecipesCard } from './MyRecipesCard';

function MyRecipesFeed({ recipes }) {
  return (
    <section className="section-favoriteRecipes">
      {
        recipes.map((recipe, index) => (
          <MyRecipesCard key={ recipe.id } recipe={ recipe } index={ index } />
        ))
      }
    </section>
  );
}

MyRecipesFeed.propTypes = {
  recipes: propTypes.arrayOf(propTypes.shape({
    image: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    nationality: propTypes.string.isRequired,
    alcoholicOrNot: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
  })).isRequired,
};

export { MyRecipesFeed };
