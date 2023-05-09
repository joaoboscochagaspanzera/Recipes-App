import { useState, createContext, useContext, useMemo } from 'react';
import propTypes from 'prop-types';

export const MEAL_API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const DRINK_API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const RecipesContext = createContext();

export const useRecipes = () => useContext(RecipesContext);

export const getBaseUrl = (recipeType) => `${
  recipeType === 'drinks'
    ? DRINK_API_BASE_URL
    : MEAL_API_BASE_URL
}`;

const mapRecipe = (recipe, recipeType) => {
  const MAX_INGREDIENTS = 20;
  const stringRecipeId = recipeType === 'meals' ? recipe.idMeal : recipe.idDrink;

  const ingredients = Array.from({ length: MAX_INGREDIENTS }, (_, i) => i + 1).map(
    (index) => ({
      ingredientName: recipe[`strIngredient${index}`],
      ingredientMensure: recipe[`strMeasure${index}`],
    }),
  ).filter(({ ingredientName }) => !!ingredientName);

  return ({
    id: Number(stringRecipeId),
    name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
    img_url: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
    category: recipeType === 'meals' ? recipe.strCategory : recipe.strAlcoholic,
    ingredients,
    instruction: recipe.strInstructions,
    video_url: recipe.strYoutube ? recipe.strYoutube.replace('watch?v=', 'embed/') : null,
  });
};

const mapRecipeCategory = (category) => (category.strCategory);

export const getRecipes = async ({ fetcher, url, recipeType }) => {
  const totalRecipes = 12;
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

  const value = useMemo(() => ({
    recipes,
    setRecipes,
    recipeType,
    setRecipeType,
    categoryFilterSelected,
    setCategoryFilterSelected,
  }), [categoryFilterSelected, recipeType, recipes]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.element.isRequired,
};
