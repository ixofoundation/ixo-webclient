import { v4 } from 'uuid'
jest.mock('uuid')
import * as SUT from './EditEntityAdvanced.actions'
import { EditEntityAdvancedActions } from './types'
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
  LiquiditySource,
} from '../../../types'

describe('EditEntityAdvanced Actions', () => {
  describe('linkedEntity', () => {
    describe('addLinkedEntity', () => {
      it('should add a new linkedEntity section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addLinkedEntity action
        const action = SUT.addLinkedEntity()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddLinkedEntity)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeLinkedEntity', () => {
      it('should remove linkedEntity section', () => {
        const id = 'existingId'
        // when ... we call the removeLinkedEntity action
        const action = SUT.removeLinkedEntity(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(
          EditEntityAdvancedActions.RemoveLinkedEntity,
        )
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updatedLinkedEntity', () => {
      it('should update the linked entity', () => {
        // given ... some data
        const id = 'existingId'
        const type = EntityType.Investment
        const entityId = 'someEntityId'
        const formData = {
          type,
          entityId,
        }

        // when ... we call the action
        const action = SUT.updateLinkedEntity(id, formData)

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(
          EditEntityAdvancedActions.UpdateLinkedEntity,
        )
        expect(action.payload).toEqual({ id, type, entityId })
      })
    })
  })

  describe('payment', () => {
    describe('addPayment', () => {
      it('should add a new payment section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addPayment action
        const action = SUT.addPayment()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddPayment)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removePayment', () => {
      it('should remove payment section', () => {
        const id = 'existingId'
        // when ... we call the removePayment action
        const action = SUT.removePayment(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.RemovePayment)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updatePayment', () => {
      it('should update the payment', () => {
        // given ... some data
        const id = 'someId'
        const type = PaymentType.FeeForService
        const paymentId = 'somePaymentId'

        const formData = {
          type,
          paymentId,
        }

        // when ... we call the action
        const action = SUT.updatePayment(id, formData)

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(EditEntityAdvancedActions.UpdatePayment)
        expect(action.payload).toEqual({
          id,
          type,
          paymentId,
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
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddStake)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeStake', () => {
      it('should remove stake section', () => {
        const id = 'existingId'
        // when ... we call the removeStake action
        const action = SUT.removeStake(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.RemoveStake)
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
        const denom = PaymentDenomination.eEUR
        const stakeAddress = 'someDepositAddress'
        const minStake = 123
        const slashCondition = SlashingCondition.FailedDispute
        const slashFactor = 456
        const slashAmount = 789
        const unbondPeriod = 10

        const formData = {
          type,
          stakeId,
          denom,
          stakeAddress,
          minStake,
          slashCondition,
          slashFactor,
          slashAmount,
          unbondPeriod,
        }

        // when ... we call the action
        const action = SUT.updateStake(id, formData)

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(EditEntityAdvancedActions.UpdateStake)
        expect(action.payload).toEqual({
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
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddNode)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeNode', () => {
      it('should remove node section', () => {
        const id = 'existingId'
        // when ... we call the removeNode action
        const action = SUT.removeNode(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.RemoveNode)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateNode', () => {
      it('should update the node', () => {
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

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(EditEntityAdvancedActions.UpdateNode)
        expect(action.payload).toEqual({
          id,
          type,
          nodeId,
        })
      })
    })
  })

  describe('liquidity', () => {
    describe('addLiquidity', () => {
      it('should add a new liquidity section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addLiquidity action
        const action = SUT.addLiquidity()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddLiquidity)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeLiquidity', () => {
      it('should remove liquidity section', () => {
        const id = 'existingId'
        // when ... we call the removeLiquidity action
        const action = SUT.removeLiquidity(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.RemoveLiquidity)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateLiquidity', () => {
      it('should update the liquidity', () => {
        // given ... some liquidity
        const id = 'someId'
        const source = LiquiditySource.BankAccount
        const liquidityId = 'someLiquidityId'

        const formData = {
          id,
          source,
          liquidityId,
        }

        // when ... we call the action
        const action = SUT.updateLiquidity(id, formData)

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(EditEntityAdvancedActions.UpdateLiquidity)
        expect(action.payload).toEqual({
          id,
          source,
          liquidityId,
        })
      })
    })
  })

  describe('key', () => {
    describe('addKey', () => {
      it('should add a new key section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addKey action
        const action = SUT.addKey()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddKey)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeKey', () => {
      it('should remove key section', () => {
        const id = 'existingId'
        // when ... we call the removeKey action
        const action = SUT.removeKey(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.RemoveKey)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateKey', () => {
      it('should update the key', () => {
        // given ... some data
        const id = 'someId'
        const purpose = KeyPurpose.Encryption
        const type = KeyType.JwsVerificationKey2020
        const keyValue = 'someKeyValue'
        const signature = 'someSignature'
        const controller = 'someControllerId'
        const dateCreated = 'someDateCreated'
        const dateUpdated = 'someDateUpdated'

        const formData = {
          id,
          purpose,
          type,
          keyValue,
          signature,
          controller,
          dateCreated,
          dateUpdated,
        }

        // when ... we call the action
        const action = SUT.updateKey(id, formData)

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(EditEntityAdvancedActions.UpdateKey)
        expect(action.payload).toEqual({
          id,
          purpose,
          type,
          keyValue,
          signature,
          controller,
          dateCreated,
          dateUpdated,
        })
      })
    })
  })

  describe('service', () => {
    describe('addService', () => {
      it('should add a new service section', () => {
        const id = 'newId'
        v4.mockImplementationOnce(() => id)
        // when ... we call the addService action
        const action = SUT.addService()
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddService)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeService', () => {
      it('should remove service section', () => {
        const id = 'existingId'
        // when ... we call the removeService action
        const action = SUT.removeService(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.RemoveService)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('updateService', () => {
      it('should update the service', () => {
        // given ... some data
        const id = 'someId'
        const type = ServiceType.DIDAgent
        const shortDescription = 'someShortDescription'
        const serviceEndpoint = 'someEndPoint'
        const publicKey = 'somePublicKey'
        const properties = 'someOtherParams'
        const serviceId = 'someServiceId'

        const formData = {
          id,
          type,
          shortDescription,
          serviceEndpoint,
          publicKey,
          properties,
          serviceId,
        }

        // when ... we call the action
        const action = SUT.updateService(id, formData)

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(EditEntityAdvancedActions.UpdateService)
        expect(action.payload).toEqual({
          id,
          type,
          shortDescription,
          serviceEndpoint,
          publicKey,
          properties,
          serviceId,
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
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(EditEntityAdvancedActions.AddDataResource)
        expect(action.payload).toEqual({
          id,
        })
      })
    })

    describe('removeDataResource', () => {
      it('should remove data resource section', () => {
        const id = 'existingId'
        // when ... we call the removeDataResource action
        const action = SUT.removeDataResource(id)
        // then ... we should expect it to edit an action with the correct type
        expect(action.type).toEqual(
          EditEntityAdvancedActions.RemoveDataResource,
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
        const serviceEndpoint = 'someResourceLocator'
        const properties = 'someOtherParams'

        const formData = {
          type,
          dataId,
          serviceEndpoint,
          properties,
        }

        // when ... we call the action
        const action = SUT.updateDataResource(id, formData)

        // then ... we should expect it to edit the action as expected
        expect(action.type).toEqual(
          EditEntityAdvancedActions.UpdateDataResource,
        )
        expect(action.payload).toEqual({
          id,
          type,
          dataId,
          serviceEndpoint,
          properties,
        })
      })
    })
  })

  describe('validation', () => {
    it('should set validated to true', () => {
      const identifier = 'someIdentifier'
      // when ... we call the validated action creator
      const action = SUT.validated(identifier)

      // then ... we should expect it to edit an action with the correct type and payload
      expect(action.type).toEqual(EditEntityAdvancedActions.Validated)
      expect(action.payload).toEqual({
        identifier,
      })
    })
  })
  describe('validationError', () => {
    it('should set validated to false with any errors', () => {
      const identifier = 'someIdentifier'
      const errors = ['error1', 'error2']
      // when ... we call the validated action creator
      const action = SUT.validationError(identifier, errors)

      // then ... we should expect it to edit an action with the correct type and payload
      expect(action.type).toEqual(EditEntityAdvancedActions.ValidationError)
      expect(action.payload).toEqual({
        identifier,
        errors,
      })
    })
  })
})
