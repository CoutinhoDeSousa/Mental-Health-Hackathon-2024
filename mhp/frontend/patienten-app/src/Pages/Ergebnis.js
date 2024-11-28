import React from 'react';
import GraphObject from './GraphObject';

const Ergebnis = ({ number, docmode = false}) => {
    const data = [
        {
            category: 'Depression',
            value: 30,
            ranges: [
                { label: 'nicht', range: [0, 20] },
                { label: 'leicht', range: [20, 40] },
                { label: 'mittel', range: [40, 60] },
                { label: 'schwer', range: [60, 100] },
            ],
            digas: ['DiGa A', 'DiGa B', 'DiGa C'],
            texts: {
                arzt: 'Empfehlungen für Ärzte: Bitte überprüfen Sie die folgenden Optionen.',
                nichtArzt: 'Hinweise für Patienten: Diese Optionen könnten hilfreich sein.',
            },
        },
        {
            category: 'Alkoholismus',
            value: 50,
            ranges: [
                { label: 'nicht', range: [0, 30] },
                { label: 'leicht', range: [30, 60] },
                { label: 'mittel', range: [60, 80] },
                { label: 'schwer', range: [80, 100] },
            ],
            digas: ['DiGa X', 'DiGa Y', 'DiGa Z'],
            texts: {
                arzt: 'Empfehlungen für Ärzte: Zusätzliche Diagnosen könnten sinnvoll sein.',
                nichtArzt: 'Hinweise für Patienten: Prüfen Sie die Optionen.',
            },
        },
    ];

    return (
        <div>
            <h1>Ergebnis</h1>
            <div style={{ marginBottom: '20px' }}>
                <p><strong>Nummer:</strong> {number}</p>
            </div>
            <GraphObject data={data} mode={docmode} />
        </div>
    );
};

export default Ergebnis;
