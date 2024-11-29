import React from 'react';
import { NavLink } from 'react-router-dom';

const ArztLandingPage = () => {
    return (
        <div className="container text-center mt-5">
            {/* Logo */}
            <div className="mb-4">
                <img
                    src="./data/MentalCheck_Logo_big.jpg"
                    alt="MentalCheck Logo"
                    className="img-fluid"
                    style={{ maxHeight: '150px' }}
                />
            </div>
            <h1>Willkommen im Arztportal des <b>MentalChecks</b></h1>
            <p className="mt-3">Wählen Sie eine Aktion aus:</p>
            <div className="row justify-content-center mt-4">
                {/* Informationen-Kachel */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <NavLink
                        to="/arzt/informationen"
                        className="card text-dark text-decoration-none"
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title">Informationen</h5>
                            <p className="card-text">Details und Hinweise.</p>
                        </div>
                    </NavLink>
                </div>

                {/* Ergebnis-Kachel */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <NavLink
                        to="/arzt/ergebnis"
                        className="card text-dark text-decoration-none"
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title">Ergebnisse</h5>
                            <p className="card-text">Übersicht und Analysen.</p>
                        </div>
                    </NavLink>
                </div>
            </div>

        </div>
    );
};

export default ArztLandingPage;
