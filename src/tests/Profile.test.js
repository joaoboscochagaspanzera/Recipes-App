import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa a pagina de Perfil.', () => {
  it('Verifica se ao clicar no botão "Logout" o LocalStorage é limpo.', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com.br' }));
    renderWithRouter(<App />, { location: '/profile' });

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
    expect(localStorage.length).toBe(0);
  });
});
