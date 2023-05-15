import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';
import { fakeMeals, fakeMealsCategories } from './mocks/mockApi';

import App from '../App';

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

  it('should be toggle search bar', async () => {
    renderWithRouter(<App />, { location: '/meals' });

    const iconSearchElement = screen.getByTestId('search-top-btn');

    act(() => userEvent.click(iconSearchElement));

    const inputSearchElement = screen.getByTestId('search-input');

    expect(inputSearchElement).toBeInTheDocument();
  });
});
