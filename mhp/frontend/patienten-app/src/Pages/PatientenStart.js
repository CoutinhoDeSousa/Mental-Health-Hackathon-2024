import React from 'react';
import { Link } from 'react-router-dom';

const PatientenStart = () => {
    return (
        <div>
            <h1>Willkommen zum Patientenportal</h1>
            <div style={{ marginTop: '20px' }}>
                <p>Scannen Sie den QR-Code, um den Fragebogen direkt zu öffnen:</p>
                <Link to="/fragebogen">
                    <img
                        src="/data/dummy_qr.png"
                        alt="QR Code zum Fragebogen"
                        style={{ width: '200px', height: '200px' }}
                    />
                </Link>
            </div>
        </div>
    );
};

export default PatientenStart;
