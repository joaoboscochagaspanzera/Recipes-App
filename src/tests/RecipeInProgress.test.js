import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';

import copyToClipboard from 'clipboard-copy';

import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouter } from './helpers/renderWithRouter';

import { fakeDrinks, fakeMeals } from './mocks/mockApi';
import { mapRecipe } from '../hooks/useRecipes';

const RECIPE_TITLE = 'recipe-title';

const fakeFetchRecipes = async () => ({
  json: async () => ({
    meals: fakeMeals,
    drinks: fakeDrinks,
  }),
  ok: true,
});

const fakeFetchRecipeDetail = async () => ({
  json: async () => ({ drinks: [fakeDrinks[3]] }),
  ok: true,
});

jest.mock('clipboard-copy');

describe('Testes RecipeDetails.js page', () => {
  beforeEach(() => {
    copyToClipboard.mockImplementation(() => console.log('copied'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should not render start recipe button if recipe was finished', async () => {
    global.fetch = jest.fn()
      .mockImplementation(fakeFetchRecipes);

    const recipe = mapRecipe(fakeMeals[0], 'meals');

    localStorage.setItem('doneRecipes', JSON.stringify([{ ...recipe, id: String(recipe.id) }]));

    renderWithRouter(<App />, { location: `/meals/${recipe.id}/in-progress` });

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    const buttonStartRecipe = screen.queryByTestId('start-recipe-btn');

    expect(buttonStartRecipe).not.toBeInTheDocument();
  });

  it('should be redirect to "/done-recipes" when finish recipe', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(fakeFetchRecipeDetail)
      .mockImplementationOnce(fakeFetchRecipes);

    const recipe = mapRecipe(fakeDrinks[3], 'drinks');

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        [recipe.id]: [],
      },
      meals: {},
    }));

    const { history } = renderWithRouter(
      <App />,
      { location: `/drinks/${recipe.id}/in-progress` },
    );

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    recipe.ingredients.forEach((ingredient, index) => {
      const label = screen.getByTestId(`${index}-ingredient-step`);
      act(() => userEvent.click(label));
    });

    const buttonFinishRecipe = screen.getByTestId('finish-recipe-btn');

    act(() => userEvent.click(buttonFinishRecipe));

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
