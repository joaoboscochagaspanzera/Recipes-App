import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, { location = '/' } = {}) => {
  const history = createMemoryHistory({ initialEntries: [location] });
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
export { renderWithRouter };
