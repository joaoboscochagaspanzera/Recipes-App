import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function MyRecipesCard({ recipe:
  { image, name, category, nationality, alcoholicOrNot }, index }) {
  return (
    <>
      <h1>MyRecipesCard</h1>
      <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ name } />
      <p data-testid={ `${index}-horizontal-top-text` }>
        { alcoholicOrNot || `${nationality} - ${category}` }
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <button data-testid={ `${index}-horizontal-share-btn` } src={ shareIcon }>
        <img
          src={ shareIcon }
          alt="botão compartilhar receita"
        />
      </button>
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ blackHeartIcon }
        onClick={ () => localStorage.romoveItem() }
      >
        <img
          src={ blackHeartIcon }
          alt="botão compartilhar receita"
        />
      </button>
    </>
  );
}

MyRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export { MyRecipesCard };
