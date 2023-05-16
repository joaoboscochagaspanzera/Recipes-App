import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';

import { Header } from '../components/Shared/Header';
import { RecipesProvider } from '../hooks/useRecipes';

describe('Header.js', () => {
  it('should be redirect to "profile"', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
    );

    const iconProfileElement = screen.getByTestId('profile-top-btn');

    act(() => userEvent.click(iconProfileElement));

    expect(history.location.pathname).toBe('/profile');
  });

  it('should be render "Drinks"', () => {
    renderWithRouter(
      <RecipesProvider>
        <Header />
      </RecipesProvider>,
      { location: '/drinks' },
    );

    const drinksText = screen.getByText('Drinks');

    expect(drinksText).toBeInTheDocument();
  });
});
