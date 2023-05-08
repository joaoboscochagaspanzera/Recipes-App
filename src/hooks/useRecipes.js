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
  const stringRecipeId = recipeType === 'meals' ? recipe.idMeal : recipe.idDrink;
  return ({
    id: Number(stringRecipeId),
    name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
    img_url: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
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

  const value = useMemo(() => ({
    recipes,
    setRecipes,
    recipeType,
    setRecipeType,
  }), [recipeType, recipes]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.element.isRequired,
};
