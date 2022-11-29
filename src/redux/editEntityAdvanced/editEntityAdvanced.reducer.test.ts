import * as SUT from './editEntityAdvanced.reducer'
import {
  EntityType,
  PaymentType,
  PaymentDenomination,
  StakeType,
  SlashingCondition,
  NodeType,
  LiquiditySource,
  KeyPurpose,
  KeyType,
  ServiceType,
  DataResourceType,
} from '../../modules/Entities/types'
import {
  UpdateLinkedEntityAction,
  EditEntityAdvancedActions,
  UpdatePaymentAction,
  AddStakeSectionAction,
  RemoveStakeSectionAction,
  UpdateStakeAction,
  AddNodeSectionAction,
  RemoveNodeSectionAction,
  UpdateNodeAction,
  AddLiquiditySectionAction,
  RemoveLiquiditySectionAction,
  UpdateLiquidityAction,
  UpdateKeyAction,
  UpdateServiceAction,
  AddDataResourceSectionAction,
  RemoveDataResourceSectionAction,
  UpdateDataResourceAction,
  AddServiceSectionAction,
  RemoveServiceSectionAction,
  RemoveLinkedEntitySectionAction,
  AddLinkedEntitySectionAction,
  AddPaymentSectionAction,
  RemovePaymentSectionAction,
  AddKeySectionAction,
  RemoveKeySectionAction,
  ValidatedAction,
  ValidationErrorAction,
} from './editEntityAdvanced.types'
import { NewEntityAction, EditEntityActions, EditEntitySuccessAction } from '../editEntity/editEntity.types'

const initialState = SUT.initialState

