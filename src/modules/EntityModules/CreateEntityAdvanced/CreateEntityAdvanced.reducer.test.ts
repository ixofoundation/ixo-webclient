import * as SUT from './CreateEntityAdvanced.reducer'
import {
  EntityType,
  PaymentType,
  PaymentDenomination,
  StakeType,
  SlashingCondition,
  NodeType,
  FundSource,
  KeyPurpose,
  KeyType,
  ServiceType,
  DataResourceType,
} from '../Entities/types'
import {
  UpdateLinkedEntityAction,
  CreateEntityAdvancedActions,
  UpdatePaymentAction,
  AddStakeSectionAction,
  RemoveStakeSectionAction,
  UpdateStakeAction,
  AddNodeSectionAction,
  RemoveNodeSectionAction,
  UpdateNodeAction,
  AddFundSectionAction,
  RemoveFundSectionAction,
  UpdateFundAction,
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
} from './types'
import { NewEntityAction, CreateEntityActions } from '../CreateEntity/types'

const initialState = SUT.initialState

describe('CreateEntityAdvanced Reducer', () => {
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

      // given ... we have an action of type CreateEntityAdvancedActions.AddLinkedEntity
      const action: AddLinkedEntitySectionAction = {
        type: CreateEntityAdvancedActions.AddLinkedEntity,
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
      // given ... we have an action of type CreateEntityAdvancedActions.RemoveLinkedEntity
      const action: RemoveLinkedEntitySectionAction = {
        type: CreateEntityAdvancedActions.RemoveLinkedEntity,
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

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateLinkedEntity
      const action: UpdateLinkedEntityAction = {
        type: CreateEntityAdvancedActions.UpdateLinkedEntity,
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
              type: EntityType.Data,
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

      // given ... we have an action of type CreateEntityAdvancedActions.AddPayment
      const action: AddPaymentSectionAction = {
        type: CreateEntityAdvancedActions.AddPayment,
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
            denom: undefined,
            maxFee: undefined,
            maxQty: undefined,
          },
        },
      })
    })

    it('should remove payment section', () => {
      const id = 'existingPaymentSectionId'
      // given ... we have an action of type CreateEntityAdvancedActions.RemovePayment
      const action: RemovePaymentSectionAction = {
        type: CreateEntityAdvancedActions.RemovePayment,
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
              denom: PaymentDenomination.IXO,
              maxFee: 1,
              maxQty: 2,
            },
            ['anotherid']: {
              id: 'anotherid',
              type: PaymentType.OutcomePayment,
              paymentId: 'somePaymentId',
              denom: PaymentDenomination.eCHF,
              maxFee: 12,
              maxQty: 22,
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
            denom: PaymentDenomination.eCHF,
            maxFee: 12,
            maxQty: 22,
          },
        },
      })
    })

    it('should update the payment', () => {
      const id = 'someId'
      const type = PaymentType.FeeforService
      const paymentId = 'somePaymentId'
      const denom = PaymentDenomination.eCHF
      const maxFee = 123
      const maxQty = 456

      // given .. we have an action of type CreateEntityAdvancedActions.UpdatePayment
      const action: UpdatePaymentAction = {
        type: CreateEntityAdvancedActions.UpdatePayment,
        payload: {
          id,
          type,
          paymentId,
          denom,
          maxFee,
          maxQty,
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
              denom: PaymentDenomination.eUSD,
              maxFee: 1,
              maxQty: 2,
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
            denom,
            maxFee,
            maxQty,
          },
        },
      })
    })
  })

  describe('Staking Actions', () => {
    it('should add a new stake section', () => {
      const id = 'someId'

      // given ... we have an action of type CreateEntityAdvancedActions.AddStake
      const action: AddStakeSectionAction = {
        type: CreateEntityAdvancedActions.AddStake,
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
      // given ... we have an action of type CreateEntityAdvancedActions.RemoveStake
      const action: RemoveStakeSectionAction = {
        type: CreateEntityAdvancedActions.RemoveStake,
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

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateStake
      const action: UpdateStakeAction = {
        type: CreateEntityAdvancedActions.UpdateStake,
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

      // given ... we have an action of type CreateEntityAdvancedActions.AddNode
      const action: AddNodeSectionAction = {
        type: CreateEntityAdvancedActions.AddNode,
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
      // given ... we have an action of type CreateEntityAdvancedActions.RemoveNode
      const action: RemoveNodeSectionAction = {
        type: CreateEntityAdvancedActions.RemoveNode,
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

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateNode
      const action: UpdateNodeAction = {
        type: CreateEntityAdvancedActions.UpdateNode,
        payload: {
          id,
          type,
          nodeId,
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
          },
        },
      })
    })
  })

  describe('Funding Actions', () => {
    it('should add a new funding section', () => {
      const id = 'someId'

      // given ... we have an action of type CreateEntityAdvancedActions.AddFund
      const action: AddFundSectionAction = {
        type: CreateEntityAdvancedActions.AddFund,
        payload: {
          id,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        funding: {
          ...initialState.funding,
          [id]: {
            id,
            source: undefined,
            fundId: undefined,
          },
        },
      })
    })

    it('should remove fund section', () => {
      const id = 'existingFundSectionId'
      // given ... we have an action of type CreateEntityAdvancedActions.RemoveFund
      const action: RemoveFundSectionAction = {
        type: CreateEntityAdvancedActions.RemoveFund,
        payload: {
          id,
        },
      }
      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          funding: {
            [id]: {
              id,
              source: FundSource.PaymentContract,
              fundId: 'someFundId',
            },
            ['anotherid']: {
              id: 'anotherid',
              source: FundSource.NFTAsset,
              fundId: 'someOtherFundId',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        funding: {
          ['anotherid']: {
            id: 'anotherid',
            source: FundSource.NFTAsset,
            fundId: 'someOtherFundId',
          },
        },
      })
    })

    it('should update fund', () => {
      const id = 'someId'
      const source = FundSource.PaymentContract
      const fundId = 'someNewFundId'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateFund
      const action: UpdateFundAction = {
        type: CreateEntityAdvancedActions.UpdateFund,
        payload: {
          id,
          source,
          fundId,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(
        {
          ...initialState,
          funding: {
            [id]: {
              id,
              source: FundSource.NFTAsset,
              fundId: 'someOldFundId',
            },
          },
        },
        action,
      )

      // then ... the state should be set as expected
      expect(result).toEqual({
        ...initialState,
        funding: {
          [id]: {
            id,
            source,
            fundId,
          },
        },
      })
    })
  })

  describe('Keys Actions', () => {
    it('should add a new key section', () => {
      const id = 'someId'

      // given ... we have an action of type CreateEntityAdvancedActions.AddKey
      const action: AddKeySectionAction = {
        type: CreateEntityAdvancedActions.AddKey,
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
      // given ... we have an action of type CreateEntityAdvancedActions.RemoveKey
      const action: RemoveKeySectionAction = {
        type: CreateEntityAdvancedActions.RemoveKey,
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
      const keyValue = PaymentDenomination.eCHF
      const signature = 'someSignature'
      const controller = 'someControllerId'
      const dateCreated = 'someDateCreated'
      const dateUpdated = 'someDateUpdated'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateKey
      const action: UpdateKeyAction = {
        type: CreateEntityAdvancedActions.UpdateKey,
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

      // given ... we have an action of type CreateEntityAdvancedActions.AddService
      const action: AddServiceSectionAction = {
        type: CreateEntityAdvancedActions.AddService,
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
      // given ... we have an action of type CreateEntityAdvancedActions.RemoveService
      const action: RemoveServiceSectionAction = {
        type: CreateEntityAdvancedActions.RemoveService,
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
            },
            ['anotherid']: {
              id: 'anotherid',
              type: ServiceType.Web2,
              shortDescription: 'someOtherShortDescription',
              serviceEndpoint: 'someOtherEndpoint',
              publicKey: 'someOtherPublicKey',
              properties: 'someOtherOtherParams',
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

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateService
      const action: UpdateServiceAction = {
        type: CreateEntityAdvancedActions.UpdateService,
        payload: {
          id,
          type,
          shortDescription,
          serviceEndpoint,
          publicKey,
          properties,
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
          },
        },
      })
    })
  })

  describe('DataResources Actions', () => {
    it('should add a new data resource section', () => {
      const id = 'someId'

      // given ... we have an action of type CreateEntityAdvancedActions.AddDataResource
      const action: AddDataResourceSectionAction = {
        type: CreateEntityAdvancedActions.AddDataResource,
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
      const id = 'existingFundSectionId'
      // given ... we have an action of type CreateEntityAdvancedActions.RemoveDataResource
      const action: RemoveDataResourceSectionAction = {
        type: CreateEntityAdvancedActions.RemoveDataResource,
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

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateDataResource
      const action: UpdateDataResourceAction = {
        type: CreateEntityAdvancedActions.UpdateDataResource,
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
      // given ... we have an action of type CreateEntityPageContentActions.SetValidated
      const action: ValidatedAction = {
        type: CreateEntityAdvancedActions.Validated,
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
    // given ... we have an action of type CreateEntityPageContentActions.SetValidated
    const action: ValidationErrorAction = {
      type: CreateEntityAdvancedActions.ValidationError,
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
      // given ... we have an action of type CreateEntityActions.NewEntity
      const action: NewEntityAction = {
        type: CreateEntityActions.NewEntity,
        payload: {
          entityType: EntityType.Cell,
        },
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
