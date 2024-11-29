import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientenPortal from './Portals/PatientenPortal';
import ArztPortal from './Portals/ArztPortal';
import LandingPage from "./Pages/LandingPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* Patientenportal */}
                <Route path="/patient/*" element={<PatientenPortal />} />

                {/* Arztportal */}
                <Route path="/arzt/*" element={<ArztPortal />} />
            </Routes>
        </Router>
    );
};

export default App;
