import React from 'react';
import { useState } from "react";
import QuestionaireDummy from "./QuestionaireDummy";

const PatientenFragebogen = () => {
    const [showQuestionaire2, setShowQuestionaire2] = useState(false);

    return (
        <div>
            <h1>Fragebogen</h1>
            <div id='questionaire-1'>
            <QuestionaireDummy
                fetchUrl="https://mhh24-backend.skimu.de/questionnaire/PHQ-9_"
                submitUrl="https://mhh24-backend.skimu.de/questionnaire/submit"
                onComplete= {() => setShowQuestionaire2(true)}  // Show the second questionnaire on completion
            />
            </div>
            {/* <div id='questionaire-2'> */}
            <div id='questionaire-2' hidden={!showQuestionaire2} >
            <QuestionaireDummy
                fetchUrl="https://mhh24-backend.skimu.de/questionnaire/AUDIT-C_"
                submitUrl="https://mhh24-backend.skimu.de/questionnaire/submit"
            />
            </div>
            {/* <div id='questionaire-3' hidden>
            <QuestionaireDummy
                fetchUrl="https://mhh24-backend.skimu.de/questionnaire/GAD7"
                submitUrl="https://mhh24-backend.skimu.de/questionnaire/submit"
            />
            </div> */}
        </div>
    );
};

export default PatientenFragebogen;
