import propTypes from 'prop-types';

function RecipesFilterItem({ category }) {
  return (
    <button data-testid={ `${category}-category-filter` }>{category}</button>
  );
}

RecipesFilterItem.propTypes = {
  category: propTypes.string.isRequired,
};

export { RecipesFilterItem };
