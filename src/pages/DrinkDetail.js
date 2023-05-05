import propTypes from 'prop-types';
import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';
import { RecipeDetailIngredients } from '../components/Recipes/RecipeDetailIngredients';

function DrinkDetail({ match, inProgress = false }) {
  const { id } = match.params;
  console.log('in-progress: ', inProgress);
  return (
    <>
      <RecipeDetailHeader />
      <h1>
        DrinkDetail =
        {' '}
        {id}
      </h1>
      <RecipeDetailIngredients />
    </>
  );
}

DrinkDetail.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  inProgress: propTypes.bool,
};

export { DrinkDetail };
