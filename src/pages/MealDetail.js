import propTypes from 'prop-types';
import { RecipeDetailHeader } from '../components/Recipes/RecipeDetailHeader';

function MealDetail({ match, inProgress = false }) {
  const { id } = match.params;
  console.log('in-progress: ', inProgress);
  return (
    <>
      <RecipeDetailHeader />
      <h1>
        MealDetail =
        {' '}
        {id}
      </h1>
    </>
  );
}

MealDetail.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  inProgress: propTypes.bool,
};

export { MealDetail };
