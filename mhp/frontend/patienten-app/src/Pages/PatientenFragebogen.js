import React from 'react';
import QuestionaireDummy from "./QuestionaireDummy";

const PatientenFragebogen = () => {
    return (
        <div>
            <h1>Fragebogen</h1>
            <QuestionaireDummy
                fetchUrl="https://mhh24-backend.skimu.de/questionnaire/PHQ-9"
                submitUrl="https://mhh24-backend.skimu.de/questionnaire/submit"
            />
            <QuestionaireDummy
                fetchUrl="https://mhh24-backend.skimu.de/questionnaire/AUDIT-C"
                submitUrl="https://mhh24-backend.skimu.de/questionnaire/submit"
            />
        </div>
    );
};

export default PatientenFragebogen;
