import propTypes from 'prop-types';
import drinkIcon from '../../images/drinkIcon.svg';

function MyRecipesFilterBar({ handleFilterRecipes }) {
  return (
    <nav className="my-recipes-filter-bar">
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterRecipes('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterRecipes('meal') }
      >
        Meals
      </button>
      <button
        className="drink-btn"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterRecipes('drink') }
      >
        <div>
          <img src={ drinkIcon } alt="icone drink" />
        </div>
        Drinks
      </button>
    </nav>
  );
}

MyRecipesFilterBar.propTypes = {
  handleFilterRecipes: propTypes.func.isRequired,
};

export { MyRecipesFilterBar };
