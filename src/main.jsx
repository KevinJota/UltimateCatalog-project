import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Login from './pages/login.jsx';
import User from './pages/User.jsx';
import './index.css';
import Details from './pages/Details.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <App />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/User"
          element={
            <>
              <Navbar />
              <User />
              <Footer />
            </>
          }
        />
        <Route
          path="/Details/:id"
          element={
            <>
              <Navbar />
              <Details />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);


