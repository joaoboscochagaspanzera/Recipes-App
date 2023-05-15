import React from 'react';
import { act, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouter } from './helpers/renderWithRouter';
import { mapRecipe } from '../hooks/useRecipes';
import { fakeMeals } from './mocks/mockApi';

describe('Testes DoneRecipes.js page', () => {
  it('should be filter done recipes', async () => {
    const recipe = mapRecipe(fakeMeals[0], 'meals');

    localStorage.setItem('doneRecipes', JSON.stringify([{
      ...recipe,
      id: String(recipe.id),
      doneDate: new Date().toISOString(),
      type: 'meal',
    }]));

    renderWithRouter(
      <App />,
      { location: '/done-recipes' },
    );
    const buttonDrinksFilter = screen.getByTestId('filter-by-drink-btn');

    act(() => userEvent.click(buttonDrinksFilter));

    const buttonMealFilter = screen.getByTestId('filter-by-meal-btn');

    act(() => userEvent.click(buttonMealFilter));

    const imgFirstMealElement = screen.getByTestId('0-horizontal-image');

    expect(imgFirstMealElement).toBeInTheDocument();
  });
});
