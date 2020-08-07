import { EntityType } from '../Entities/types'

export enum Step {
  PageContent = 1,
  Settings = 2,
  Advanced = 3,
}

export interface CreateEntityState {
  currentStep: Step
  entityType: EntityType
}

export enum CreateEntityActions {
  GoToStep = 'ixo/CreateEntity/GO_TO_STEP',
}

export interface FileContent {
  fileSrc: string
  uploading: boolean
}

export interface Validation {
  identifier: string
  validated: boolean
  errors: string[]
}

export interface FormCardProps {
  ref: any
  handleUpdateContent: (formData: FormData) => void
  handleError: (errors: string[]) => void
  handleSubmitted: () => void
  handleRemoveSection?: () => void
}
