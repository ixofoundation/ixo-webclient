import { JSONSchema7 } from 'json-schema'
import { UiSchema } from '@rjsf/core'
import { EntityClaimType } from 'modules/ClaimModules/EntityClaims/types'

export interface ApiClaimInfo {
  title: string
  shortDescription: string
  type: EntityClaimType
}

export interface ApiForm {
  ['@type']: string
  schema: JSONSchema7
  uiSchema: UiSchema
}

export interface ApiAttestation {
  claimInfo: ApiClaimInfo
  forms: ApiForm[]
}
