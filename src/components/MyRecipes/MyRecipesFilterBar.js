import propTypes from 'prop-types';

function MyRecipesFilterBar({ handleFilterRecipes }) {
  return (
    <nav className="my-recipes-filter-bar">
      <button
        className="meals-drinks-btn"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterRecipes('all') }
      >
        <div>
          <img src="./icons/divers/meals-and-drinks.svg" alt="icone comidas e bebidas" />
          All
        </div>
      </button>
      <button
        className="meals-btn"
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterRecipes('meal') }
      >
        <div>
          <img src="./icons/meals/All.svg" alt="icone comidas" />
          Meals
        </div>
      </button>
      <button
        className="drink-btn"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterRecipes('drink') }
      >
        <div>
          <img src="./icons/drinks/All.svg" alt="icone drink" />
          Drinks
        </div>
      </button>
    </nav>
  );
}

MyRecipesFilterBar.propTypes = {
  handleFilterRecipes: propTypes.func.isRequired,
};

export { MyRecipesFilterBar };
