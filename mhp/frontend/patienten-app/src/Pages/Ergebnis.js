import React from "react";
import { useLocation } from "react-router-dom"; // Für Zugriff auf die Server-Antwort
import { QRCodeCanvas } from "qrcode.react"; // Für QR-Code-Generierung
import GraphObject from "./GraphObject"; // Importiere Diagramm-Komponente

const Ergebnis = ({ mode }) => {
    const location = useLocation();
    const serverResponse = location.state?.serverResponse;

    if (!serverResponse) {
        return <p>Keine Daten verfügbar.</p>;
    }

    const { qr_code, questionnaires } = serverResponse;

    // Daten für GraphObject aus der Server-Antwort extrahieren
    const graphData = questionnaires.map((q) => ({
        category: q.category,
        value: q.score,
        ranges: q.ranges.map((range) => ({
            label: range.label,
            range: range.range,
            recommendation: range.recommendation,
        })),
        digas: q.ranges.map((range) => range.recommendation),
        texts: {
            arzt: `Aktueller Status: ${q.current_range.label}. Empfehlung: ${q.current_range.recommendation}`,
            nichtArzt: `Hinweise: ${q.current_range.recommendation}`,
        },
    }));

    return (
        <div>
            <h1>Ergebnis</h1>

            {/* Diagramme anzeigen */}
            <GraphObject data={graphData} mode={mode} />

            {/* QR-Code nur anzeigen, wenn mode === false */}
            {mode === false && qr_code && (
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
