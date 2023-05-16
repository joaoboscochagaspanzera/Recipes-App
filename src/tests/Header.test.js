import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../components/Shared/Header';
import { renderWithRouter } from './helpers/renderWithRouter';

const search = 'search-top-btn';

describe('Testa o componente Header 1', () => {
  it('Verifica se o botão de perfil redireciona para a página de perfil', () => {
    renderWithRouter(<Header />);
    const profileButton = screen.getByRole('button', { name: /profile/i });
    userEvent.click(profileButton);
    expect(window.location.pathname).toBe('/profile');
  });
});

describe('Testa o componente Header 2', () => {
  it('Verifica se o botão de pesquisa aparece apenas nas páginas de Meals e Drinks', () => {
    renderWithRouter(<Header />, { location: '/meals' });
    expect(screen.getByTestId(search)).toBeInTheDocument();

    renderWithRouter(<Header />, { location: '/drinks' });
    expect(screen.getByTestId(search)).toBeInTheDocument();

    renderWithRouter(<Header />, { location: '/profile' });
    expect(screen.queryByTestId(search)).not.toBeInTheDocument();
  });
});

describe('Testa o componente Header 3', () => {
  it('Verifica se o título é exibido corretamente para cada rota', () => {
    const pageTitle = 'page-title';
    renderWithRouter(<Header />, { location: '/meals' });
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Meals');

    renderWithRouter(<Header />, { location: '/drinks' });
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Drinks');

    renderWithRouter(<Header />, { location: '/profile' });
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Profile');

    renderWithRouter(<Header />, { location: '/done-recipes' });
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Done Recipes');

    renderWithRouter(<Header />, { location: '/favorite-recipes' });
    expect(screen.getByTestId(pageTitle)).toHaveTextContent('Favorite Recipes');
  });
});

describe('Testa o componente Header 4', () => {
  it('Verifica se a caixa de pesquisa é exibida quando o botão de pesquisa é clicado', () => {
    renderWithRouter(<Header />, { location: '/meals' });
    const searchInput = 'search-input';
    const searchButton = screen.getByTestId(search);
    userEvent.click(searchButton);
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();

    userEvent.click(searchButton);
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
  });
});

describe('Testa o componente Header 5', () => {
  it('Verifica se a caixa de pesquisa é exibida quando o botão de pesquisa é clicado', () => {
    renderWithRouter(<Header />, { location: '/meals' });
    const searchInput = 'search-input';
    const searchButton = screen.getByTestId(search);
    userEvent.click(searchButton);
    expect(screen.getByTestId(searchInput)).toBeInTheDocument();

    userEvent.click(searchButton);
    expect(screen.queryByTestId(searchInput)).not.toBeInTheDocument();
  });
});

describe('Testa o componente Header 6', () => {
  it('Verifica se o botão de perfil está sendo renderizado com o ícone correto', () => {
    renderWithRouter(<Header />);
    const profileButton = screen.getByRole('button', { name: /profile/i });
    const profileIcon = profileButton.querySelector('img');
    expect(profileIcon).toHaveAttribute('src', 'profileIcon.svg');
  });
});
