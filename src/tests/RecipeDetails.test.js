import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import { fakeDrinks, fakeMeals } from './mocks/mockApi';

const fakeFetchRecipes = async () => ({
  json: async () => ({
    meals: fakeMeals,
    drinks: fakeDrinks,
  }),
  ok: true,
});

describe('Testes RecipeDetails.js page', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementation(fakeFetchRecipes);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be render component RecipeDetails in routes ["/meals/:id", "/drinks/id"]', async () => {
    renderWithRouter(<App />, { location: `/meals/${fakeMeals[0].idMeal}` });

    const h1RecipeTitlEl = await waitFor(() => screen.getByTestId('recipe-title'));

    expect(h1RecipeTitlEl).toBeInTheDocument();
  });
});
