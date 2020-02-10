import React from 'react';
import './App.css';
import UserLoginLogout from './Components/GuestLanding/UserLoginLogout';
import NavBar from './Components/NavBar/NavBar';
import routes from './routes'

function App() {
  return (
    <div className="App">
      <NavBar />
      {routes}
      {/* <GroceryList /> */}
    </div>
  );
}

export default App;
