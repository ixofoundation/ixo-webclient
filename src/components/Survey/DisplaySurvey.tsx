import { useEffect, useRef } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { themeJson } from 'styles/surveyTheme';


const safeParseJSON = (jsonString: string) => {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        return jsonString;
    }
};


const parseSurveyData = (surveyAnswers: any) => {
    if('data' in surveyAnswers){
        return safeParseJSON(surveyAnswers.data)
    }
    return safeParseJSON(surveyAnswers)
}

const DisplaySurvey = ({ surveyJson, surveyData, surveyId }: { surveyJson: any, surveyData: any, surveyId: any }) => {
    const survey = useRef(new Model(surveyJson));



    useEffect(() => {
        if (survey.current && surveyJson && surveyData && surveyData) {
            const data = parseSurveyData(surveyData);
            survey.current.mode = "display";
            survey.current.data = data;
            survey.current.applyTheme(themeJson);
        }
    }, [surveyData, surveyJson]);


    // Render Survey component if survey.current is initialized
    return survey.current && surveyData ? <Survey id={surveyId} model={survey.current} /> : null;

}

export default DisplaySurvey;
