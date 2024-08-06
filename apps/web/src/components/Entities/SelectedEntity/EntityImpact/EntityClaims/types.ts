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

export const EntityClaimColorSchema = [
  'theme.colors.orange[5]',
  'theme.colors.green[5]',
  'theme.colors.red[5]',
  'theme.colors.gray[5]',
  'theme.colors.yellow[5]',
]
