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

  describe('LinkedEntity Actions', () => {
    it('should update the linkedEntity', () => {
      const type = EntityType.Investment
      const entityId = 'someEntityId'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateLinkedEntity
      const action: UpdateLinkedEntityAction = {
        type: CreateEntityAdvancedActions.UpdateLinkedEntity,
        payload: {
          entityId,
          type,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        linkedEntity: {
          type,
          entityId,
        },
      })
    })
  })

  describe('Payment Actions', () => {
    it('should update the payment', () => {
      const type = PaymentType.FeeforService
      const paymentId = 'somePaymentId'
      const denomination = PaymentDenomination.eCHF
      const maxAmount = 123
      const maxUnits = 456

      // given .. we have an action of type CreateEntityAdvancedActions.UpdatePayment
      const action: UpdatePaymentAction = {
        type: CreateEntityAdvancedActions.UpdatePayment,
        payload: {
          type,
          paymentId,
          denomination,
          maxAmount,
          maxUnits,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        payment: {
          type,
          paymentId,
          denomination,
          maxAmount,
          maxUnits,
        },
      })
    })
  })

  describe('Staking Actions', () => {
    it('should add a new stake section', () => {
      const id = 'someId'
      const type = StakeType.ClaimGuarantee
      const stakeId = 'someStakeId'
      const denomination = PaymentDenomination.eEUR
      const depositAddress = 'someDepositAddress'
      const minStake = 123
      const slashingCondition = SlashingCondition.FailedDispute
      const slashFactor = 456
      const maxSlashAmount = 789
      const unbondingPeriod = 10

      // given ... we have an action of type CreateEntityAdvancedActions.AddStake
      const action: AddStakeSectionAction = {
        type: CreateEntityAdvancedActions.AddStake,
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
      const result = SUT.reducer(initialState, action)

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
      const type = NodeType.RelayerNode
      const nodeId = 'someNodeId'

      // given ... we have an action of type CreateEntityAdvancedActions.AddNode
      const action: AddNodeSectionAction = {
        type: CreateEntityAdvancedActions.AddNode,
        payload: {
          id,
          type,
          nodeId,
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
            type,
            nodeId,
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
      const source = FundSource.NFTAsset
      const fundId = 'someFundId'

      // given ... we have an action of type CreateEntityAdvancedActions.AddFund
      const action: AddFundSectionAction = {
        type: CreateEntityAdvancedActions.AddFund,
        payload: {
          id,
          source,
          fundId,
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
            source,
            fundId,
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

  describe('Key Actions', () => {
    it('should update the key', () => {
      const purpose = KeyPurpose.Encryption
      const type = KeyType.JwsVerificationKey2020
      const denomination = PaymentDenomination.eEUR
      const controllerId = 'someControllerId'
      const dateCreated = 'someDateCreated'
      const dateUpdated = 'someDateUpdated'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateKey
      const action: UpdateKeyAction = {
        type: CreateEntityAdvancedActions.UpdateKey,
        payload: {
          purpose,
          type,
          denomination,
          controllerId,
          dateCreated,
          dateUpdated,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        key: {
          purpose,
          type,
          denomination,
          controllerId,
          dateCreated,
          dateUpdated,
        },
      })
    })
  })

  describe('Service Actions', () => {
    it('should update the service', () => {
      const type = ServiceType.DIDAgent
      const shortDescription = 'someShortDescription'
      const endpoint = 'someEndPoint'
      const publicKey = 'somePublicKey'
      const otherParams = 'someOtherParams'

      // given .. we have an action of type CreateEntityAdvancedActions.UpdateService
      const action: UpdateServiceAction = {
        type: CreateEntityAdvancedActions.UpdateService,
        payload: {
          type,
          shortDescription,
          endpoint,
          publicKey,
          otherParams,
        },
      }

      // when ... we run the reducer with this action
      const result = SUT.reducer(initialState, action)

      expect(result).toEqual({
        ...initialState,
        service: {
          type,
          shortDescription,
          endpoint,
          publicKey,
          otherParams,
        },
      })
    })
  })

  describe('DataResources Actions', () => {
    it('should add a new data resource section', () => {
      const id = 'someId'
      const type = DataResourceType.CellNodeDB
      const dataId = 'someDataId'
      const resourceLocator = 'someResourceLocator'
      const otherParams = 'someOtherParams'

      // given ... we have an action of type CreateEntityAdvancedActions.AddDataResource
      const action: AddDataResourceSectionAction = {
        type: CreateEntityAdvancedActions.AddDataResource,
        payload: {
          id,
          type,
          dataId,
          resourceLocator,
          otherParams,
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
            type,
            dataId,
            resourceLocator,
            otherParams,
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
