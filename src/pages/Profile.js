import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Header } from '../components/Shared/Header';
import { Footer } from '../components/Shared/Footer';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Profile() {
  const [storagedUser] = useLocalStorage('user');

  return (
    <>
      <Header />
      <h1>Profile</h1>
      <h3 data-testid="profile-email">{ storagedUser.email }</h3>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
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
