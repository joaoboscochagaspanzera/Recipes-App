import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCallback } from 'react';
import { useForm } from '../hooks/useForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
// import './Styles/Login.css';

function Login() {
  const inputEmail = useForm();
  const inputPassword = useForm();
  const [, setStoragedUser] = useLocalStorage('user');

  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_CHARACTERS = 6;
  const isValid = REGEX_EMAIL.test(inputEmail.value)
  && inputPassword.value.length > MIN_CHARACTERS;

  const handleChange = useCallback(() => {
    setStoragedUser({
      email: inputEmail.value,
    });
  }, [inputEmail.value, setStoragedUser]);

  return (
    <div className="login">
      <h1 className="login-h1">
        LOGIN
      </h1>
      <form>
        <input
          className="email"
          data-testid="email-input"
          type="email"
          placeholder="Email"
          onChange={ handleChange }
          { ...inputEmail }
        />
        <input
          className="password"
          data-testid="password-input"
          type="password"
          placeholder="Password"
          { ...inputPassword }
        />
        <Link to="/meals">
          <button
            className="bttn"
            data-testid="login-submit-btn"
            type="submit"
            disabled={ !isValid }
            onClick={ handleChange }
          >
            ENTER
          </button>
        </Link>
      </form>
    </div>
  );
}

export { Login };
