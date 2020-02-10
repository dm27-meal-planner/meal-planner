import React from 'react';
import logo from './logo.svg';
import './App.css';
import GroceryList from './Components/GroceryList/GroceryList';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <GroceryList />
      <HomePage />
    </div>
  );
}

export default App;
