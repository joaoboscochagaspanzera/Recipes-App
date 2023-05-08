import { Link } from 'react-router-dom/cjs/react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealsIcon from '../../images/mealIcon.svg';
import '../../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals">
        <img
          className="meal-icon"
          data-testid="meals-bottom-btn"
          src={ mealsIcon }
          alt="icone que direcioa para pagina de bebidas"
        />
      </Link>
      <Link to="/drinks">
        <img
          className="drink-icon"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="icone que direcioa para pagina de bebidas"
        />
      </Link>
    </footer>
  );
}

export { Footer };
