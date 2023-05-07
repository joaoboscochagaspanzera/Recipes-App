import propTypes from 'prop-types';

import { RecipesProvider } from '../hooks/useRecipes';
import { UserProvider } from '../hooks/useUser';

function AppProvider({ children }) {
  return (
    <UserProvider>
      <RecipesProvider>
        {children}
      </RecipesProvider>
    </UserProvider>
  );
}

AppProvider.propTypes = {
  children: propTypes.element.isRequired,
};

export { AppProvider };
