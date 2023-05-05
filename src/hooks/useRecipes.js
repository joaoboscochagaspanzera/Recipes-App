import { useState, createContext, useContext, useMemo } from 'react';
import propTypes from 'prop-types';

export const MEAL_API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const DRINK_API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const RecipesContext = createContext();

export const useRecipes = () => useContext(RecipesContext);

export const getRecipes = async ({ fetcher, url, recipeType }) => {
  const totalRecipes = 12;
  const data = await fetcher(url);
  return data[recipeType].slice(0, totalRecipes);
};

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState({
    drinks: [],
    meals: [],
  });

  const value = useMemo(() => ({
    recipes,
    setRecipes,
  }), [recipes]);
  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: propTypes.element.isRequired,
};
