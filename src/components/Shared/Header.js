import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  const location = useLocation();
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
  return (
    <header>
      <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      {showSearchIcon && (
        <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
      )}
      <h1 data-testid="page-title">{getPageTitle()}</h1>
    </header>
  );
}

export { Header };
