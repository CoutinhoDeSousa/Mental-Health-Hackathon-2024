import { Model, Survey } from "survey-react-ui";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie"; // Bibliothek für Cookie-Handling
import 'survey-core/survey.min.css';

const QuestionaireDummy = ({ fetchUrl, onComplete }) => {
    const [surveyJson, setSurveyJson] = useState(null);

    // Fetch Survey JSON
    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error("Fehler beim Laden des Fragebogens");
                }
                const data = await response.json();
                setSurveyJson(data);
            } catch (error) {
                alert(`Fehler: ${error.message}`);
            }
        };

        fetchSurvey();
    }, [fetchUrl]);

    // Callback for Survey Completion
    const surveyComplete = useCallback(
        (survey) => {
            const userID = 5; // Beispiel-User-ID
            survey.setValue("userID", userID);

            saveSurveyResults(survey.data);

            if (onComplete) {
                onComplete();
            }
        },
        [onComplete]
    );

    // Save Survey Results in Cookie
    const saveSurveyResults = (json) => {
        const data = translateResults(json);
        const title = fetchUrl.split("/").pop().replace(/_/g, "");

        // Vorherige Ergebnisse lesen und aktualisieren
        const existingResults = JSON.parse(Cookies.get("surveyResults") || "[]");
        const updatedResults = [
            ...existingResults,
            { questionnaire_id: title, result_string: data },
        ];

        // Ergebnisse im Cookie speichern
        Cookies.set("surveyResults", JSON.stringify(updatedResults), { expires: 7 }); // 7 Tage speichern
        alert("Antwort erfolgreich im Cookie gespeichert");
    };

    // Render Survey
    if (!surveyJson) {
        return <p>Fragebogen wird geladen...</p>;
    }

    const survey = new Model(surveyJson);
    survey.onComplete.add(surveyComplete);

    return <Survey model={survey} />;
};

// Hilfsfunktion: Ergebnisse in das gewünschte Format übersetzen
function translateResults(data) {
    const output = Object.entries(data)
        .filter(([key]) => key !== "userID") // userID ausschließen
        .map(([key, value]) => `${key}${value}`) // "key:value" Paare erstellen
        .join(""); // aneinanderh#ngen
    return output;
}

export default QuestionaireDummy;
