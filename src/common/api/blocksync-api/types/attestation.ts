import { JSONSchema7 } from 'json-schema'
import { UiSchema } from '@rjsf/core'
import { EntityClaimType } from 'modules/ClaimModules/EntityClaims/types'

export interface ClaimInfo {
  title: string
  shortDescription: string
  type: EntityClaimType
}

export interface Form {
  ['@type']: string
  schema: JSONSchema7
  uiSchema: UiSchema
}

export interface Attestation {
  claimInfo: ClaimInfo
  forms: Form[]
}
