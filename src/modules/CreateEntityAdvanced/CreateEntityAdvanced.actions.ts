import { v4 as uuidv4 } from 'uuid'
import { FormData } from 'common/components/JsonForm/types'
import {
  CreateEntityAdvancedActions,
  UpdateLinkedEntityAction,
  UpdatePaymentAction,
  UpdateKeyAction,
  UpdateServiceAction,
  UpdateDataResourceAction,
  AddDataResourceSectionAction,
  RemoveDataResourceSectionAction,
  AddStakeSectionAction,
  RemoveStakeSectionAction,
  UpdateStakeAction,
  AddNodeSectionAction,
  RemoveNodeSectionAction,
  UpdateNodeAction,
  AddFundSectionAction,
  RemoveFundSectionAction,
  UpdateFundAction,
  AddLinkedEntitySectionAction,
  RemoveLinkedEntitySectionAction,
  AddPaymentSectionAction,
  RemovePaymentSectionAction,
  AddKeySectionAction,
  RemoveKeySectionAction,
  AddServiceSectionAction,
  RemoveServiceSectionAction,
} from './types'

export const addLinkedEntity = (): AddLinkedEntitySectionAction => {
  return {
    type: CreateEntityAdvancedActions.AddLinkedEntity,
    payload: {
      id: uuidv4(),
      type: null,
      entityId: null,
    },
  }
}

export const removeLinkedEntity = (
  id: string,
): RemoveLinkedEntitySectionAction => {
  return {
    type: CreateEntityAdvancedActions.RemoveLinkedEntity,
    payload: {
      id,
    },
  }
}

export const updateLinkedEntity = (
  id: string,
  formData: FormData,
): UpdateLinkedEntityAction => {
  const { type, entityId } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateLinkedEntity,
    payload: {
      id,
      type,
      entityId,
    },
  }
}

export const addPayment = (): AddPaymentSectionAction => {
  return {
    type: CreateEntityAdvancedActions.AddPayment,
    payload: {
      id: uuidv4(),
      type: null,
      paymentId: null,
      denomination: null,
      maxAmount: null,
      maxUnits: null,
    },
  }
}

export const removePayment = (id: string): RemovePaymentSectionAction => {
  return {
    type: CreateEntityAdvancedActions.RemovePayment,
    payload: {
      id,
    },
  }
}

export const updatePayment = (
  id: string,
  formData: FormData,
): UpdatePaymentAction => {
  const { type, paymentId, denomination, maxAmount, maxUnits } = formData

  return {
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
}

export const addStake = (): AddStakeSectionAction => ({
  type: CreateEntityAdvancedActions.AddStake,
  payload: {
    id: uuidv4(),
    type: null,
    stakeId: null,
    denomination: null,
    depositAddress: null,
    minStake: null,
    slashingCondition: null,
    slashFactor: null,
    maxSlashAmount: null,
    unbondingPeriod: null,
  },
})

export const removeStake = (id: string): RemoveStakeSectionAction => ({
  type: CreateEntityAdvancedActions.RemoveStake,
  payload: {
    id,
  },
})

export const updateStake = (
  id: string,
  formData: FormData,
): UpdateStakeAction => {
  const {
    type,
    stakeId,
    denomination,
    depositAddress,
    minStake,
    slashingCondition,
    slashFactor,
    maxSlashAmount,
    unbondingPeriod,
  } = formData

  return {
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
}

export const addNode = (): AddNodeSectionAction => ({
  type: CreateEntityAdvancedActions.AddNode,
  payload: {
    id: uuidv4(),
    type: null,
    nodeId: null,
  },
})

export const removeNode = (id: string): RemoveNodeSectionAction => ({
  type: CreateEntityAdvancedActions.RemoveNode,
  payload: {
    id,
  },
})

export const updateNode = (
  id: string,
  formData: FormData,
): UpdateNodeAction => {
  const { type, nodeId } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateNode,
    payload: {
      id,
      type,
      nodeId,
    },
  }
}

export const addFund = (): AddFundSectionAction => ({
  type: CreateEntityAdvancedActions.AddFund,
  payload: {
    id: uuidv4(),
    source: null,
    fundId: null,
  },
})

export const removeFund = (id: string): RemoveFundSectionAction => ({
  type: CreateEntityAdvancedActions.RemoveFund,
  payload: {
    id,
  },
})

export const updateFund = (
  id: string,
  formData: FormData,
): UpdateFundAction => {
  const { source, fundId } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateFund,
    payload: {
      id,
      source,
      fundId,
    },
  }
}

export const addKey = (): AddKeySectionAction => ({
  type: CreateEntityAdvancedActions.AddKey,
  payload: {
    id: uuidv4(),
    purpose: null,
    type: null,
    controllerId: null,
    dateCreated: null,
    dateUpdated: null,
    denomination: null,
  },
})

export const removeKey = (id: string): RemoveKeySectionAction => ({
  type: CreateEntityAdvancedActions.RemoveKey,
  payload: {
    id,
  },
})

export const updateKey = (id: string, formData: FormData): UpdateKeyAction => {
  const {
    purpose,
    type,
    denomination,
    controllerId,
    dateCreated,
    dateUpdated,
  } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateKey,
    payload: {
      id,
      purpose,
      type,
      denomination,
      controllerId,
      dateCreated,
      dateUpdated,
    },
  }
}

export const addService = (): AddServiceSectionAction => ({
  type: CreateEntityAdvancedActions.AddService,
  payload: {
    id: uuidv4(),
    type: null,
    shortDescription: null,
    endpoint: null,
    otherParams: null,
    publicKey: null,
  },
})

export const removeService = (id: string): RemoveServiceSectionAction => ({
  type: CreateEntityAdvancedActions.RemoveService,
  payload: {
    id,
  },
})

export const updateService = (
  id: string,
  formData: FormData,
): UpdateServiceAction => {
  const { type, shortDescription, endpoint, publicKey, otherParams } = formData

  return {
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
}

export const addDataResource = (): AddDataResourceSectionAction => ({
  type: CreateEntityAdvancedActions.AddDataResource,
  payload: {
    id: uuidv4(),
    type: null,
    dataId: null,
    resourceLocator: null,
    otherParams: null,
  },
})

export const removeDataResource = (
  id: string,
): RemoveDataResourceSectionAction => ({
  type: CreateEntityAdvancedActions.RemoveDataResource,
  payload: {
    id,
  },
})

export const updateDataResource = (
  id: string,
  formData: FormData,
): UpdateDataResourceAction => {
  const { type, dataId, resourceLocator, otherParams } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateDataResource,
    payload: {
      id,
      type,
      dataId,
      resourceLocator,
      otherParams,
    },
  }
}
