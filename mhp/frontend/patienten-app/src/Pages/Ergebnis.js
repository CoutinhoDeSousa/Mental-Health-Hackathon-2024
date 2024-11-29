import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Für Zugriff auf die Server-Antwort
import { QRCodeCanvas } from "qrcode.react"; // Für QR-Code-Generierung
import GraphObject from "./GraphObject";

const Ergebnis = ({ searchString = "", mode = false }) => {
    const location = useLocation();
    const [serverResponse, setServerResponse] = useState(location.state?.serverResponse || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getResult = async () => {
            if (!searchString) return;

            setLoading(true);
            try {
                const query = `https://mhh24-backend.skimu.de/results?${searchString}`;
                const response = await fetch(query, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setServerResponse(responseData);
                    console.log("Server-Antwort:", responseData);
                } else {
                    alert(`Fehler beim Abrufen der Daten: Status ${response.status}`);
                }
            } catch (error) {
                alert(`Fehler beim Abrufen der Daten: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (searchString) {
            getResult();
        }
    }, [searchString]);

    if (loading) {
        return <p>Laden der Daten...</p>;
    }

    if (!serverResponse) {
        return <p>Keine Daten verfügbar.</p>;
    }

    const { qr_code, questionnaires } = serverResponse;

    const buildGraphData = (response) => {
        return response.questionnaires.map((item) => ({
            category: item.category,
            score: item.score,
            recommendation: item.current_range?.recommendation || "",
            digas: (item.current_range?.digas || []).map((diga) => ({
                name: diga.diga_name,
                link: diga.diga_link,
            })),
            ranges: item.ranges.map((range) => ({
                label: range.label,
                range: range.range,
            })),
        }));
    };

    // Daten für GraphObject aus der Server-Antwort extrahieren
    const graphData = buildGraphData(serverResponse);

    return (
        <div>
            <h1>Ergebnis</h1>

            {/* Diagramme anzeigen */}
            <GraphObject data={graphData} mode={mode} />

            {/* QR-Code nur anzeigen, wenn mode === false */}
            {mode === false && qr_code && qr_code.length > 0 && (
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                    <h3>QR-Code:</h3>
                    <QRCodeCanvas
                        value={qr_code} // QR-Code-Daten
                        size={150}
                        level={"H"}
                        includeMargin={true}
                    />
                </div>
            )}
        </div>
    );
};

export default Ergebnis;
