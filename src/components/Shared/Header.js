import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/Header.css';

function Header() {
  const location = useLocation();
  const showSearchIcon = ['/meals', '/drinks'].includes(location.pathname);

  const { showSearchBar, setShowSearchBar } = useRecipes();

  function getPageTitle() {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  }

  const handleToggleSearchBar = useCallback(() => {
    setShowSearchBar(!showSearchBar);
  }, [setShowSearchBar, showSearchBar]);

  return (
    <>
      <header data-testid="header">
        <Link
          to="/profile"
        >
          <img
            className="profile-icon"
            src={ profileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
        {showSearchIcon && (
          <button onClick={ handleToggleSearchBar }>
            <img
              className="search-icon"
              src={ searchIcon }
              alt="Search"
              data-testid="search-top-btn"
            />
          </button>
        )}
        <h1 className="page-title-header">Recipes app</h1>
      </header>
      <h1 className="page-title" data-testid="page-title">{getPageTitle()}</h1>
    </>
  );
}

export { Header };
