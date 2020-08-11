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
} from './types'

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
          [id]: {
            id,
            type: undefined,
            paymentId: undefined,
            denomination: undefined,
            maxAmount: undefined,
            maxUnits: undefined,
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
              denomination: PaymentDenomination.IXO,
              maxAmount: 1,
              maxUnits: 2,
            },
            ['anotherid']: {
              id: 'anotherid',
              type: PaymentType.OutcomePayment,
              paymentId: 'somePaymentId',
              denomination: PaymentDenomination.eCHF,
              maxAmount: 12,
              maxUnits: 22,
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
            denomination: PaymentDenomination.eCHF,
            maxAmount: 12,
            maxUnits: 22,
          },
        },
      })
    })

    it('should update the payment', () => {
      const id = 'someId'
      const type = PaymentType.FeeforService
      const paymentId = 'somePaymentId'
      const denomination = PaymentDenomination.eCHF
      const maxAmount = 123
      const maxUnits = 456

      // given .. we have an action of type CreateEntityAdvancedActions.UpdatePayment
      const action: UpdatePaymentAction = {
        type: CreateEntityAdvancedActions.UpdatePayment,
        payload: {
          id,
          type,
          paymentId,
          denomination,
          maxAmount,
          maxUnits,
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
              denomination: PaymentDenomination.eUSD,
              maxAmount: 1,
              maxUnits: 2,
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
            denomination,
            maxAmount,
            maxUnits,
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
          [id]: {
            id,
            type: undefined,
            stakeId: undefined,
            denomination: undefined,
            depositAddress: undefined,
            minStake: undefined,
            slashingCondition: undefined,
            slashFactor: undefined,
            maxSlashAmount: undefined,
            unbondingPeriod: undefined,
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
              denomination: PaymentDenomination.eEUR,
              depositAddress: 'someDepositAddress',
              minStake: 123,
              slashingCondition: SlashingCondition.FailedDispute,
              slashFactor: 456,
              maxSlashAmount: 789,
              unbondingPeriod: 10,
            },
            ['anotherid']: {
              id: 'anotherid',
              type: StakeType.InsuranceGuarantee,
              stakeId: 'someStakeId2',
              denomination: PaymentDenomination.eUSD,
              depositAddress: 'someDepositAddress2',
              minStake: 123,
              slashingCondition: SlashingCondition.FailedProposal,
              slashFactor: 456,
              maxSlashAmount: 789,
              unbondingPeriod: 10,
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
            denomination: PaymentDenomination.eUSD,
            depositAddress: 'someDepositAddress2',
            minStake: 123,
            slashingCondition: SlashingCondition.FailedProposal,
            slashFactor: 456,
            maxSlashAmount: 789,
            unbondingPeriod: 10,
          },
        },
      })
    })

    it('should update stake', () => {
      const id = 'someId'
      const type = StakeType.LoanGuarantee
      const stakeId = 'someNewStakeId'
      const denomination = PaymentDenomination.IXO
      const depositAddress = 'someNewDepositAddress'
      const minStake = 1234
      const slashingCondition = SlashingCondition.FailedSecurity
      const slashFactor = 4564
      const maxSlashAmount = 7894
      const unbondingPeriod = 104

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateStake
      const action: UpdateStakeAction = {
        type: CreateEntityAdvancedActions.UpdateStake,
        payload: {
          id,
          type,
          stakeId,
          denomination,
          depositAddress,
          minStake,
          slashingCondition,
          slashFactor,
          maxSlashAmount,
          unbondingPeriod,
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
              denomination: PaymentDenomination.eEUR,
              depositAddress: 'someDepositAddress',
              minStake: 123,
              slashingCondition: SlashingCondition.FailedDispute,
              slashFactor: 456,
              maxSlashAmount: 789,
              unbondingPeriod: 10,
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
            denomination,
            depositAddress,
            minStake,
            slashingCondition,
            slashFactor,
            maxSlashAmount,
            unbondingPeriod,
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
          [id]: {
            id,
            type: undefined,
            purpose: undefined,
            denomination: undefined,
            controllerId: undefined,
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
              denomination: PaymentDenomination.IXO,
              controllerId: 'someOldControllerId',
              dateCreated: 'someOldDateCreated',
              dateUpdated: 'someOldDateUpdated',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: KeyType.Ed25519VerificationKey2018,
              purpose: KeyPurpose.Identification,
              denomination: PaymentDenomination.IXO,
              controllerId: 'someControllerId',
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
            denomination: PaymentDenomination.IXO,
            controllerId: 'someControllerId',
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
      const denomination = PaymentDenomination.eCHF
      const controllerId = 'someControllerId'
      const dateCreated = 'someDateCreated'
      const dateUpdated = 'someDateUpdated'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateKey
      const action: UpdateKeyAction = {
        type: CreateEntityAdvancedActions.UpdateKey,
        payload: {
          id,
          type,
          purpose,
          denomination,
          controllerId,
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
              denomination: PaymentDenomination.eUSD,
              controllerId: 'someOldControllerId',
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
            denomination,
            controllerId,
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
          [id]: {
            id,
            type: undefined,
            shortDescription: undefined,
            endpoint: undefined,
            publicKey: undefined,
            otherParams: undefined,
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
              endpoint: 'someEndpoint',
              publicKey: 'somePublicKey',
              otherParams: 'someOtherParams',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: ServiceType.Web2,
              shortDescription: 'someOtherShortDescription',
              endpoint: 'someOtherEndpoint',
              publicKey: 'someOtherPublicKey',
              otherParams: 'someOtherOtherParams',
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
            endpoint: 'someOtherEndpoint',
            publicKey: 'someOtherPublicKey',
            otherParams: 'someOtherOtherParams',
          },
        },
      })
    })

    it('should update the service', () => {
      const id = 'someId'
      const type = ServiceType.DIDAgent
      const shortDescription = 'someShortDescription'
      const endpoint = 'someEndPoint'
      const publicKey = 'somePublicKey'
      const otherParams = 'someOtherParams'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateService
      const action: UpdateServiceAction = {
        type: CreateEntityAdvancedActions.UpdateService,
        payload: {
          id,
          type,
          shortDescription,
          endpoint,
          publicKey,
          otherParams,
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
              endpoint: 'someOldEndpoint',
              publicKey: 'someOldPublicKey',
              otherParams: 'someOldOtherParams',
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
            endpoint,
            publicKey,
            otherParams,
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
          [id]: {
            id,
            type: undefined,
            dataId: undefined,
            resourceLocator: undefined,
            otherParams: undefined,
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
              resourceLocator: 'someResourceLocator',
              otherParams: 'someOtherParams',
            },
            ['anotherid']: {
              id: 'anotherid',
              type: DataResourceType.MobileIdentityWallet,
              dataId: 'someDataId2',
              resourceLocator: 'someResourceLocator2',
              otherParams: 'someOtherParams2',
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
            resourceLocator: 'someResourceLocator2',
            otherParams: 'someOtherParams2',
          },
        },
      })
    })

    it('should update the data resource', () => {
      const id = 'someId'
      const type = DataResourceType.CellNodeDB
      const dataId = 'someDataId'
      const resourceLocator = 'someResourceLocator'
      const otherParams = 'someOtherParams'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateDataResource
      const action: UpdateDataResourceAction = {
        type: CreateEntityAdvancedActions.UpdateDataResource,
        payload: {
          id,
          type,
          dataId,
          resourceLocator,
          otherParams,
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
              resourceLocator: 'someOldResourceLocator',
              otherParams: 'someOldOtherParams',
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
            resourceLocator,
            otherParams,
          },
        },
      })
    })
  })
})
