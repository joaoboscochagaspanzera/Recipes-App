import propTypes from 'prop-types';

function MyRecipesFilterBar({ handleFilterRecipes }) {
  return (
    <>
      <h1>MyRecipesFilterBar</h1>
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
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterRecipes('drink') }
      >
        Drinks
      </button>
    </>
  );
}

MyRecipesFilterBar.propTypes = {
  handleFilterRecipes: propTypes.func.isRequired,
};

export { MyRecipesFilterBar };
