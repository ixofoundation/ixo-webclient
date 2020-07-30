import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './CreateEntityAdvanced.actions'
import { CreateEntityAdvancedActions } from './types'
import mockStore from '../../common/redux/mockStore'
import {
  EntityType,
  PaymentType,
  PaymentDenomination,
  StakeType,
  SlashingCondition,
  KeyPurpose,
  ServiceType,
  DataResourceType,
  KeyType,
  NodeType,
  FundSource,
} from '../Entities/types'

let store

beforeEach(() => {
  store = mockStore({})
})

describe('CreateEntityAdvanced Actions', () => {
  describe('linkedEntity', () => {
    describe('updatedLinkedEntity', () => {
      it('should update the linked entity', () => {
        // given ... some data
        const type = EntityType.Investment
        const entityId = 'someEntityId'
        const formData = {
          type,
          entityId,
        }

        // when ... we call the action
        const action = SUT.updateLinkedEntity(formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAdvancedActions.UpdateLinkedEntity,
        )
        expect(action.payload).toEqual({ type, entityId })
      })
    })
  })

  describe('payment', () => {
    describe('updatePayment', () => {
      it('should update the payment', () => {
        // given ... some data
        const type = PaymentType.FeeforService
        const paymentId = 'somePaymentId'
        const denomination = PaymentDenomination.eCHF
        const maxAmount = 123
        const maxUnits = 456

        const formData = {
          type,
          paymentId,
          denomination,
          maxAmount,
          maxUnits,
        }

        // when ... we call the action
        const action = SUT.updatePayment(formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(CreateEntityAdvancedActions.UpdatePayment)
        expect(action.payload).toEqual({
          type,
          paymentId,
          denomination,
          maxAmount,
          maxUnits,
        })
      })
    })
  })

  describe('stake', () => {
    describe('addStake', () => {
      it('should add a new stake section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addStake action
        const action = SUT.addStake()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(CreateEntityAdvancedActions.AddStake)
        expect(action.payload).toEqual({
          id,
          type: null,
          stakeId: null,
          denomination: null,
          depositAddress: null,
          minStake: null,
          slashingCondition: null,
          slashFactor: null,
          maxSlashAmount: null,
          unbondingPeriod: null,
        })
      })
    })

    describe('removeStake', () => {
      it('should remove stake section', () => {
        const id = 'existingId'
        // when ... we call the removeStake action
        const action = SUT.removeStake(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(CreateEntityAdvancedActions.RemoveStake)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateStake', () => {
      it('should update the stake', () => {
        // given ... some stake
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

        const formData = {
          type,
          stakeId,
          denomination,
          depositAddress,
          minStake,
          slashingCondition,
          slashFactor,
          maxSlashAmount,
          unbondingPeriod,
        }

        // when ... we call the action
        const action = SUT.updateStake(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(CreateEntityAdvancedActions.UpdateStake)
        expect(action.payload).toEqual({
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
        })
      })
    })
  })

  describe('node', () => {
    describe('addNode', () => {
      it('should add a new node section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addNode action
        const action = SUT.addNode()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(CreateEntityAdvancedActions.AddNode)
        expect(action.payload).toEqual({
          id,
          type: null,
          nodeId: null,
        })
      })
    })

    describe('removeNode', () => {
      it('should remove node section', () => {
        const id = 'existingId'
        // when ... we call the removeNode action
        const action = SUT.removeNode(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(CreateEntityAdvancedActions.RemoveNode)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateNode', () => {
      it('should update the node resource', () => {
        // given ... some node
        const id = 'someId'
        const type = NodeType.IBCNode
        const nodeId = 'someNodeId'

        const formData = {
          id,
          type,
          nodeId,
        }

        // when ... we call the action
        const action = SUT.updateNode(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(CreateEntityAdvancedActions.UpdateNode)
        expect(action.payload).toEqual({
          id,
          type,
          nodeId,
        })
      })
    })
  })

  describe('fund', () => {
    describe('addFund', () => {
      it('should add a new fund section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addFund action
        const action = SUT.addFund()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(CreateEntityAdvancedActions.AddFund)
        expect(action.payload).toEqual({
          id,
          source: null,
          fundId: null,
        })
      })
    })

    describe('removeFund', () => {
      it('should remove fund section', () => {
        const id = 'existingId'
        // when ... we call the removeFund action
        const action = SUT.removeFund(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(CreateEntityAdvancedActions.RemoveFund)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateFund', () => {
      it('should update the fund', () => {
        // given ... some fund
        const id = 'someId'
        const source = FundSource.BankAccount
        const fundId = 'someFundId'

        const formData = {
          id,
          source,
          fundId,
        }

        // when ... we call the action
        const action = SUT.updateFund(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(CreateEntityAdvancedActions.UpdateFund)
        expect(action.payload).toEqual({
          id,
          source,
          fundId,
        })
      })
    })
  })

  describe('key', () => {
    describe('updateKey', () => {
      it('should update the key', () => {
        // given ... some data
        const purpose = KeyPurpose.Encryption
        const type = KeyType.JwsVerificationKey2020
        const denomination = PaymentDenomination.eEUR
        const controllerId = 'someControllerId'
        const dateCreated = 'someDateCreated'
        const dateUpdated = 'someDateUpdated'

        const formData = {
          purpose,
          type,
          denomination,
          controllerId,
          dateCreated,
          dateUpdated,
        }

        // when ... we call the action
        const action = SUT.updateKey(formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(CreateEntityAdvancedActions.UpdateKey)
        expect(action.payload).toEqual({
          purpose,
          type,
          denomination,
          controllerId,
          dateCreated,
          dateUpdated,
        })
      })
    })
  })

  describe('service', () => {
    describe('updateService', () => {
      it('should update the service', () => {
        // given ... some data
        const type = ServiceType.DIDAgent
        const shortDescription = 'someShortDescription'
        const endpoint = 'someEndPoint'
        const publicKey = 'somePublicKey'
        const otherParams = 'someOtherParams'

        const formData = {
          type,
          shortDescription,
          endpoint,
          publicKey,
          otherParams,
        }

        // when ... we call the action
        const action = SUT.updateService(formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(CreateEntityAdvancedActions.UpdateService)
        expect(action.payload).toEqual({
          type,
          shortDescription,
          endpoint,
          publicKey,
          otherParams,
        })
      })
    })
  })

  describe('data', () => {
    describe('addDataResource', () => {
      it('should add a new data resource section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addDataResource action
        const action = SUT.addDataResource()
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(CreateEntityAdvancedActions.AddDataResource)
        expect(action.payload).toEqual({
          id,
          type: null,
          dataId: null,
          resourceLocator: null,
          otherParams: null,
        })
      })
    })

    describe('removeDataResource', () => {
      it('should remove data resource section', () => {
        const id = 'existingId'
        // when ... we call the removeDataResource action
        const action = SUT.removeDataResource(id)
        // then ... we should expect it to create an action with the correct type
        expect(action.type).toEqual(
          CreateEntityAdvancedActions.RemoveDataResource,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateDataResource', () => {
      it('should update the data resource', () => {
        // given ... some data
        const id = 'someId'
        const type = DataResourceType.CellNodeDB
        const dataId = 'someDataId'
        const resourceLocator = 'someResourceLocator'
        const otherParams = 'someOtherParams'

        const formData = {
          type,
          dataId,
          resourceLocator,
          otherParams,
        }

        // when ... we call the action
        const action = SUT.updateDataResource(id, formData)

        // then ... we should expect it to create the action as expected
        expect(action.type).toEqual(
          CreateEntityAdvancedActions.UpdateDataResource,
        )
        expect(action.payload).toEqual({
          id,
          type,
          dataId,
          resourceLocator,
          otherParams,
        })
      })
    })
  })
})
