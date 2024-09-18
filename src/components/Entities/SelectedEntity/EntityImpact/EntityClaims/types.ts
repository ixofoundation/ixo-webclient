import { theme } from 'components/CoreEntry/App.styles'

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
  Disputed = '3',
  Saved = '4',
}

export const EntityClaimColorSchema = [theme.pending, theme.approved, theme.rejected, theme.saved, theme.disputed]
