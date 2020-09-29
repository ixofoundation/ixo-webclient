import { EntityClaimType } from 'modules/EntityClaims/types'

export interface ApiClaim {
  ['@context']: string
  id: string
  type: EntityClaimType
  issuerId: string
  claimSubject: {
    id: string
  }
  items: {
    id: string
    attribute: string
    value: any
  }[]
  dateTime: string
  projectDid: string
}