describe('EditEntityAdvanced Reducer', () => {
  it('should return the same state if an action is called on it which is not handled by the reducer', () => {
    // given .. we have an action the reducer does not handle
    const action: any = 'foo'

    // when ... we run the reducer with this action
    const result = SUT.reducer(initialState, action)

    // then ... the state that was passed into the function should be returned
    expect(result).toEqual(initialState)
  })

  describe('LinkedEntities Actions', () => {
    it('should add a new linkedEntity section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddLinkedEntity
      const action: AddLinkedEntitySectionAction = {
        type: EditEntityAdvancedActions.AddLinkedEntity,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        linkedEntities: {
          ...initialState.linkedEntities,
          [id]: {
            id,
            type: undefined,
            entityId: undefined,
          },
        },
      })
    })

    it('should remove linked entity section', () => {
      const id = 'existingSectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemoveLinkedEntity
      const action: RemoveLinkedEntitySectionAction = {
        type: EditEntityAdvancedActions.RemoveLinkedEntity,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          linkedEntities: {
            [id]: {
              id,
              type: EntityType.Investment,
              entityId: 'someEntityId',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: EntityType.Project,
              entityId: 'someEntityId2',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        linkedEntities: {
          ['anotherid']: {
            id: 'anotherid',
            type: EntityType.Project,
            entityId: 'someEntityId2',
          },
        },
      })
    })

    it('should update the linkedEntity', () => {
      const id = 'someId'
      const type = EntityType.Investment
      const entityId = 'someEntityId'

      // given .. we have an action of type EditEntityAdvancedActions.UpdateLinkedEntity
      const action: UpdateLinkedEntityAction = {
        type: EditEntityAdvancedActions.UpdateLinkedEntity,
        payload: {
          id,
          entityId,
          type,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          linkedEntities: {
            [id]: {
              id,
              type: EntityType.Asset,
              entityId: 'someOldLinkedEntityId',
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        linkedEntities: {
          [id]: {
            id,
            type,
            entityId,
          },
        },
      })
    })
  })

  describe('Payments Actions', () => {
    it('should add a new payment section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddPayment
      const action: AddPaymentSectionAction = {
        type: EditEntityAdvancedActions.AddPayment,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        payments: {
          ...initialState.payments,
          [id]: {
            id,
            type: undefined,
            paymentId: undefined,
          },
        },
      })
    })

    it('should remove payment section', () => {
      const id = 'existingPaymentSectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemovePayment
      const action: RemovePaymentSectionAction = {
        type: EditEntityAdvancedActions.RemovePayment,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          payments: {
            [id]: {
              id,
              type: PaymentType.LoanRepayment,
              paymentId: 'someOldPaymentId',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: PaymentType.OutcomePayment,
              paymentId: 'somePaymentId',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        payments: {
          ['anotherid']: {
            id: 'anotherid',
            type: PaymentType.OutcomePayment,
            paymentId: 'somePaymentId',
          },
        },
      })
    })

    it('should update the payment', () => {
      const id = 'someId'
      const type = PaymentType.FeeForService
      const paymentId = 'somePaymentId'

      // given .. we have an action of type EditEntityAdvancedActions.UpdatePayment
      const action: UpdatePaymentAction = {
        type: EditEntityAdvancedActions.UpdatePayment,
        payload: {
          id,
          type,
          paymentId,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          payments: {
            [id]: {
              id,
              type: PaymentType.IncomeDistribution,
              paymentId: 'someOldPaymentId',
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        payments: {
          [id]: {
            id,
            type,
            paymentId,
          },
        },
      })
    })
  })

  describe('Staking Actions', () => {
    it('should add a new stake section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddStake
      const action: AddStakeSectionAction = {
        type: EditEntityAdvancedActions.AddStake,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        staking: {
          ...initialState.staking,
          [id]: {
            id,
            type: undefined,
            stakeId: undefined,
            denom: undefined,
            stakeAddress: undefined,
            minStake: undefined,
            slashCondition: undefined,
            slashFactor: undefined,
            slashAmount: undefined,
            unbondPeriod: undefined,
          },
        },
      })
    })

    it('should remove stake section', () => {
      const id = 'existingStakeSectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemoveStake
      const action: RemoveStakeSectionAction = {
        type: EditEntityAdvancedActions.RemoveStake,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          staking: {
            [id]: {
              id,
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
            ['anotherid']: {
              id: 'anotherid',
              type: StakeType.InsuranceGuarantee,
              stakeId: 'someStakeId2',
              denom: PaymentDenomination.eUSD,
              stakeAddress: 'someDepositAddress2',
              minStake: 123,
              slashCondition: SlashingCondition.FailedProposal,
              slashFactor: 456,
              slashAmount: 789,
              unbondPeriod: 10,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        staking: {
          ['anotherid']: {
            id: 'anotherid',
            type: StakeType.InsuranceGuarantee,
            stakeId: 'someStakeId2',
            denom: PaymentDenomination.eUSD,
            stakeAddress: 'someDepositAddress2',
            minStake: 123,
            slashCondition: SlashingCondition.FailedProposal,
            slashFactor: 456,
            slashAmount: 789,
            unbondPeriod: 10,
          },
        },
      })
    })

    it('should update stake', () => {
      const id = 'someId'
      const type = StakeType.LoanGuarantee
      const stakeId = 'someNewStakeId'
      const denom = PaymentDenomination.IXO
      const stakeAddress = 'someNewDepositAddress'
      const minStake = 1234
      const slashCondition = SlashingCondition.FailedSecurity
      const slashFactor = 4564
      const slashAmount = 7894
      const unbondPeriod = 104

      // given .. we have an action of type EditEntityAdvancedActions.UpdateStake
      const action: UpdateStakeAction = {
        type: EditEntityAdvancedActions.UpdateStake,
        payload: {
          id,
          type,
          stakeId,
          denom,
          stakeAddress,
          minStake,
          slashCondition,
          slashFactor,
          slashAmount,
          unbondPeriod,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          staking: {
            [id]: {
              id,
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
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        staking: {
          [id]: {
            id,
            type,
            stakeId,
            denom,
            stakeAddress,
            minStake,
            slashCondition,
            slashFactor,
            slashAmount,
            unbondPeriod,
          },
        },
      })
    })
  })

  describe('Node Actions', () => {
    it('should add a new node section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddNode
      const action: AddNodeSectionAction = {
        type: EditEntityAdvancedActions.AddNode,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        nodes: {
          ...initialState.nodes,
          [id]: {
            id,
            type: undefined,
            nodeId: undefined,
          },
        },
      })
    })

    it('should remove node section', () => {
      const id = 'existingNodeSectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemoveNode
      const action: RemoveNodeSectionAction = {
        type: EditEntityAdvancedActions.RemoveNode,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          nodes: {
            [id]: {
              id,
              type: NodeType.RelayerNode,
              nodeId: 'someNodeId',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: NodeType.IBCNode,
              nodeId: 'someNodeId2',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        nodes: {
          ['anotherid']: {
            id: 'anotherid',
            type: NodeType.IBCNode,
            nodeId: 'someNodeId2',
          },
        },
      })
    })

    it('should update node', () => {
      const id = 'someId'
      const type = NodeType.CellNode
      const nodeId = 'someNewNodeId'
      const serviceEndpoint = 'someServiceEndpoint'

      // given .. we have an action of type EditEntityAdvancedActions.UpdateNode
      const action: UpdateNodeAction = {
        type: EditEntityAdvancedActions.UpdateNode,
        payload: {
          id,
          type,
          nodeId,
          serviceEndpoint,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          nodes: {
            [id]: {
              id,
              type: NodeType.IBCNode,
              serviceEndpoint: 'someServiceEndpoint',
              nodeId: 'someNewNodeId',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        nodes: {
          [id]: {
            id,
            type,
            nodeId,
            serviceEndpoint,
          },
        },
      })
    })
  })

  describe('liquidity Actions', () => {
    it('should add a new liquidity section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddLiquidity
      const action: AddLiquiditySectionAction = {
        type: EditEntityAdvancedActions.AddLiquidity,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        liquidity: {
          ...initialState.liquidity,
          [id]: {
            id,
            source: undefined,
            liquidityId: undefined,
          },
        },
      })
    })

    it('should remove liquidity section', () => {
      const id = 'existingLiquiditySectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemoveLiquidity
      const action: RemoveLiquiditySectionAction = {
        type: EditEntityAdvancedActions.RemoveLiquidity,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          liquidity: {
            [id]: {
              id,
              source: LiquiditySource.PaymentContract,
              liquidityId: 'someLiquidityId',
            },
            ['anotherid']: {
              id: 'anotherid',
              source: LiquiditySource.NFTAsset,
              liquidityId: 'someOtherLiquidityId',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        liquidity: {
          ['anotherid']: {
            id: 'anotherid',
            source: LiquiditySource.NFTAsset,
            liquidityId: 'someOtherLiquidityId',
          },
        },
      })
    })

    it('should update liquidity', () => {
      const id = 'someId'
      const source = LiquiditySource.PaymentContract
      const liquidityId = 'someNewLiquidityId'

      // given .. we have an action of type EditEntityAdvancedActions.UpdateLiquidity
      const action: UpdateLiquidityAction = {
        type: EditEntityAdvancedActions.UpdateLiquidity,
        payload: {
          id,
          source,
          liquidityId,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          liquidity: {
            [id]: {
              id,
              source: LiquiditySource.NFTAsset,
              liquidityId: 'someOldLiquidityId',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        liquidity: {
          [id]: {
            id,
            source,
            liquidityId,
          },
        },
      })
    })
  })

  describe('Keys Actions', () => {
    it('should add a new key section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddKey
      const action: AddKeySectionAction = {
        type: EditEntityAdvancedActions.AddKey,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        keys: {
          ...initialState.keys,
          [id]: {
            id,
            type: undefined,
            purpose: undefined,
            keyValue: undefined,
            controller: undefined,
            dateCreated: undefined,
            dateUpdated: undefined,
          },
        },
      })
    })

    it('should remove key section', () => {
      const id = 'existingSectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemoveKey
      const action: RemoveKeySectionAction = {
        type: EditEntityAdvancedActions.RemoveKey,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          keys: {
            [id]: {
              id,
              type: KeyType.Secp256k1VerificationKey2018,
              purpose: KeyPurpose.Identification,
              keyValue: 'someOldKeyValue',
              signature: 'someOldSignature',
              controller: 'someOldControllerId',
              dateCreated: 'someOldDateCreated',
              dateUpdated: 'someOldDateUpdated',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: KeyType.Ed25519VerificationKey2018,
              purpose: KeyPurpose.Identification,
              keyValue: 'someKeyValue',
              signature: 'someSignature',
              controller: 'someControllerId',
              dateCreated: 'someDateCreated',
              dateUpdated: 'someDateUpdated',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        keys: {
          ['anotherid']: {
            id: 'anotherid',
            type: KeyType.Ed25519VerificationKey2018,
            purpose: KeyPurpose.Identification,
            keyValue: 'someKeyValue',
            signature: 'someSignature',
            controller: 'someControllerId',
            dateCreated: 'someDateCreated',
            dateUpdated: 'someDateUpdated',
          },
        },
      })
    })

    it('should update the key', () => {
      const id = 'someId'
      const type = KeyType.JwsVerificationKey2020
      const purpose = KeyPurpose.Encryption
      const keyValue = 'someKeyValue'
      const signature = 'someSignature'
      const controller = 'someControllerId'
      const dateCreated = 'someDateCreated'
      const dateUpdated = 'someDateUpdated'

      // given .. we have an action of type EditEntityAdvancedActions.UpdateKey
      const action: UpdateKeyAction = {
        type: EditEntityAdvancedActions.UpdateKey,
        payload: {
          id,
          type,
          purpose,
          keyValue,
          signature,
          controller,
          dateCreated,
          dateUpdated,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          keys: {
            [id]: {
              id,
              type: KeyType.JwsVerificationKey2020,
              purpose: KeyPurpose.Verification,
              keyValue: 'someOldKeyValue',
              signature: 'someOldSignature',
              controller: 'someOldControllerId',
              dateCreated: 'someOldDateCreated',
              dateUpdated: 'someOldDateUpdated',
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        keys: {
          [id]: {
            id,
            type,
            purpose,
            keyValue,
            signature,
            controller,
            dateCreated,
            dateUpdated,
          },
        },
      })
    })
  })

  describe('Service Actions', () => {
    it('should add a new service section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddService
      const action: AddServiceSectionAction = {
        type: EditEntityAdvancedActions.AddService,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        services: {
          ...initialState.services,
          [id]: {
            id,
            type: undefined,
            shortDescription: undefined,
            serviceEndpoint: undefined,
            publicKey: undefined,
            properties: undefined,
          },
        },
      })
    })

    it('should remove service section', () => {
      const id = 'existingSectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemoveService
      const action: RemoveServiceSectionAction = {
        type: EditEntityAdvancedActions.RemoveService,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          services: {
            [id]: {
              id,
              type: ServiceType.EthereumWeb3,
              shortDescription: 'someShortDescription',
              serviceEndpoint: 'someEndpoint',
              publicKey: 'somePublicKey',
              properties: 'someOtherParams',
              serviceId: 'someServiceId',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: ServiceType.Web2,
              shortDescription: 'someOtherShortDescription',
              serviceEndpoint: 'someOtherEndpoint',
              publicKey: 'someOtherPublicKey',
              properties: 'someOtherOtherParams',
              serviceId: 'someOtherServiceId',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        services: {
          ['anotherid']: {
            id: 'anotherid',
            type: ServiceType.Web2,
            shortDescription: 'someOtherShortDescription',
            serviceEndpoint: 'someOtherEndpoint',
            publicKey: 'someOtherPublicKey',
            properties: 'someOtherOtherParams',
            serviceId: 'someOtherServiceId',
          },
        },
      })
    })

    it('should update the service', () => {
      const id = 'someId'
      const type = ServiceType.DIDAgent
      const shortDescription = 'someShortDescription'
      const serviceEndpoint = 'someEndPoint'
      const publicKey = 'somePublicKey'
      const properties = 'someOtherParams'
      const serviceId = 'someServiceId'

      // given .. we have an action of type EditEntityAdvancedActions.UpdateService
      const action: UpdateServiceAction = {
        type: EditEntityAdvancedActions.UpdateService,
        payload: {
          id,
          type,
          shortDescription,
          serviceEndpoint,
          publicKey,
          properties,
          serviceId,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          services: {
            [id]: {
              id,
              type: ServiceType.EthereumWeb3,
              shortDescription: 'someOldShortDescription',
              serviceEndpoint: 'someOldEndpoint',
              publicKey: 'someOldPublicKey',
              properties: 'someOldOtherParams',
              serviceId: 'someOldServiceId',
            },
          },
        },
        action,
      )

      expect(result).toEqual({
        ...initialState,
        services: {
          [id]: {
            id,
            type,
            shortDescription,
            serviceEndpoint,
            publicKey,
            properties,
            serviceId,
          },
        },
      })
    })
  })

  describe('DataResources Actions', () => {
    it('should add a new data resource section', () => {
      const id = 'someId'

      // given ... we have an action of type EditEntityAdvancedActions.AddDataResource
      const action: AddDataResourceSectionAction = {
        type: EditEntityAdvancedActions.AddDataResource,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        dataResources: {
          ...initialState.dataResources,
          [id]: {
            id,
            type: undefined,
            dataId: undefined,
            serviceEndpoint: undefined,
            properties: undefined,
          },
        },
      })
    })

    it('should remove data resource section', () => {
      const id = 'existingLiquiditySectionId'
      // given ... we have an action of type EditEntityAdvancedActions.RemoveDataResource
      const action: RemoveDataResourceSectionAction = {
        type: EditEntityAdvancedActions.RemoveDataResource,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          dataResources: {
            [id]: {
              id,
              type: DataResourceType.CellNodeDB,
              dataId: 'someDataId',
              serviceEndpoint: 'someResourceLocator',
              properties: 'someOtherParams',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: DataResourceType.MobileIdentityWallet,
              dataId: 'someDataId2',
              serviceEndpoint: 'someResourceLocator2',
              properties: 'someOtherParams2',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        dataResources: {
          ['anotherid']: {
            id: 'anotherid',
            type: DataResourceType.MobileIdentityWallet,
            dataId: 'someDataId2',
            serviceEndpoint: 'someResourceLocator2',
            properties: 'someOtherParams2',
          },
        },
      })
    })

    it('should update the data resource', () => {
      const id = 'someId'
      const type = DataResourceType.CellNodeDB
      const dataId = 'someDataId'
      const serviceEndpoint = 'someResourceLocator'
      const properties = 'someOtherParams'

      // given .. we have an action of type EditEntityAdvancedActions.UpdateDataResource
      const action: UpdateDataResourceAction = {
        type: EditEntityAdvancedActions.UpdateDataResource,
        payload: {
          id,
          type,
          dataId,
          serviceEndpoint,
          properties,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          dataResources: {
            [id]: {
              id,
              type: DataResourceType.PersonalDataPod,
              dataId: 'someOldDataId',
              serviceEndpoint: 'someOldResourceLocator',
              properties: 'someOldOtherParams',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        dataResources: {
          [id]: {
            id,
            type,
            dataId,
            serviceEndpoint,
            properties,
          },
        },
      })
    })
  })

  describe('validation', () => {
    it('should set validated to true and clear any errors', () => {
      const identifier = 'someBodySectionId'
      const errors = ['error1', 'error2']
      // given ... we have an action of type EditEntityPageContentActions.SetValidated
      const action: ValidatedAction = {
        type: EditEntityAdvancedActions.Validated,
        payload: {
          identifier,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          validation: {
            [identifier]: {
              identifier,
              validated: false,
              errors,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      })
    })
  })

  it('should set validated to false and add any errors', () => {
    const identifier = 'someBodySectionId'
    const errors = ['error1', 'error2']
    // given ... we have an action of type EditEntityPageContentActions.SetValidated
    const action: ValidationErrorAction = {
      type: EditEntityAdvancedActions.ValidationError,
      payload: {
        errors,
        identifier,
      },
    }

    // when ... we run the reducer with this action
    const result = SUT.reducer(
      {
        ...initialState,
        validation: {
          [identifier]: {
            identifier,
            validated: true,
            errors: [],
          },
        },
      },
      action,
    )

    // then ... the state should be set as expected
    expect(result).toEqual({
      ...initialState,
      validation: {
        [identifier]: {
          identifier,
          validated: false,
          errors,
        },
      },
    })
  })

  describe('NewEntity Actions', () => {
    it('should return initial state if a new entity action type is received', () => {
      // given ... we have an action of type EditEntityActions.NewEntity
      const action: NewEntityAction = {
        type: EditEntityActions.NewEntity,
        payload: {
          entityType: EntityType.Dao,
        } as any,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          nodes: {
            ['someNodeId']: {
              id: 'someNodeId',
              nodeId: 'someNodeId',
              type: NodeType.IBCNode,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })

  describe('EditEntitySuccess Actions', () => {
    it('should return initial state if a EditEntitySuccess type is received', () => {
      // given ... we have an action of type EditEntityActions.EditEntitySuccess
      const action: EditEntitySuccessAction = {
        type: EditEntityActions.EditEntitySuccess,
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          nodes: {
            ['someNodeId']: {
              id: 'someNodeId',
              nodeId: 'someNodeId',
              type: NodeType.IBCNode,
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual(initialState)
    })
  })
})
