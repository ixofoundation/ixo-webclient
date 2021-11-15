import { v4 as uuidv4 } from 'uuid'
import { FormData } from 'common/components/JsonForm/types'
import {
  EditEntityAdvancedActions,
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
  ValidatedAction,
  ValidationErrorAction,
} from './types'

export const addLinkedEntity = (): AddLinkedEntitySectionAction => {
  return {
    type: EditEntityAdvancedActions.AddLinkedEntity,
    payload: {
      id: uuidv4(),
    },
  }
}

export const removeLinkedEntity = (
  id: string,
): RemoveLinkedEntitySectionAction => {
  return {
    type: EditEntityAdvancedActions.RemoveLinkedEntity,
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
    type: EditEntityAdvancedActions.UpdateLinkedEntity,
    payload: {
      id,
      type,
      entityId,
    },
  }
}

export const addPayment = (): AddPaymentSectionAction => {
  return {
    type: EditEntityAdvancedActions.AddPayment,
    payload: {
      id: uuidv4(),
    },
  }
}

export const removePayment = (id: string): RemovePaymentSectionAction => {
  return {
    type: EditEntityAdvancedActions.RemovePayment,
    payload: {
      id,
    },
  }
}

export const updatePayment = (
  id: string,
  formData: FormData,
): UpdatePaymentAction => {
  const { type, paymentId } = formData

  return {
    type: EditEntityAdvancedActions.UpdatePayment,
    payload: {
      id,
      type,
      paymentId,
    },
  }
}

export const addStake = (): AddStakeSectionAction => ({
  type: EditEntityAdvancedActions.AddStake,
  payload: {
    id: uuidv4(),
  },
})

export const removeStake = (id: string): RemoveStakeSectionAction => ({
  type: EditEntityAdvancedActions.RemoveStake,
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
    denom,
    stakeAddress,
    minStake,
    slashCondition,
    slashFactor,
    slashAmount,
    unbondPeriod,
  } = formData

  return {
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
}

export const addNode = (): AddNodeSectionAction => ({
  type: EditEntityAdvancedActions.AddNode,
  payload: {
    id: uuidv4(),
  },
})

export const removeNode = (id: string): RemoveNodeSectionAction => ({
  type: EditEntityAdvancedActions.RemoveNode,
  payload: {
    id,
  },
})

export const updateNode = (
  id: string,
  formData: FormData,
): UpdateNodeAction => {
  const { type, nodeId, serviceEndpoint } = formData

  return {
    type: EditEntityAdvancedActions.UpdateNode,
    payload: {
      id,
      type,
      nodeId,
      serviceEndpoint
    },
  }
}

export const addFund = (): AddFundSectionAction => ({
  type: EditEntityAdvancedActions.AddFund,
  payload: {
    id: uuidv4(),
  },
})

export const removeFund = (id: string): RemoveFundSectionAction => ({
  type: EditEntityAdvancedActions.RemoveFund,
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
    type: EditEntityAdvancedActions.UpdateFund,
    payload: {
      id,
      source,
      fundId,
    },
  }
}

export const addKey = (): AddKeySectionAction => ({
  type: EditEntityAdvancedActions.AddKey,
  payload: {
    id: uuidv4(),
  },
})

export const removeKey = (id: string): RemoveKeySectionAction => ({
  type: EditEntityAdvancedActions.RemoveKey,
  payload: {
    id,
  },
})

export const updateKey = (id: string, formData: FormData): UpdateKeyAction => {
  const {
    purpose,
    type,
    keyValue,
    signature,
    controller,
    dateCreated,
    dateUpdated,
  } = formData

  return {
    type: EditEntityAdvancedActions.UpdateKey,
    payload: {
      id,
      purpose,
      type,
      keyValue,
      signature,
      controller,
      dateCreated,
      dateUpdated,
    },
  }
}

export const addService = (): AddServiceSectionAction => ({
  type: EditEntityAdvancedActions.AddService,
  payload: {
    id: uuidv4(),
  },
})

export const removeService = (id: string): RemoveServiceSectionAction => ({
  type: EditEntityAdvancedActions.RemoveService,
  payload: {
    id,
  },
})

export const updateService = (
  id: string,
  formData: FormData,
): UpdateServiceAction => {
  const {
    type,
    shortDescription,
    serviceEndpoint,
    publicKey,
    properties,
    serviceId,
  } = formData

  return {
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
}

export const addDataResource = (): AddDataResourceSectionAction => ({
  type: EditEntityAdvancedActions.AddDataResource,
  payload: {
    id: uuidv4(),
  },
})

export const removeDataResource = (
  id: string,
): RemoveDataResourceSectionAction => ({
  type: EditEntityAdvancedActions.RemoveDataResource,
  payload: {
    id,
  },
})

export const updateDataResource = (
  id: string,
  formData: FormData,
): UpdateDataResourceAction => {
  const { type, dataId, serviceEndpoint, properties } = formData

  return {
    type: EditEntityAdvancedActions.UpdateDataResource,
    payload: {
      id,
      type,
      dataId,
      serviceEndpoint,
      properties,
    },
  }
}

export const validated = (identifier: string): ValidatedAction => ({
  type: EditEntityAdvancedActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (
  identifier: string,
  errors: string[],
): ValidationErrorAction => ({
  type: EditEntityAdvancedActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityAdvanced = (payload) => ({
  type: EditEntityAdvancedActions.ImportEntityAdvanced,
  payload
})