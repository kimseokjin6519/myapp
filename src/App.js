import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Profile from './pages/Profile';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
	<Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />

        {/* You can add more routes here */}

      </Routes>
    </Router>
  );
}

export default App;
