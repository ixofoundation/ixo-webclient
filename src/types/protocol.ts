export interface TEntityCreatorModel {
  image: string
  displayName: string
  email: string
  country: string
  identifier: string
  credential: string
  mission: string
  encrypted?: boolean
  mutable?: boolean
}

export interface TEntityServiceModel {
  id: string //  did:ixo:entity:abc123#cellnode-pandora
  type: 'cellnode' | 'chainService' | 'linkedDomains'
  serviceEndpoint: string
}

export enum EAssetType {
  ImpactToken = 'Impact Token',
  Commodity = 'Commodity',
  Inventory = 'Inventory',
  Data = 'Data',
  Equipment = 'Equipment',
  Digital = 'Digital',
  Carbon = 'Carbon',
  RealEstate = 'Real Estate',
  Bond = 'Bond',
  Outcome = 'Outcome',
  IP = 'IP',
  Brand = 'Brand',
  Equity = 'Equity',
  Income = 'Income',
  Other = 'Other',
  Wallet = 'Wallet',
  Rights = 'Rights',
}
