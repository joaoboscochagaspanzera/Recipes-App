import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const showSearchIcon = ['/meals', '/drinks'].includes(location.pathname);

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

  function handleProfileButtonClick() {
    history.push('/profile');
  }

  return (
    <header>
      <button onClick={ handleProfileButtonClick }>
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </button>
      {showSearchIcon && (
        <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
      )}
      <h1 data-testid="page-title">{getPageTitle()}</h1>
    </header>
  );
}

export { Header };
