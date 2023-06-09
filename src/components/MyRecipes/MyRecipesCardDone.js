import propTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ButtonCopyClipboard } from '../Shared/ButtonCopyClipboard';

function MyRecipesCardDone({ recipe:
  {
    image,
    name,
    category,
    nationality,
    alcoholicOrNot,
    type,
    id,
    tags,
    doneDate,
  }, index }) {
  return (
    <div className="recipe-card-favorite">
      <Link to={ `/${type}s/${id}` }>
        <img
          width={ 200 }
          height={ 200 }
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
      </Link>
      <div className="container-name-btns">
        <Link to={ `/${type}s/${id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot || `${nationality} - ${category}` }
        </p>
        <ButtonCopyClipboard
          testId={ `${index}-horizontal-share-btn` }
          textToCopy={ `${window.location.origin}/${type}s/${id}` }
          text=""
        />
        <p
          className="done-date"
          data-testid={ `${index}-horizontal-done-date` }
        >
          { doneDate }
        </p>
        { tags.map((tag, i) => (
          <span
            key={ i }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </span>
        ))}
      </div>
    </div>
  );
}

MyRecipesCardDone.propTypes = {
  recipe: propTypes.shape({
    image: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    nationality: propTypes.string.isRequired,
    alcoholicOrNot: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    doneDate: propTypes.string.isRequired,
    tags: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  index: propTypes.number.isRequired,
};

export { MyRecipesCardDone };
