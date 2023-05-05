import React from 'react';
import { RecipesProvider } from './hooks/useRecipes';
import { Routes } from './routes';

function App() {
  return (
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
  );
}

export default App;
