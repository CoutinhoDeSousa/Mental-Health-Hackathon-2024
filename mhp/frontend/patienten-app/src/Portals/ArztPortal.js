import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ArztLandingPage from '../Pages/ArztLandingPage';
import ArztInformation from '../Pages/ArztInformation';
import ArztErgebnis from '../Pages/ArztErgebnis';

const ArztPortal = () => (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/arzt">Arztportal</a>
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
                            <NavLink className="nav-link" to="/arzt">Start</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/arzt/informationen">Informationen</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/arzt/ergebnis">Ergebnis</NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        <div className="container mt-4">
            <Routes>
                <Route path="/" element={<ArztLandingPage />} />
                <Route path="/informationen" element={<ArztInformation />} />
                <Route path="/ergebnis" element={<ArztErgebnis />} />
            </Routes>
        </div>
    </>
);

export default ArztPortal;
