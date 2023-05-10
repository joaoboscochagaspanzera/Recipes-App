import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import copyToClipboard from 'clipboard-copy';

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
  json: async () => ({ drinks: [fakeDrinks[0]], meals: [fakeMeals[0]] }),
  ok: true,
});

jest.mock('clipboard-copy');

describe('Testes RecipeDetails.js page', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementation(fakeFetchRecipes)
      .mockImplementationOnce(fakeFetchRecipeDetail)
      .mockImplementationOnce(fakeFetchRecipes);

    copyToClipboard.mockImplementation(() => console.log('copied'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('should be render component RecipeDetails in routes ["/meals/:id", "/drinks/id"]', async () => {
    renderWithRouter(<App />, { location: `/meals/${fakeMeals[0].idMeal}` });

    const h1RecipeTitlEl = await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    expect(h1RecipeTitlEl).toBeInTheDocument();
  });

  it('should be able to copy link when clip in share button', async () => {
    renderWithRouter(<App />, { location: `/meals/${fakeMeals[0].idMeal}` });

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    const shareButton = screen.getByTestId('share-btn');

    act(() => userEvent.click(shareButton));

    const pLinkCopiedMessageEl = screen.getByText('Link copied!');

    expect(pLinkCopiedMessageEl).toBeInTheDocument();
  });

  it('should be able to toggle favorite recipe', async () => {
    renderWithRouter(<App />, { location: `/meals/${fakeMeals[0].idMeal}` });

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    const buttonFavoriteEl = screen.getByTestId('favorite-btn');

    act(() => userEvent.click(buttonFavoriteEl));

    act(() => userEvent.click(buttonFavoriteEl));

    const storagedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    expect(storagedFavoriteRecipes).toHaveLength(0);
  });

  it('should be render "Continue Recipe"', async () => {
    const fakeRecipe = mapRecipe(fakeDrinks[0], 'drinks');
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        [fakeRecipe.id]: [],
      },
      meals: {},
    }));

    renderWithRouter(
      <App />,
      { location: `/drinks/${fakeRecipe.id}` },
    );

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    const buttonStartRecipe = screen.getByText('Continue Recipe');

    expect(buttonStartRecipe).toBeInTheDocument();
  });

  it('should be render "Start Recipe"', async () => {
    const fakeRecipe = mapRecipe(fakeDrinks[0], 'drinks');

    renderWithRouter(
      <App />,
      { location: `/drinks/${fakeRecipe.id}` },
    );

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    const buttonStartRecipe = screen.getByText('Start Recipe');

    expect(buttonStartRecipe).toBeInTheDocument();
  });

  it('should be able to start a recipe', async () => {
    const fakeRecipe = mapRecipe(fakeDrinks[0], 'drinks');

    // localStorage.setItem('inProgressRecipes', JSON.stringify({
    //   drinks: {
    //     [fakeRecipe.id]: [],
    //   },
    //   meals: {},
    // }));

    const { history } = renderWithRouter(
      <App />,
      { location: `/drinks/${fakeRecipe.id}` },
    );

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    const buttonStartRecipe = screen.getByText('Start Recipe');

    act(() => userEvent.click(buttonStartRecipe));

    expect(history.location.pathname).toBe(`/drinks/${fakeRecipe.id}/in-progress`);
  });

  it('should not render start recipe button if recipe was finished', async () => {
    const recipe = mapRecipe(fakeMeals[0], 'meals');

    localStorage.setItem('doneRecipes', JSON.stringify([{ ...recipe, id: String(recipe.id) }]));

    renderWithRouter(<App />, { location: `/meals/${recipe.id}/` });

    await waitFor(() => screen.getByTestId(RECIPE_TITLE));

    const buttonStartRecipe = screen.queryByTestId('start-recipe-btn');

    expect(buttonStartRecipe).not.toBeInTheDocument();
  });
});
