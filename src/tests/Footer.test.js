import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa pagina de menu inferior.', () => {
  it('Verifica existencia dos icones de redirecionamento', () => {
    renderWithRouter(<App />, { location: '/meals' });

    const drinkIcon = screen.getByTestId('meals-bottom-btn');
    expect(drinkIcon).toBeInTheDocument();

    const mealIcon = screen.getByTestId('drinks-bottom-btn');
    expect(mealIcon).toBeInTheDocument();
  });
});
