import * as SUT from './editEntityAdvanced.selectors'
import {
  EntityType,
  PaymentDenomination,
  PaymentType,
  StakeType,
  SlashingCondition,
  NodeType,
  LiquiditySource,
  KeyPurpose,
  KeyType,
  ServiceType,
  DataResourceType,
} from '../../types/entities'

let state: any

beforeEach(() => {
  state = {
    editEntityAdvanced: {
      linkedEntities: {
        '9b1deb4d-3b7d-4bad-9abc-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4bad-9abc-2b0d7b3dcb6d',
          entityId: 'someEntityId',
          type: EntityType.Investment,
        },
        '9b1deb4d-3b7d-4ggg-9abc-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4ggg-9abc-2b0d7b3dcb6d',
          entityId: 'someEntityId',
          type: EntityType.Investment,
        },
      },
      payments: {
        '9b1deb4d-3hhh-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3hhh-4bad-9bdd-2b0d7b3dcb6d',
          paymentId: 'somePaymentId',
          type: PaymentType.IncomeDistribution,
        },
        '9b1deb4d-3aaa-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3aaa-4bad-9bdd-2b0d7b3dcb6d',
          paymentId: 'somePaymentId',
          type: PaymentType.IncomeDistribution,
        },
      },
      staking: {
        '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.ClaimGuarantee,
          stakeId: 'someStakeId',
          denom: PaymentDenomination.eEUR,
          stakeAddress: 'someDepositAddress',
          minStake: 123,
          slashCondition: SlashingCondition.FailedDispute,
          slashFactor: 456,
          slashAmount: 789,
          unbondPeriod: 10,
        },
        '9b1deb4x-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4x-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.InsuranceGuarantee,
          stakeId: 'someStakeId2',
          denom: PaymentDenomination.eCHF,
          stakeAddress: 'someDepositAddress2',
          minStake: 1230,
          slashCondition: SlashingCondition.FailedProposal,
          slashFactor: 4560,
          slashAmount: 7890,
          unbondPeriod: 100,
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
      liquidity: {
        '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: LiquiditySource.NFTAsset,
          liquidityId: 'someOtherLiquidityId',
        },
        '01debxy-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '01debxy-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: LiquiditySource.PaymentContract,
          liquidityId: 'someOtherLiquidityId2',
        },
      },
      keys: {
        '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          controller: 'someKeyControllerId',
          dateCreated: 'someKeyDateCreated',
          dateUpdated: 'someKeyDateUpdated',
          keyValue: 'someKeyValue',
          purpose: KeyPurpose.Identification,
          type: KeyType.Secp256k1VerificationKey2018,
          signature: 'someSignature',
        },
        '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dgggg': {
          id: '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dgggg',
          controller: 'someKeyControllerId',
          dateCreated: 'someKeyDateCreated',
          dateUpdated: 'someKeyDateUpdated',
          keyValue: 'someKeyValue',
          purpose: KeyPurpose.Identification,
          type: KeyType.Secp256k1VerificationKey2018,
          signature: 'someSignature',
        },
      },
      services: {
        '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dcb6d': {
          id: '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dcb6d',
          serviceEndpoint: 'someServiceEndpoint',
          properties: 'someServiceOtherParams',
          publicKey: 'someServicePublicKey',
          shortDescription: 'someServiceShortDescription',
          type: ServiceType.EthereumWeb3,
          serviceId: 'someServiceId',
        },
        '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dxxxx': {
          id: '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dxxxx',
          serviceEndpoint: 'someServiceEndpoint2',
          properties: 'someServiceOtherParams2',
          publicKey: 'someServicePublicKe2y',
          shortDescription: 'someServiceShortDescription',
          type: ServiceType.DIDAgent,
          serviceId: 'someServiceOtherId',
        },
      },
      dataResources: {
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.SchemaOverlay,
          dataId: 'someDataId',
          serviceEndpoint: 'someResourceLocator',
          properties: 'someOtherParams',
        },
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.MobileIdentityWallet,
          dataId: 'someDataId2',
          serviceEndpoint: 'someResourceLocator2',
          properties: 'someOtherParams2',
        },
      },
      validation: {
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: false,
          errors: ['error1', 'error2'],
        },
      },
    } as any,
  }
})

