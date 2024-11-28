import React, { useState } from 'react';
import Ergebnis from './Ergebnis';

const ArztErgebnis = () => {
    const [searchString, setSearchString] = useState("");

    const handleInputChange = (e) => {
        setSearchString(e.target.value);
    };

    return (
        <div>
            <h1>Arztergebnis</h1>
            <p>Geben Sie einen Suchbegriff ein, um Ergebnisse zu laden:</p>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchString}
                    onChange={handleInputChange}
                    placeholder="Suchbegriff eingeben"
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        marginBottom: "10px",
                    }}
                />
            </div>
            <Ergebnis searchString={searchString} docmode={true}/>
        </div>
    );
};

export default ArztErgebnis;
