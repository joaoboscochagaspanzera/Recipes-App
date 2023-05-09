import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { ButtonCopyClipboard } from '../Shared/ButtonCopyClipboard';
import { recipePropType } from '../../types/recipe.type';

function MyRecipesCard({ recipe:
  { image, name, category, nationality, alcoholicOrNot, type, id }, index }) {
  return (
    <>
      <h1>MyRecipesCard</h1>
      <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ name } />
      <p data-testid={ `${index}-horizontal-top-text` }>
        { alcoholicOrNot || `${nationality} - ${category}` }
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <ButtonCopyClipboard
        testId={ `${index}-horizontal-share-btn` }
        textToCopy={ `${window.location.origin}/${type}s/${id}` }
        text="compartilhar"
      />
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
  recipe: recipePropType.isRequired,
  index: PropTypes.number.isRequired,
};

export { MyRecipesCard };
