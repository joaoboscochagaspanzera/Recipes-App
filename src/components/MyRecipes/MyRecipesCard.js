import propTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ButtonCopyClipboard } from '../Shared/ButtonCopyClipboard';
import { useRecipes } from '../../hooks/useRecipes';
import blackHeartIcon from '../../images/divers/blackHeartIcon.svg';

function MyRecipesCard({ recipe:
  { image, name, category, nationality, alcoholicOrNot, type, id }, index }) {
  const { removeRecipeFromFavorites } = useRecipes();
  return (
    <div className="recipe-card-favorite">
      <Link to={ `/${type}s/${id}` }>
        <img
          width={ 200 }
          height={ 200 }
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ image }
        />
      </Link>
      <div className="container-name-btns">
        <div>
          <Link to={ `/${type}s/${id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot || `${nationality} - ${category}` }
          </p>
        </div>
        <div>
          <ButtonCopyClipboard
            testId={ `${index}-horizontal-share-btn` }
            textToCopy={ `${window.location.origin}/${type}s/${id}` }
            text=""
          />
          <button
            className="favorite-btn"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            onClick={ () => removeRecipeFromFavorites({ recipeId: id }) }
          >
            <img
              src={ blackHeartIcon }
              alt="botão compartilhar receita"
            />
          </button>
        </div>
      </div>
    </div>
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
