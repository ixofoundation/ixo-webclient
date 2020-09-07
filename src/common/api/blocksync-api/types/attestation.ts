import { JSONSchema7 } from 'json-schema'
import { UiSchema } from '@rjsf/core'

export interface ClaimInfo {
  title: string
  shortDescription: string
}

export interface Form {
  schema: JSONSchema7
  uiSchema: UiSchema
}

export interface Attestation {
  claimInfo: ClaimInfo
  forms: Form[]
}
