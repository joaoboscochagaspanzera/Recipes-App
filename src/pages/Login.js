import { useCallback } from 'react';
import { useForm } from '../hooks/useForm';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Login() {
  const inputEmail = useForm();
  const inputPassword = useForm();

  const MIN_CHARACTERS = 6;
  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = REGEX_EMAIL.test(inputEmail.value)

  && (inputPassword.value).length > MIN_CHARACTERS;
  const [setStoragedUser] = useLocalStorage('user');

  const handleChange = useCallback(() => {
    setStoragedUser({
      email: inputEmail.value,
      password: inputPassword.value,
    });
  }, [inputEmail.value, inputPassword.value, setStoragedUser]);

  return (
    <>
      <h1>Login</h1>
      <label htmlFor="email">
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          onChange={ handleChange }
          { ...inputEmail }
        />
      </label>
      <label htmlFor="email">
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          onChange={ handleChange }
          { ...inputPassword }
        />
      </label>
      <label htmlFor="submit">
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ !isValid }
          onClick={ handleChange }
        >
          ENTER
        </button>
      </label>
    </>
  );
}

export { Login };
