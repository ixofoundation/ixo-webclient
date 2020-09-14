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

export type EntityClaimTypeStrategyMap = {
  [TKey in EntityClaimType]: {
    title: string
  }
}
