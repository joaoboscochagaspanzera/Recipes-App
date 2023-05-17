import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import mockFetch from '../../cypress/mocks/fetch';

import App from '../App';

import { renderWithRouter } from './helpers/renderWithRouter';
import { fakeDrinks } from './mocks/mockApi';

const SEARCH_TOP_BUTTON = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const NAME_SEARCH_RADIO = 'name-search-radio';

describe('SearchBar.js', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });
  it('should be able to search meals by name', async () => {
    renderWithRouter(<App />, { location: '/meals' });

    const iconSearch = screen.getByTestId(SEARCH_TOP_BUTTON);
    act(() => userEvent.click(iconSearch));

    const inputFilterName = screen.getByTestId(NAME_SEARCH_RADIO);
    act(() => userEvent.click(inputFilterName));

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => userEvent.type(inputSearch, 'soup'));

    const buttonSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    act(() => userEvent.click(buttonSearch));

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  it('should be able to search drinks by ingredient', async () => {
    renderWithRouter(<App />, { location: '/drinks' });

    const iconSearch = screen.getByTestId(SEARCH_TOP_BUTTON);
    act(() => userEvent.click(iconSearch));

    const inputFilterIngredient = screen.getByTestId('ingredient-search-radio');
    act(() => userEvent.click(inputFilterIngredient));

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => userEvent.type(inputSearch, 'Light rum'));

    const buttonSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    act(() => userEvent.click(buttonSearch));

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });

  it('should be able to search drinks by first letter', async () => {
    renderWithRouter(<App />, { location: '/drinks' });

    const iconSearch = screen.getByTestId(SEARCH_TOP_BUTTON);
    act(() => userEvent.click(iconSearch));

    const inputFilterFirstLetter = screen.getByTestId('first-letter-search-radio');
    act(() => userEvent.click(inputFilterFirstLetter));

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => userEvent.type(inputSearch, 's'));

    jest.spyOn(global, 'fetch').mockImplementationOnce(async () => ({
      json: async () => ({ drinks: fakeDrinks }),
      ok: true,
    }));

    const buttonSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    act(() => userEvent.click(buttonSearch));

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=s');
  });

  it('should be able to redirect to recipe detail if find just one meal', async () => {
    const { history } = renderWithRouter(<App />, { location: '/meals' });

    const iconSearch = screen.getByTestId(SEARCH_TOP_BUTTON);
    act(() => userEvent.click(iconSearch));

    const inputFilterName = screen.getByTestId(NAME_SEARCH_RADIO);
    act(() => userEvent.click(inputFilterName));

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => userEvent.type(inputSearch, 'Arrabiata'));

    const buttonSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    act(() => userEvent.click(buttonSearch));

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });

  it('should be able to show alert on filter by first letter with more than one character', async () => {
    jest.spyOn(global, 'alert');

    renderWithRouter(<App />, { location: '/meals' });

    const iconSearch = screen.getByTestId(SEARCH_TOP_BUTTON);
    act(() => userEvent.click(iconSearch));

    const inputFilterFirstLetter = screen.getByTestId('first-letter-search-radio');
    act(() => userEvent.click(inputFilterFirstLetter));

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => userEvent.type(inputSearch, 'aaa'));

    const buttonSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    act(() => userEvent.click(buttonSearch));

    expect(global.alert).toHaveBeenCalled();
  });

  it('should be able to show alert if don\'t find', async () => {
    jest.spyOn(global, 'alert');

    renderWithRouter(<App />, { location: '/meals' });

    const iconSearch = screen.getByTestId(SEARCH_TOP_BUTTON);
    act(() => userEvent.click(iconSearch));

    const inputFilterName = screen.getByTestId(NAME_SEARCH_RADIO);
    act(() => userEvent.click(inputFilterName));

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    act(() => userEvent.type(inputSearch, 'xablau'));

    const buttonSearch = screen.getByTestId(EXEC_SEARCH_BTN);
    act(() => userEvent.click(buttonSearch));

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});
