import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {useAuth} from './hooks/auth.hook';
import 'materialize-css';
import { AuthContext } from './context/auth.context';
import { Navbar } from './components/Navbar';

function App() {
  const {login, logout, token, userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
      <Router>
        {isAuthenticated && <Navbar></Navbar>}
        <div className="container">
          {routes}
        </div> 
      </Router>
    </AuthContext.Provider>
  );
}

export {
  App
};
