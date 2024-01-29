import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'

export type Step = {
  number: number
  path: string
  title: string
}

interface EntityCreationState {
  entityType: 'dao' | 'protocol' | 'project' | 'investment' | 'oracle' | 'deed' | null
  steps: Step[]
  currentStep: Step
  data: Record<string, any>
}

interface SetEntityTypeAction {
  type: string
  payload: EntityCreationState['entityType']
}

interface SetStepsAction {
  type: string
  payload: Step[]
}

interface GoToStepAction {
  type: string
  payload: Step
}

interface UpdateEntityDataAction {
  type: string
  payload: Record<string, any>
}

export const initialState = {
  entityType: null,
  steps: [],
  currentStep: { number: 0, path: '', title: '' },
  data: {},
} as EntityCreationState

const entityMultiStepCreation = createSlice({
  name: 'entityCreation',
  initialState,
  reducers: {
    resetEntityMultiStepCreation: (state) => {
      state = initialState
    },
    setEntityType: (state, action: SetEntityTypeAction) => {
      state.entityType = action.payload
    },
    goToStep: (state, action: GoToStepAction) => {
      state.currentStep = action.payload
    },
    setSteps: (state, action: SetStepsAction) => {
      state.steps = action.payload
    },
    goToPreviousStep: (state) => {
      const currentIndex = state.steps.findIndex((step) => step.number === state.currentStep.number)
      if (currentIndex > 0) {
        state.currentStep = state.steps[currentIndex - 1]
      }
    },
    goToNextStep: (state) => {
      const currentIndex = state.steps.findIndex((step) => step.number === state.currentStep.number)
      if (currentIndex < state.steps.length - 1) {
        state.currentStep = state.steps[currentIndex + 1]
      }
    },
    updateEntityData: (state, action: UpdateEntityDataAction) => {
      state.data = { ...state.data, ...action.payload }
    },
  },
})
export const selectEntityCreationState = (state: RootState) => state.multiStepCreation

export const selectEntityType = createSelector(
  [selectEntityCreationState],
  (entityCreation) => entityCreation.entityType,
)

export const selectCurrentStep = createSelector(
  [selectEntityCreationState],
  (entityCreation) => entityCreation.currentStep,
)

export const selectEntityData = createSelector([selectEntityCreationState], (entityCreation) => entityCreation.data)

export const selectSteps = createSelector([selectEntityCreationState], (entityCreation) => entityCreation.steps)

export const selectNextStep = createSelector([selectCurrentStep, selectSteps], (currentStep, steps: Step[]) => {
  const currentIndex = steps.findIndex((step) => step.number === currentStep.number)
  // Check if there is a next step
  if (currentIndex >= 0 && currentIndex < steps.length - 1) {
    return steps[currentIndex + 1]
  }
  // Return null if there is no next step
  return null
})

// Selector to get the previous step
export const selectPreviousStep = createSelector([selectCurrentStep, selectSteps], (currentStep, steps: Step[]) => {
  const currentIndex = steps.findIndex((step) => step.number === currentStep.number)
  // Check if there is a previous step
  if (currentIndex > 0) {
    return steps[currentIndex - 1]
  }
  // Return null if there is no previous step
  return null
})

export const { setEntityType, goToNextStep, updateEntityData, setSteps, goToStep, resetEntityMultiStepCreation } = entityMultiStepCreation.actions

export const multiStepReducer = entityMultiStepCreation.reducer
