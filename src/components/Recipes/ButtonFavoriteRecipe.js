import { useCallback } from 'react';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

import { useRecipes } from '../../hooks/useRecipes';

import { recipePropType } from '../../types/recipe.type';

function ButtonFavoriteRecipe({ recipe }) {
  const {
    favoriteRecipes,
    toggleFavoriteRecipe,
  } = useRecipes();

  const recipeIsFavorite = favoriteRecipes.find(
    (favoritedRecipe) => favoritedRecipe.id === String(recipe.id),
  );

  const handleClickFavoriteButton = useCallback(() => {
    toggleFavoriteRecipe({ recipe });
  }, [recipe, toggleFavoriteRecipe]);

  return (
    <button
      onClick={ handleClickFavoriteButton }
      data-testid="favorite-btn"
      src={ recipeIsFavorite ? blackHeartIcon : whiteHeartIcon }
    >
      <img
        src={ recipeIsFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="heart"
      />
      Favoritar
    </button>
  );
}

ButtonFavoriteRecipe.propTypes = {
  recipe: recipePropType.isRequired,
};

export { ButtonFavoriteRecipe };
