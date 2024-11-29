import React from 'react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container text-center mt-5">
            {/* Großes Icon */}
            <div className="mb-4">
                <img src="./data/MentalCheck_Logo_big.jpg"     alt="MentalCheck Logo"
                     className="img-fluid"
                     style={{ maxHeight: '200px' }}></img>
            </div>
            <h1>Willkommen bei <b>MentalCheck</b></h1>
            <p className="mt-3">Wählen Sie eine Plattform aus:</p>
            <div className="row justify-content-center mt-4">
                {/* Ärzte-Portal-Kachel */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <NavLink
                        to="/arzt"
                        className="card text-dark text-decoration-none"
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title">Ärzte Portal</h5>
                            <p className="card-text">Anzeige für den Arzt.</p>
                            <p className="card-text">
                                Dieses Portal ist ausschließlich für den Arzt und enthält Behandlungsvorschläge.
                            </p>
                        </div>
                    </NavLink>
                </div>

                {/* Patienten-Portal-Kachel */}
                <div className="col-md-4 col-sm-6 mb-3">
                    <NavLink
                        to="/patient"
                        className="card text-dark text-decoration-none"
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title">Patienten Portal</h5>
                            <p className="card-text">Ansicht für den Patienten.</p>
                            <p className="card-text">
                                Wenn dieses Gerät im Wartezimmer zur Verfügung gestellt wird, bitte dieses Portal wählen.
                            </p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
