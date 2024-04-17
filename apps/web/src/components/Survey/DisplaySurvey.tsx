import { useEffect, useRef } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { themeJson } from 'styles/surveyTheme';

const DisplaySurvey = ({ surveyJson, surveyData }: { surveyJson: any, surveyData: any }) => {
    const survey = useRef<Model | null>(null);

    // Function to safely parse JSON
    const safeParseJSON = (jsonString: string) => {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            return jsonString;
        }
    };

    // Initialize the survey model only once or when surveyJson changes
    useEffect(() => {
        if (!survey.current) {
            const parsedJson = safeParseJSON(surveyJson);
            if (parsedJson) {
                survey.current = new Model(parsedJson);
            }
        }
    }, [surveyJson]);

    // Apply changes to the survey model when surveyData or surveyJson changes
    useEffect(() => {
        if (survey.current) {
            const parsedData = safeParseJSON(surveyData.data);
            if (parsedData) {
                survey.current.mode = "display";
                survey.current.data = parsedData;
                survey.current.applyTheme(themeJson);
            }
        }
    }, [surveyData, surveyJson]);


    // Render Survey component if survey.current is initialized
    return survey.current ? <Survey id="survey" model={survey.current} /> : null;
}

export default DisplaySurvey;
