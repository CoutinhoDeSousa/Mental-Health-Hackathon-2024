import React from 'react';
import { Link } from 'react-router-dom';

const PatientenStart = () => {
    return (
        <div className="container text-center d-flex flex-column align-items-center justify-content-start"
             style={{height: '100vh'}}>
            {/* Logo */}
            <div className="mb-3 mt-3">
                <img
                    src="/data/MentalCheck_Logo_big.jpg"
                    alt="MentalCheck Logo"
                    className="img-fluid"
                    style={{maxWidth: '200px'}}
                />
            </div>

            {/* Begrüßungstext */}
            <h1 className="mb-2">Willkommen zum Patientenportal</h1>
            <p className="mb-3">Hier können Sie Fragebögen ausfüllen und Ihre Ergebnisse einsehen.</p>

            {/* QR Code */}
            <div className="d-flex flex-column align-items-center">
                <Link to="/patient/fragebogen">
                    <img
                        src="/data/qr_code_vorlaeufig.png"
                        alt="QR Code zum Fragebogen"
                        className="img-fluid mb-2"
                        style={{maxWidth: '150px'}}
                    />
                </Link>
                <p className="mb-1">Scannen Sie den QR-Code oder klicken Sie darauf, um direkt zum Fragebogen zu
                    gelangen.</p>
            </div>
            {/*Zusatzinformationen*/}
            <div className="d-flex flex-column align-items-center">
                <Link to="/patient/infopage">

                <p className="mb-1">Für weitere Information für Hilfeangebote folgen Sie bitte diesem Link.</p>
                </Link>
            </div>
        </div>
    );
};

export default PatientenStart;
