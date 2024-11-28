import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PatientenStart from './Pages/PatientenStart';
import PatientenFragebogen from './Pages/PatientenFragebogen';
import Ergebnis from './Pages/Ergebnis';
import ArztInformation from './Pages/ArztInformation';
import ArztErgebnis from './Pages/ArztErgebnis';

const App = () => {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Patientenportal</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Start</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/fragebogen">Fragebogen</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/ergebnis">Ergebnis</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/arztinformation">Arzt Information</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/arztergebnis">Arzt Ergebnis</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<PatientenStart />} />
                    <Route path="/fragebogen" element={<PatientenFragebogen />} />
                    <Route path="/ergebnis" element={<Ergebnis />} />
                    <Route path="/arztinformation" element={<ArztInformation />} />
                    <Route path="/arztergebnis" element={<ArztErgebnis />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