describe('EditEntityAdvanced Selectors', () => {
  describe('selectAdvanced', () => {
    it('should return the editEntityAdvanced property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectAdvanced(state)

      // then ... should return result as expected
      expect(result).toEqual(state.editEntityAdvanced)
    })
  })

  describe('selectLinkedEntities', () => {
    it('should return the linkedEntities property of editEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectLinkedEntities(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '9b1deb4d-3b7d-4bad-9abc-2b0d7b3dcb6d',
          entityId: 'someEntityId',
          type: EntityType.Investment,
        },
        {
          id: '9b1deb4d-3b7d-4ggg-9abc-2b0d7b3dcb6d',
          entityId: 'someEntityId',
          type: EntityType.Investment,
        },
      ])
    })
  })

  describe('selectPayments', () => {
    it('should return the payments property of editEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectPayments(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '9b1deb4d-3hhh-4bad-9bdd-2b0d7b3dcb6d',
          paymentId: 'somePaymentId',
          type: PaymentType.IncomeDistribution,
        },
        {
          id: '9b1deb4d-3aaa-4bad-9bdd-2b0d7b3dcb6d',
          paymentId: 'somePaymentId',
          type: PaymentType.IncomeDistribution,
        },
      ])
    })
  })

  describe('selectStaking', () => {
    it('should return the staking property of editEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectStaking(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.ClaimGuarantee,
          stakeId: 'someStakeId',
          denom: PaymentDenomination.eEUR,
          stakeAddress: 'someDepositAddress',
          minStake: 123,
          slashCondition: SlashingCondition.FailedDispute,
          slashFactor: 456,
          slashAmount: 789,
          unbondPeriod: 10,
        },
        {
          id: '9b1deb4x-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: StakeType.InsuranceGuarantee,
          stakeId: 'someStakeId2',
          denom: PaymentDenomination.eCHF,
          stakeAddress: 'someDepositAddress2',
          minStake: 1230,
          slashCondition: SlashingCondition.FailedProposal,
          slashFactor: 4560,
          slashAmount: 7890,
          unbondPeriod: 100,
        },
      ])
    })
  })

  describe('selectNodes', () => {
    it('should return the nodes property of editEntityAdvanced state', () => {
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

  describe('selectLiquidity', () => {
    it('should return the liquidity property of editEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectLiquidity(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: LiquiditySource.NFTAsset,
          liquidityId: 'someOtherLiquidityId',
        },
        {
          id: '01debxy-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          source: LiquiditySource.PaymentContract,
          liquidityId: 'someOtherLiquidityId2',
        },
      ])
    })
  })

  describe('selectKeys', () => {
    it('should return the keys property of editEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectKeys(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          controller: 'someKeyControllerId',
          dateCreated: 'someKeyDateCreated',
          dateUpdated: 'someKeyDateUpdated',
          keyValue: 'someKeyValue',
          signature: 'someSignature',
          purpose: KeyPurpose.Identification,
          type: KeyType.Secp256k1VerificationKey2018,
        },
        {
          id: '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dgggg',
          controller: 'someKeyControllerId',
          dateCreated: 'someKeyDateCreated',
          dateUpdated: 'someKeyDateUpdated',
          keyValue: 'someKeyValue',
          signature: 'someSignature',
          purpose: KeyPurpose.Identification,
          type: KeyType.Secp256k1VerificationKey2018,
        },
      ])
    })
  })

  describe('selectServices', () => {
    it('should return the services property of editEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectServices(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dcb6d',
          serviceEndpoint: 'someServiceEndpoint',
          properties: 'someServiceOtherParams',
          publicKey: 'someServicePublicKey',
          shortDescription: 'someServiceShortDescription',
          type: ServiceType.EthereumWeb3,
          serviceId: 'someServiceId',
        },
        {
          id: '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dxxxx',
          serviceEndpoint: 'someServiceEndpoint2',
          properties: 'someServiceOtherParams2',
          publicKey: 'someServicePublicKe2y',
          shortDescription: 'someServiceShortDescription',
          type: ServiceType.DIDAgent,
          serviceId: 'someServiceOtherId',
        },
      ])
    })
  })

  describe('selectDataResources', () => {
    it('should return the data resources property of editEntityAdvanced state', () => {
      // when ... we call the selector
      const result = SUT.selectDataResources(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.SchemaOverlay,
          dataId: 'someDataId',
          serviceEndpoint: 'someResourceLocator',
          properties: 'someOtherParams',
        },
        {
          id: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: DataResourceType.MobileIdentityWallet,
          dataId: 'someDataId2',
          serviceEndpoint: 'someResourceLocator2',
          properties: 'someOtherParams2',
        },
      ])
    })
  })
  describe('selectValidation', () => {
    it('should return the validation property', () => {
      // when ... we call the selector
      const result = SUT.selectValidation(state)

      // then ... should return result as expected
      expect(result).toEqual({
        '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: false,
          errors: ['error1', 'error2'],
        },
      })
    })
  })

  describe('selectValidationComplete', () => {
    it('should return false if not every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityAdvanced: {
          ...state.editEntityAdvanced,
          validation: {
            '9b1deb4d-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '9b1deb4d-3b7d-4ggg-9abc-2b0d7b3dcb6d': {},
            '9b1deb4d-3hhh-4bad-9bdd-2b0d7b3dcb6d': {},
            '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('should return true if every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        editEntityAdvanced: {
          ...state.editEntityAdvanced,
          validation: {
            '9b1deb4d-3b7d-4bad-9abc-2b0d7b3dcb6d': {},
            '9b1deb4d-3b7d-4ggg-9abc-2b0d7b3dcb6d': {},
            '9b1deb4d-3hhh-4bad-9bdd-2b0d7b3dcb6d': {},
            '9b1deb4d-3aaa-4bad-9bdd-2b0d7b3dcb6d': {},
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '9b1deb4x-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            '1b9d6bef-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            '01deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '01debxy-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '8c1dejjj-3b7d-4bad-9bdd-2b0d7b3dgggg': {},
            '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dcb6d': {},
            '8c1debff-3b7d-4yasy-9bdd-2b0d7b3dxxxx': {},
            '8c1debff-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '8c1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
