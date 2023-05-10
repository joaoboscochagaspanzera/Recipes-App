import { useState, createContext, useContext, useMemo, useCallback } from 'react';
import propTypes from 'prop-types';

import { useLocalStorage } from './useLocalStorage';

export const MEAL_API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const DRINK_API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
const TOTAL_RECIPES = 12;

const recommendedRecipesTypeName = {
  drinks: 'meals',
  meals: 'drinks',
};

export const RecipesContext = createContext();

export const useRecipes = () => useContext(RecipesContext);

export const getRecommendedRecipesType = (
  { recipeType },
) => recommendedRecipesTypeName[recipeType];

export const getBaseUrl = (recipeType) => `${
  recipeType === 'drinks'
    ? DRINK_API_BASE_URL
    : MEAL_API_BASE_URL
}`;

export const mapRecipe = (recipe, recipeType) => {
  const MAX_INGREDIENTS = 20;
  const stringRecipeId = recipeType === 'meals' ? recipe.idMeal : recipe.idDrink;

  const ingredients = Array.from({ length: MAX_INGREDIENTS }, (_, i) => i + 1).map(
    (number, index) => ({
      id: index + 1,
      name: recipe[`strIngredient${number}`],
      meansure: recipe[`strMeasure${number}`],
    }),
  ).filter(({ name }) => !!name);

  return ({
    id: Number(stringRecipeId),
    name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
    image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
    category: recipe.strCategory,
    ingredients,
    instruction: recipe.strInstructions,
    video_url: recipe.strYoutube ? recipe.strYoutube.replace('watch?v=', 'embed/') : null,
    type: recipeType,
    nationality: recipe.strArea || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  });
};

const mapRecipeCategory = (category) => (category.strCategory);

export const getRecipes = async ({
  fetcher,
  url,
  recipeType,
  totalRecipes = TOTAL_RECIPES,
}) => {
  const data = await fetcher(url);

  let recipes = data[recipeType].slice(0, totalRecipes);

  recipes = recipes.map((recipe) => mapRecipe(recipe, recipeType));

  return recipes;
};

export const getRecipeDetail = async ({ fetcher, id, recipeType }) => {
  const url = `${getBaseUrl(recipeType)}/lookup.php?i=${id}`;

  const data = await fetcher(url);

  const recipe = data[recipeType] ? data[recipeType][0] : null;

  return mapRecipe(recipe, recipeType);
};

export const getRecipeCategories = async ({ fetcher, url, recipeType }) => {
  const totalCategories = 5;
  const data = await fetcher(url);

  let categories = data[recipeType].slice(0, totalCategories);

  categories = categories.map(mapRecipeCategory);

  return categories;
};

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState({
    drinks: [],
    meals: [],
  });

  const [recipeType, setRecipeType] = useState('');
  const [categoryFilterSelected, setCategoryFilterSelected] = useState('All');

  const [
    storagedFavoritedRecipes,
    setStoragedFavoritedRecipes,
  ] = useLocalStorage('favoriteRecipes', []);
  const [
    storagedDoneRecipes,
    setStoragedDoneRecipes,
  ] = useLocalStorage('doneRecipes', []);
  const [
    storagedRecipesInProgress,
    setStoragedRecipesInProgress,
  ] = useLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });

  const addRecipeToFavorites = useCallback(({ recipe }) => {
    const recipeToStorage = {
      id: String(recipe.id),
      type: recipe.type.substr(0, recipe.type.length - 1),
      nationality: recipe.nationality,
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
    };
    setStoragedFavoritedRecipes([...storagedFavoritedRecipes, recipeToStorage]);
  }, [setStoragedFavoritedRecipes, storagedFavoritedRecipes]);

  const removeRecipeFromFavorites = useCallback(({ recipeId }) => {
    const updatedFavoritedRecipes = [...storagedFavoritedRecipes];

    const favoriteRecipeIndex = updatedFavoritedRecipes.findIndex(
      ((favoritedRecipe) => favoritedRecipe.id === recipeId),
    );

    updatedFavoritedRecipes.splice(favoriteRecipeIndex, 1);

    setStoragedFavoritedRecipes(updatedFavoritedRecipes);
  }, [setStoragedFavoritedRecipes, storagedFavoritedRecipes]);

  const toggleFavoriteRecipe = useCallback(({ recipe }) => {
    const recipeIsFavorite = !!storagedFavoritedRecipes.find(
      (favoritedRecipe) => favoritedRecipe.id === String(recipe.id),
    );
    if (recipeIsFavorite) {
      removeRecipeFromFavorites({ recipeId: recipe.id });
    } else {
      addRecipeToFavorites({ recipe });
    }
  }, [addRecipeToFavorites, removeRecipeFromFavorites, storagedFavoritedRecipes]);

  const startOrEditRecipe = useCallback(({ recipe, ingredients = [] }) => {
    setStoragedRecipesInProgress({
      ...storagedRecipesInProgress,
      [recipe.type]: {
        ...storagedRecipesInProgress[recipe.type],
        [recipe.id]: ingredients,
      },
    });
  }, [setStoragedRecipesInProgress, storagedRecipesInProgress]);

  const finishRecipe = useCallback(({ recipe }) => {
    const recipeToStorage = {
      id: String(recipe.id),
      type: recipe.type.substr(0, recipe.type.length - 1),
      nationality: recipe.nationality,
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
      tags: recipe.tags,
      doneDate: new Date(),
    };
    setStoragedDoneRecipes([...storagedDoneRecipes, recipeToStorage]);
  }, [setStoragedDoneRecipes, storagedDoneRecipes]);

  const value = useMemo(() => ({
    recipes,
    setRecipes,
    recipeType,
    setRecipeType,
    categoryFilterSelected,
    setCategoryFilterSelected,
    favoriteRecipes: storagedFavoritedRecipes,
    addRecipeToFavorites,
    removeRecipeFromFavorites,
    toggleFavoriteRecipe,
    doneRecipes: storagedDoneRecipes,
    setDoneRecipes: setStoragedDoneRecipes,
    recipesInProgress: storagedRecipesInProgress,
    setRecipesInProgress: setStoragedRecipesInProgress,
    startOrEditRecipe,
    finishRecipe,
  }), [
    addRecipeToFavorites,
    categoryFilterSelected,
    recipeType,
    recipes,
    removeRecipeFromFavorites,
    setStoragedDoneRecipes,
    setStoragedRecipesInProgress,
    storagedDoneRecipes,
    storagedFavoritedRecipes,
    storagedRecipesInProgress,
    startOrEditRecipe,
    toggleFavoriteRecipe,
    finishRecipe,
  ]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.element.isRequired,
};
