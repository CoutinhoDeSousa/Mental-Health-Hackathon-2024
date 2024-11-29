import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import PatientenStart from '../Pages/PatientenStart';
import PatientenFragebogen from '../Pages/PatientenFragebogen';
import Ergebnis from '../Pages/Ergebnis';
import InfoPage from "../Pages/InfoPage";

const PatientenPortal = () => (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/patient">Patientenportal</a>
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
                            <NavLink className="nav-link" to="/patient">Start</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/patient/fragebogen">Fragebogen</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/patient/ergebnis">Ergebnis</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/patient/infopage">weiterführende Informationen</NavLink>
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
                <Route path="/infopage" element={<InfoPage />} />
            </Routes>
        </div>
    </>
);

export default PatientenPortal;
