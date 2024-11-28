import { Model, Survey } from "survey-react-ui";
import { useCallback, useEffect, useState } from "react";
import 'survey-core/survey.min.css';


const QuestionaireDummy = ({ fetchUrl, submitUrl, onComplete }) => {
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
            const userID = 5; // Example user ID
            survey.setValue("userID", userID);

            saveSurveyResults(survey.data, submitUrl);

            if (onComplete) {
                onComplete(); // 
            }
        },
        [submitUrl, onComplete] // Added onComplete to the dependency array
    );

    // Save Survey Results Function
    const saveSurveyResults = (json, url) => {
        //console.log(json)
        let data = translateResults(json)
        console.log(data)
        let title = fetchUrl.split("/").pop().replace(/_/g, "");
        console.log(title)
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify([
                {questionnaire_id:title, result_string:data}
            ]),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Antwort erfolgreich gespeichert");
                } else {
                    alert("Speichern fehlgeschlagen");
                }
            })
            .catch((error) => {
                alert(`Fehler beim Speichern: ${error.message}`);
            });
    };

    // Render Survey
    if (!surveyJson) {
        return <p>Fragebogen wird geladen...</p>;
    }

    const survey = new Model(surveyJson);
    survey.onComplete.add(surveyComplete);

    return <Survey model={survey} />;
};

function translateResults(data){
    console.log(data)
    let output = "";
    for (const key in data) {
       //console.log(`${key}: ${data[key]}`);
       if (key !== 'userID'){
          output += `${key}${data[key]}`
       }
    }

    return output
}

export default QuestionaireDummy;
