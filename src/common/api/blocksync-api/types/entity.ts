import {
  EntityType,
  EntityStatus,
  EntityStage,
  TermsOfUseType,
  PageView,
  EntityView,
  PaymentDenomination,
  SlashingCondition,
  KeyPurpose,
  DataResourceType,
  ServiceType,
  KeyType,
  StakeType,
  PaymentType,
  NodeType,
  FundSource,
} from 'modules/EntityModules/Entities/types'

export interface Entity {
  ['@context']: string
  ['@type']: EntityType
  entitySchemaVersion: string
  name: string
  description: string
  image: string
  imageDescription: string
  location: string
  sdgs: string[]
  startDate: string
  endDate: string
  status: EntityStatus
  stage: EntityStage
  relayerNode: string
  version: {
    versionNumber: string
    effectiveDate: string
    notes: string
  }
  terms: {
    ['@type']: TermsOfUseType
    paymentTemplateId: string
  }
  privacy: {
    pageView: PageView
    entityView: EntityView
    credentials: {
      credential: string
      issuer: string
    }[]
  }
  creator: {
    id: string
    displayName: string
    logo: string
    location: string
    email: string
    website: string
    mission: string
    credentialId: string
  }
  owner: {
    id: string
    displayName: string
    logo: string
    location: string
    email: string
    website: string
    mission: string
  }
  ddoTags: {
    category: string
    tags: string[]
  }[]
  displayCredentials: {
    ['@context']: string
    items: { credential: string; badge: string }[]
  }
  page: {
    cid: string
    version: string
  }
  claims: {
    ['@context']: string
    items: {
      ['@id']: string
      visibility: string
      title: string
      description: string
      targetMin: number
      targetMax: number
      startDate: string
      endDate: string
      agents: {
        role: string
        autoApprove: boolean
        credential: string
      }[]
      claimEvaluation: {
        ['@context']: string
        ['@id']: string
        methodology: string
        attributes: string[]
      }[]
      claimApproval: {
        ['@context']: string
        ['@id']: string
        criteria: {
          condition: string
          attribute: string
        }[]
      }[]
      claimEnrichment: {
        ['@context']: string
        ['@id']: string
        resources: {
          productId: string
          resource: string
        }[]
      }[]
    }[]
  }
  linkedEntities: { ['@type']: EntityType; id: string }[]
  fees: {
    ['@context']: string
    items: { ['@type']: PaymentType; id: string }[]
  }
  stake: {
    ['@context']: string
    items: {
      ['@type']: StakeType
      id: string
      denom: PaymentDenomination
      stakeAddress: string
      minStake: number
      slashCondition: SlashingCondition
      slashFactor: number
      slashAmount: number
      unbondPeriod: number
    }[]
  }
  nodes: {
    ['@context']: string
    items: { ['@type']: NodeType; id: string }[]
  }
  funding: {
    ['@context']: string
    items: { ['@type']: FundSource; id: string }[]
  }
  keys: {
    ['@context']: string
    items: {
      purpose: KeyPurpose
      ['@type']: KeyType
      controller: string
      keyValue: string
      dateCreated: string
      dateUpdated: string
      signature: string
    }[]
  }
  service: {
    ['@type']: ServiceType
    id: string
    serviceEndpoint: string
    description: string
    publicKey: string
    properties: string
  }[]
  data: {
    ['@type']: DataResourceType
    id: string
    serviceEndpoint: string
    properties: string
  }[]
}
