import { theme } from 'modules/App/App.styles'

export interface EntityClaim {
  date: Date
  location: {
    long: string
    lat: string
  }
  claimId: string
  status: string
  saDid: string
  eaDid?: string
  claimTemplateId?: string
  templateTitle?: string
}

export enum EntityClaimStatus {
  Pending = '0',
  Approved = '1',
  Rejected = '2',
  Saved = '3',
  Disputed = '4',
}

export const EntityClaimColorSchema = [
  theme.pending,
  theme.approved,
  theme.rejected,
  theme.saved,
  theme.disputed,
]
