import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

const fakeFavoriteRecipesStoraged = [
  {
    id: '14229',
    type: 'drink',
    nationality: '',
    category: 'Shot',
    alcoholicOrNot: 'Alcoholic',
    name: '747',
    image: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg',
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Ordinary Drink',
    alcoholicOrNot: 'Optional alcohol',
    name: 'GG',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  },
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];

describe('Testa pagina de Receitas Favoritas.', () => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(fakeFavoriteRecipesStoraged));

  it('Testa a função de filtrar a lista de favoritos nos botões "All", "Meals" e "Drinks".', () => {
    renderWithRouter(<App />, { location: '/favorite-recipes' });

    const fristRecipe = screen.getByText(/747/i);
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    userEvent.click(mealsBtn);
    expect(fristRecipe).not.toBeInTheDocument();
  });
});
