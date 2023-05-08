import { useCallback } from 'react';
import { useForm } from '../hooks/useForm';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Login() {
  const MIN_CHARACTERS = 6;
  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const inputEmail = useForm();
  const inputPassword = useForm();
  const [storagedUser, setStoragedUser] = useLocalStorage('user');

  const handleLogin = useCallback(() => {
    setStoragedUser({
      email: inputEmail.value,
      password: inputPassword.value,
    });
  }, [inputEmail.value, inputPassword.value, setStoragedUser]);

  const isValid = REGEX_EMAIL.test(inputEmail.value)
  && (inputPassword.value).length > MIN_CHARACTERS;
  return (
    <>
      <h1>Login</h1>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="email"
          onChange={ handleLogin }
          { ...inputEmail }
        />
      </label>
      <label htmlFor="email">
        Password
        <input
          data-testid="password-input"
          type="password"
          onChange={ handleLogin }
          { ...inputPassword }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        disabled={ !isValid }
        onClick={ handleLogin }
      >
        ENTER
      </button>
    </>
  );
}

export { Login };
