import { Route, Switch } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Recipes } from '../pages/Recipes';
import { RecipeDetail } from '../pages/RecipeDetail';
import { Profile } from '../pages/Profile';
import { DoneRecipes } from '../pages/DoneRecipes';
import { FavoriteRecipes } from '../pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/meals/:id" component={ RecipeDetail } />
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => (
          <RecipeDetail
            inProgress
            { ...props }
          />
        ) }
      />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/drinks/:id" component={ RecipeDetail } />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => (
          <RecipeDetail
            inProgress
            { ...props }
          />
        ) }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export { Routes };
