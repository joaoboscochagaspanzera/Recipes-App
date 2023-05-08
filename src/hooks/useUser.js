import { createContext, useContext, useMemo } from 'react';
import propTypes from 'prop-types';

import { useLocalStorage } from './useLocalStorage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [storagedUser, setStoragedUser] = useLocalStorage('user', null);

  const value = useMemo(() => ({
    user: storagedUser,
    setStoragedUser,
  }), [setStoragedUser, storagedUser]);

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: propTypes.element.isRequired,
};
