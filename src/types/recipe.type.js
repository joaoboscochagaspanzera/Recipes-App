import propTypes from 'prop-types';

export const recipePropType = propTypes.shape({
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  img_url: propTypes.string.isRequired,
});
