import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const email = 'email@real.com';
const password = 'realsenha';

test('Farewell, front-end', () => {
  const { history } = renderWithRouter(<App />, { location: '/' });
  const loginText = screen.getByText(/login/i);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByTestId('password-input');
  const enterBtn = screen.getByRole('button', { name: /enter/i });
  expect(loginText).toBeInTheDocument();
  expect(enterBtn).toBeDefined();
  expect(enterBtn).toBeDisabled();

  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  expect(enterBtn).not.toBeDisabled();

  userEvent.click(enterBtn);
  expect(history.location.pathname).toEqual('/meals');
});
