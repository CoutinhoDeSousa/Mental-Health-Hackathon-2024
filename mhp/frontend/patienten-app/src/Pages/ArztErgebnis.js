import React, { useState } from "react";
import Ergebnis from "./Ergebnis";

const ArztErgebnis = () => {
    const [searchString, setSearchString] = useState("");
    const [submittedSearch, setSubmittedSearch] = useState("");

    const handleInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleSearchSubmit = () => {
        setSubmittedSearch(searchString);
    };

    return (
        <div>
            <h1>Arztergebnis</h1>
            <p>Geben Sie einen Suchbegriff ein, um Ergebnisse zu laden:</p>
            <div style={{ marginBottom: "20px" }}>
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
                <button
                    onClick={handleSearchSubmit}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Suchen
                </button>
            </div>
            {submittedSearch && <Ergebnis searchString={submittedSearch} mode={true} />}
        </div>
    );
};

export default ArztErgebnis;
