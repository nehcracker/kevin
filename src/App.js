import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import ProjectFunding from './pages/Services/ProjectFunding/ProjectFunding';
import InternationalFinancialAdvisor from './pages/Services/InternationalFinancialAdvisor/InternationalFinancialAdvisor';
import RiskCompliance from './pages/Services/RiskCompliance/RiskCompliance';
import DocumentAlignment from './pages/Services/DocumentAlignment/DocumentAlignment';
import BusinessFunding from './pages/Services/BusinessFunding/BusinessFunding';
import BusinessConsultant from './pages/Services/BusinessConsultant/BusinessConsultant';
import Reviews from './components/Reviews/Reviews';
import Contact from './components/Contact/Contact';
import Partners from './components/Partners/Partners';
import FloatingContact from './components/common/FloatingContact/FloatingContact';
import Footer from './components/layout/Footer/Footer';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/"                                             element={<Home />} />
          <Route path="/about"                                        element={<About />} />
          <Route path="/services"                                     element={<Services />} />
          <Route path="/services/project-funding"                     element={<ProjectFunding />} />
          <Route path="/services/international-financial-advisor"     element={<InternationalFinancialAdvisor />} />
          <Route path="/services/risk-compliance"                     element={<RiskCompliance />} />
          <Route path="/services/document-alignment-services"         element={<DocumentAlignment />} />
          <Route path="/services/business-funding-loans"              element={<BusinessFunding />} />
          <Route path="/services/business-consultant"                 element={<BusinessConsultant />} />
        </Routes>
        <Reviews />
        <Contact />
        <Partners />
        <Footer />
        {/* FloatingContact renders fixed over all pages */}
        <FloatingContact />
      </div>
    </Router>
  );
}

export default App;