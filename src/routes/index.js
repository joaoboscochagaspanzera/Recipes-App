import { Route, Switch } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Recipes } from '../pages/Recipes';
import { MealDetail } from '../pages/MealDetail';
import { DrinkDetail } from '../pages/DrinkDetail';
import { Profile } from '../pages/Profile';
import { DoneRecipes } from '../pages/DoneRecipes';
import { FavoriteRecipes } from '../pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" render={ () => <Recipes recipeType="meals" /> } />
      <Route exact path="/meals/:id" component={ MealDetail } />
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => <MealDetail { ...props } inProgress /> }
      />
      <Route exact path="/drinks" render={ () => <Recipes recipeType="drinks" /> } />
      <Route exact path="/drinks/:id" component={ DrinkDetail } />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (...props) => <DrinkDetail { ...props } inProgress /> }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export { Routes };
