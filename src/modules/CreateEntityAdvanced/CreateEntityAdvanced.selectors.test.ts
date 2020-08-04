import * as SUT from './CreateEntityAdvanced.selectors'
import { CreateEntityAdvancedState } from './types'
import {
  EntityType,
  PaymentDenomination,
  PaymentType,
  StakeType,
  SlashingCondition,
  NodeType,
  FundSource,
  KeyPurpose,
  KeyType,
  ServiceType,
  DataResourceType,
} from '../Entities/types'

let state: any

beforeEach(() => {
  state = {
    createEntityAdvanced: {
      linkedEntity: {
        entityId: 'someEntityId',
        type: EntityType.Investment,
      },
      payment: {
        denomination: PaymentDenomination.eCHF,
        maxAmount: 123,
        maxUnits: 456,
        paymentId: 'somePaymentId',
        type: PaymentType.IncomeDistribution,
      },
      staking: {
        '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.ClaimGuarantee,
          stakeId: 'someStakeId',
          denomination: PaymentDenomination.eEUR,
          depositAddress: 'someDepositAddress',
          minStake: 123,
          slashingCondition: SlashingCondition.FailedDispute,
          slashFactor: 456,
          maxSlashAmount: 789,
          unbondingPeriod: 10,
        },
        '9b1deb4x-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4x-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.InsuranceGuarantee,
          stakeId: 'someStakeId2',
          denomination: PaymentDenomination.eCHF,
          depositAddress: 'someDepositAddress2',
          minStake: 1230,
          slashingCondition: SlashingCondition.FailedProposal,
          slashFactor: 4560,
          maxSlashAmount: 7890,
          unbondingPeriod: 100,
        },
      },
      nodes: {
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          type: NodeType.RelayerNode,
          nodeId: 'someNodeId',
        },
        '1b9d6bef-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: '1b9d6bef-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          type: NodeType.IBCNode,
          nodeId: 'someNodeId2',
        },
      },
      funding: {
        '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: FundSource.NFTAsset,
          fundId: 'someOtherFundId',
        },
        '01debxy-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '01debxy-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: FundSource.PaymentContract,
          fundId: 'someOtherFundId2',
        },
      },
      key: {
        controllerId: 'someKeyControllerId',
        dateCreated: 'someKeyDateCreated',
        dateUpdated: 'someKeyDateUpdated',
        denomination: PaymentDenomination.eUSD,
        purpose: KeyPurpose.Identification,
        type: KeyType.Secp256k1VerificationKey2018,
      },
      service: {
        endpoint: 'someServiceEndpoint',
        otherParams: 'someServiceOtherParams',
        publicKey: 'someServicePublicKey',
        shortDescription: 'someServiceShortDescription',
        type: ServiceType.EthereumWeb3,
      },
      dataResources: {
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.SchemaOverlay,
          dataId: 'someDataId',
          resourceLocator: 'someResourceLocator',
          otherParams: 'someOtherParams',
        },
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.MobileIdentityWallet,
          dataId: 'someDataId2',
          resourceLocator: 'someResourceLocator2',
          otherParams: 'someOtherParams2',
        },
      },
    } as CreateEntityAdvancedState,
  }
})

describe('CreateEntityAdvanced Selectors', () => {
  describe('selectAdvanced', () => {
    it('should return the createEntityAdvanced property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectAdvanced(state)

      // then ... should return result as expected
      expect(result).toEqual(state.createEntityAdvanced)
    })
  })

  describe('selectLinkedEntity', () => {
    it('should return the linkedEntity property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectLinkedEntity(state)

      // then ... should return result as expected
      expect(result).toEqual({
        entityId: 'someEntityId',
        type: EntityType.Investment,
      })
    })
  })

  describe('selectPayment', () => {
    it('should return the payment property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectPayment(state)

      // then ... should return result as expected
      expect(result).toEqual({
        denomination: PaymentDenomination.eCHF,
        maxAmount: 123,
        maxUnits: 456,
        paymentId: 'somePaymentId',
        type: PaymentType.IncomeDistribution,
      })
    })
  })

  describe('selectStaking', () => {
    it('should return the staking property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectStaking(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.ClaimGuarantee,
          stakeId: 'someStakeId',
          denomination: PaymentDenomination.eEUR,
          depositAddress: 'someDepositAddress',
          minStake: 123,
          slashingCondition: SlashingCondition.FailedDispute,
          slashFactor: 456,
          maxSlashAmount: 789,
          unbondingPeriod: 10,
        },
        {
          id: '9b1deb4x-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.InsuranceGuarantee,
          stakeId: 'someStakeId2',
          denomination: PaymentDenomination.eCHF,
          depositAddress: 'someDepositAddress2',
          minStake: 1230,
          slashingCondition: SlashingCondition.FailedProposal,
          slashFactor: 4560,
          maxSlashAmount: 7890,
          unbondingPeriod: 100,
        },
      ])
    })
  })

  describe('selectNodes', () => {
    it('should return the nodes property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectNodes(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          type: NodeType.RelayerNode,
          nodeId: 'someNodeId',
        },
        {
          id: '1b9d6bef-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          type: NodeType.IBCNode,
          nodeId: 'someNodeId2',
        },
      ])
    })
  })

  describe('selectFunding', () => {
    it('should return the funding property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectFunding(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: FundSource.NFTAsset,
          fundId: 'someOtherFundId',
        },
        {
          id: '01debxy-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: FundSource.PaymentContract,
          fundId: 'someOtherFundId2',
        },
      ])
    })
  })

  describe('selectKey', () => {
    it('should return the key property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectKey(state)

      // then ... should return result as expected
      expect(result).toEqual({
        controllerId: 'someKeyControllerId',
        dateCreated: 'someKeyDateCreated',
        dateUpdated: 'someKeyDateUpdated',
        denomination: PaymentDenomination.eUSD,
        purpose: KeyPurpose.Identification,
        type: KeyType.Secp256k1VerificationKey2018,
      })
    })
  })

  describe('selectService', () => {
    it('should return the service property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectService(state)

      // then ... should return result as expected
      expect(result).toEqual({
        endpoint: 'someServiceEndpoint',
        otherParams: 'someServiceOtherParams',
        publicKey: 'someServicePublicKey',
        shortDescription: 'someServiceShortDescription',
        type: ServiceType.EthereumWeb3,
      })
    })
  })

  describe('selectDataResources', () => {
    it('should return the data resources property of createEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectDataResources(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.SchemaOverlay,
          dataId: 'someDataId',
          resourceLocator: 'someResourceLocator',
          otherParams: 'someOtherParams',
        },
        {
          id: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.MobileIdentityWallet,
          dataId: 'someDataId2',
          resourceLocator: 'someResourceLocator2',
          otherParams: 'someOtherParams2',
        },
      ])
    })
  })
})
