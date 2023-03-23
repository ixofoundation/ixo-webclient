import { Entity } from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/entity'
import { IidDocument } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/iid'
import { AgentRole } from 'redux/account/account.types'
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
  LinkedResourceType,
  ServiceType,
  KeyType,
  StakeType,
  PaymentType,
  NodeType,
  LiquiditySource,
  FundSource,
} from 'types/entities'
import {
  TEntityAdministratorModel,
  TEntityCreatorModel,
  TEntityDDOTagModel,
  TEntityPageSectionModel,
  TEntityProfileModel,
} from 'types/protocol'

// ideally these definitions should be in the ixo api module itself

export interface ApiEntity {
  ['@context']: string
  ['@type']: EntityType
  entitySchemaVersion: string
  name: string
  description: string
  image: string
  imageDescription: string
  brand: string
  logo: string
  location: string
  sdgs: string[]
  startDate: string
  endDate: string
  status: EntityStatus
  headlineMetric: {
    claimTemplateId: string
  }
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
  entityClaims: {
    ['@context']: string
    items: {
      ['@id']: string
      visibility: string
      title: string
      description: string
      goal: string
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
          attribute: string
          condition: string
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
    items: { ['@type']: NodeType; id: string; serviceEndpoint: string }[]
  }
  liquidity?: {
    ['@context']: string
    items: { ['@type']: LiquiditySource; id: string }[]
  }
  funding?: {
    //  TODO: should be removed
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
  linkedResources: {
    ['@type']: LinkedResourceType
    id: string
    name: string
    description: string
    path: string
  }[]
}

export type NumberLong = any

export interface ApiListedEntityData extends ApiEntity {
  createdOn: NumberLong
  createdBy: string
  nodeDid: string
  agents: {
    status: string
    kyc: boolean
    did: string
    role: AgentRole
  }[]
  claimStats: {
    currentSuccessful: number
    currentRejected: number
  }
  agentStats: {
    evaluators: number
    evaluatorsPending: number
    serviceProviders: number
    serviceProvidersPending: number
    investors: number
    investorsPending: number
  }
  claims: {
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
  }[]
  embeddedAnalytics?: {
    title: string
    urls: string[]
  }[]
}

export interface ApiListedEntity {
  txHash: string
  projectDid: string
  senderDid: string
  pubKey: string
  status: string //  https://github.com/ixofoundation/ixo-blockchain/blob/main/x/project/spec/01_state.md
  data: ApiListedEntityData
}

export interface TEntityModel extends Omit<Entity, 'metadata'>, IidDocument {
  publicKey?: string

  profile?: TEntityProfileModel
  creator?: TEntityCreatorModel
  administrator?: TEntityAdministratorModel
  page?: TEntityPageSectionModel[]
  tags?: TEntityDDOTagModel[]
}
