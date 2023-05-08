import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import { fakeMeals, fakeMealsCategories } from './mocks/mockApi';

const fakeFetchRecipes = async () => ({
  json: async () => ({
    meals: fakeMeals,
  }),
  ok: true,
});

const fakeFetchCategories = async () => ({
  json: async () => ({
    meals: fakeMealsCategories,
  }),
  ok: true,
});

describe('Testes Recipes.js page', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockImplementationOnce(fakeFetchRecipes)
      .mockImplementationOnce(fakeFetchCategories);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be render component Recipes in routes ["/meals", "/drinks"]', async () => {
    renderWithRouter(<App />, { location: '/meals' });

    const divFirsRecipeEl = await waitFor(() => screen.getByTestId('0-recipe-card'));

    expect(divFirsRecipeEl).toBeInTheDocument();
  });
});
