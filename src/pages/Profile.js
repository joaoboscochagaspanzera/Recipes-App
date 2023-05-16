import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Header } from '../components/Shared/Header';
import { Footer } from '../components/Shared/Footer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Profile.css';

function Profile() {
  const [storagedUser] = useLocalStorage('user', { email: '' });
  return (
    <>
      <Header />
      <img
        className="profile-icon2"
        src={ profileIcon }
        alt="Profile"
        data-testid="profile-top-btn"
      />
      <h1 className="profile-name">Profile</h1>
      <h3
        className="profile-email"
        data-testid="profile-email"
      >
        { storagedUser.email }

      </h3>
      <Link to="/done-recipes">
        <button
          className="done-recipes"
          data-testid="profile-done-btn"
        >
          Done Recipes

        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          className="favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes

        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          className="logout"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </>
  );
}

export { Profile };
