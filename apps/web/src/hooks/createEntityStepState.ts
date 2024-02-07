import { useLocation } from "react-router-dom"
import useStepperNavigate from "./stepperNavigation"
import { useEffect, useState } from "react"
import { Step, goToStep, selectCurrentStep, selectNextStep, selectPreviousStep, selectSteps } from "redux/entityMultiStepCreation/slice"
import { useAppSelector } from "redux/hooks"
import { useDispatch } from "react-redux"

export const useCreateEntityStepState = () => {
    const location = useLocation()
    const stepperNavigate = useStepperNavigate({ location })
    const currentStep = useAppSelector(selectCurrentStep)
    const nextStep = useAppSelector(selectNextStep)
    const previousStep = useAppSelector(selectPreviousStep)
    const steps = useAppSelector(selectSteps)
    const [entitySteps, setEntitySteps] = useState<Step[] | null>(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname !== currentStep.path) {
            const activeStep = steps.find(step => step.path === location.pathname)
            if (activeStep) {
                dispatch(goToStep(activeStep));
            }
        }
    }, [location, currentStep.path, dispatch, steps])

    const navigateToNextStep = (firstStep?: Step) => {
        if (firstStep) {
            stepperNavigate(firstStep)
            return
        }
        if (nextStep && (location.pathname === currentStep.path)) {
            stepperNavigate(nextStep)
        }
    }

    const navigateToPreviousStep = () => {
        if (location.pathname === currentStep.path && previousStep) {
            stepperNavigate(previousStep)
        }
    }

    return { entitySteps, setEntitySteps, navigateToNextStep, navigateToPreviousStep }
}