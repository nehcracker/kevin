import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/layout/Footer/Footer';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
