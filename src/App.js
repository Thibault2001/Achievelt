import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './loginPage';
import SignUpPage from './signUpPage';
import WelcomeUser from './welcomeUsers';
import WelcomeAdmin from './adminPages/welcomeAdmin'
import Test from './dataBaseTest'

//changing comment 
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/welcome" element={<WelcomeUser />} />
          <Route path="welcomeAdmin" element={<WelcomeAdmin />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();

  // If the current path is '/welcome', don't render the navigation
  if (location.pathname === '/welcome') {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/signUp">Sign Up</Link>
          <Link to="/test">Coucou</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
