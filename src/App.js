import React from 'react';
import './App.css';
import GuestLanding from './Components/GuestLanding/GuestLanding';
import UserLoginLogout from './Components/GuestLanding/UserLoginLogout';
import GroceryList from './Components/GroceryList/GroceryList';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <GuestLanding />
      <UserLoginLogout />
      <GroceryList />
      <HomePage />
    </div>
  );
}

export default App;
