import propTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { ButtonCopyClipboard } from '../Shared/ButtonCopyClipboard';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function MyRecipesCard({ recipe:
  { image, name, category, nationality, alcoholicOrNot, type, id }, index }) {
  const [storedValue, setValue] = useLocalStorage('favoriteRecipes', []);

  const newStoredValue = [...storedValue];
  newStoredValue.filter((e) => e.id !== id);
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
        onClick={ () => setValue(newStoredValue.filter((e) => e.id !== id)) }
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
  recipe: propTypes.shape({
    image: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    nationality: propTypes.string.isRequired,
    alcoholicOrNot: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export { MyRecipesCard };
