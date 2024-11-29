import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Für Navigation
import Cookies from "js-cookie";
import QuestionaireDummy from "./QuestionaireDummy";

const PatientenFragebogen = () => {
    const [currentQuestionnaire, setCurrentQuestionnaire] = useState(0);
    const navigate = useNavigate(); // Navigation verwenden
    const questionnaires = [
        {
            id: "questionaire-1",
            fetchUrl: "https://mhh24-backend.skimu.de/questionnaire/PHQ-9_",
        },
        {
            id: "questionaire-2",
            fetchUrl: "https://mhh24-backend.skimu.de/questionnaire/AUDIT-C_",
        },
        {
            id: "questionaire-3",
            fetchUrl: "https://mhh24-backend.skimu.de/questionnaire/GAD7_",
        },
    ];

    const showNext = () => {
        if (currentQuestionnaire < questionnaires.length - 1) {
            setCurrentQuestionnaire(currentQuestionnaire + 1);
        } else {
            submitResults(); // Ergebnisse senden und weiterleiten
        }
    };

    const submitResults = async () => {
        const results = JSON.parse(Cookies.get("surveyResults") || "[]");
        console.log("Hier ist das result was niklas kriegt", results)
        try {
            const response = await fetch("https://mhh24-backend.skimu.de/results", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(results),
            });
            console.log(JSON.stringify(results));

            if (response.ok) {
                const responseData = await response.json();
                console.log("Server-Antwort:", responseData);

                // Cookie löschen
                Cookies.remove("surveyResults");

                // Weiterleitung zur Ergebnisseite mit den Daten
                navigate("/patient/ergebnis", { state: { serverResponse: responseData } });
            } else {
                alert(`Fehler beim Speichern: Status ${response.status}`);
            }
        } catch (error) {
            alert(`Fehler beim Speichern: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Fragebogen</h1>
            {questionnaires.map((questionnaire, index) => (
                <div
                    key={questionnaire.id}
                    id={questionnaire.id}
                    hidden={index !== currentQuestionnaire}
                >
                    <QuestionaireDummy
                        fetchUrl={questionnaire.fetchUrl}
                        onComplete={showNext}
                    />
                </div>
            ))}
        </div>
    );
};

export default PatientenFragebogen;
