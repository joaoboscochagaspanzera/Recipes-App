import propTypes from 'prop-types';

export const recipeIngredientPropType = propTypes.shape({
  id: propTypes.number,
  name: propTypes.string,
  meansura: propTypes.string,
});

export const recipePropType = propTypes.shape({
  id: propTypes.number,
  name: propTypes.string,
  image: propTypes.string,
  category: propTypes.string,
  ingredients: propTypes.arrayOf(recipeIngredientPropType),
  instruction: propTypes.string,
  video_url: propTypes.string,
  type: propTypes.string,
  nationality: propTypes.string,
  alcoholicOrNot: propTypes.string,
  tags: propTypes.arrayOf(propTypes.string),
});
