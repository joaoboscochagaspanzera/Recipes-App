import propTypes from 'prop-types';

export const recipeIngredientPropType = propTypes.shape({
  ingredientName: propTypes.string.isRequired,
  ingredientMensure: propTypes.string.isRequired,
});

export const recipePropType = propTypes.shape({
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  img_url: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  ingredients: propTypes.arrayOf(recipeIngredientPropType).isRequired,
  instruction: propTypes.string.isRequired,
  video_url: propTypes.string,
});
