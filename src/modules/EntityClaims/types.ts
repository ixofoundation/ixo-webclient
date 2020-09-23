import { JSONSchema7 } from 'json-schema'
import { UiSchema } from '@rjsf/core'

export enum EntityClaimType {
  Service = 'Service',
  Outcome = 'Outcome',
  Credential = 'Credential',
  UseOfFunds = 'UseOfFunds',
  Payment = 'Payment',
  Investment = 'Investment',
  Banking = 'Banking',
  Procurement = 'Procurement',
  Provenance = 'Provenance',
  Ownership = 'Ownership',
  Custody = 'Custody',
  Dispute = 'Dispute',
}

export interface ClaimInfo {
  title: string
  shortDescription: string
  type: EntityClaimType
}

export interface QuestionForm {
  ['@type']: string
  schema: JSONSchema7
  uiSchema: UiSchema
}

export interface Attestation {
  claimInfo: ClaimInfo
  forms: QuestionForm[]
}

export type EntityClaimTypeStrategyMap = {
  [TKey in EntityClaimType]: {
    title: string
  }
}
