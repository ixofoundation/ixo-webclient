import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
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
  AddLiquiditySectionAction,
  RemoveLiquiditySectionAction,
  UpdateLiquidityAction,
  AddLinkedEntitySectionAction,
  RemoveLinkedEntitySectionAction,
  AddPaymentSectionAction,
  RemovePaymentSectionAction,
  AddKeySectionAction,
  RemoveKeySectionAction,
  AddServiceSectionAction,
  RemoveServiceSectionAction,
  AddLinkedResourcesSectionAction,
  UpdateLinkedResourcesAction,
  RemoveLinkedResourcesSectionAction,
  ValidatedAction,
  ValidationErrorAction,
} from './types'
import { PDS_URL } from '../../types'
import { RootState } from 'common/redux/types'

export const addLinkedEntity = (): AddLinkedEntitySectionAction => {
  return {
    type: CreateEntityAdvancedActions.AddLinkedEntity,
    payload: {
      id: uuidv4(),
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
  const { type, paymentId } = formData

  return {
    type: CreateEntityAdvancedActions.UpdatePayment,
    payload: {
      id,
      type,
      paymentId,
    },
  }
}

export const addStake = (): AddStakeSectionAction => ({
  type: CreateEntityAdvancedActions.AddStake,
  payload: {
    id: uuidv4(),
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
    denom,
    stakeAddress,
    minStake,
    slashCondition,
    slashFactor,
    slashAmount,
    unbondPeriod,
  } = formData

  return {
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
}

export const addNode = (): AddNodeSectionAction => ({
  type: CreateEntityAdvancedActions.AddNode,
  payload: {
    id: uuidv4(),
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
  const { type, nodeId, serviceEndpoint } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateNode,
    payload: {
      id,
      type,
      nodeId,
      serviceEndpoint,
    },
  }
}

export const addLiquidity = (): AddLiquiditySectionAction => ({
  type: CreateEntityAdvancedActions.AddLiquidity,
  payload: {
    id: uuidv4(),
  },
})

export const removeLiquidity = (id: string): RemoveLiquiditySectionAction => ({
  type: CreateEntityAdvancedActions.RemoveLiquidity,
  payload: {
    id,
  },
})

export const updateLiquidity = (
  id: string,
  formData: FormData,
): UpdateLiquidityAction => {
  const { source, liquidityId } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateLiquidity,
    payload: {
      id,
      source,
      liquidityId,
    },
  }
}

export const addKey = (): AddKeySectionAction => ({
  type: CreateEntityAdvancedActions.AddKey,
  payload: {
    id: uuidv4(),
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
    keyValue,
    signature,
    controller,
    dateCreated,
    dateUpdated,
  } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateKey,
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
  type: CreateEntityAdvancedActions.AddService,
  payload: {
    id: uuidv4(),
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
  const {
    type,
    shortDescription,
    serviceEndpoint,
    publicKey,
    properties,
    serviceId,
  } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateService,
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
  type: CreateEntityAdvancedActions.AddDataResource,
  payload: {
    id: uuidv4(),
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
  const { type, dataId, serviceEndpoint, properties } = formData

  return {
    type: CreateEntityAdvancedActions.UpdateDataResource,
    payload: {
      id,
      type,
      dataId,
      serviceEndpoint,
      properties,
    },
  }
}

export const addLinkedResourcesSection = (): AddLinkedResourcesSectionAction => ({
  type: CreateEntityAdvancedActions.AddLinkedResourcesSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeLinkedResourcesSection = (
  id: string,
): RemoveLinkedResourcesSectionAction => ({
  type: CreateEntityAdvancedActions.RemoveLinkedResourcesSection,
  payload: {
    id,
  },
})

export const updateLinkedResources = (id: string, formData: FormData) => (
  dispatch: Dispatch,
  getState: () => RootState,
): UpdateLinkedResourcesAction => {
  const { createEntityAdvanced } = getState()
  const linkedResource = createEntityAdvanced.linkedResources[id]
  const { type, path, name, description, file } = formData

  if (file && file.startsWith('data:')) {
    if (linkedResource.path === path) {
      return dispatch({
        type: CreateEntityAdvancedActions.UpdateLinkedResources,
        payload: blocksyncApi.project
          .createPublic(file, PDS_URL) //  TODO: maybe rely on Nodes card
          .then((response: any) => ({
            id,
            type,
            path: `${PDS_URL}public/${response.result}`, //  TODO: maybe rely on Nodes card
            name,
            description,
          })),
      })
    }
  }

  return dispatch({
    type: CreateEntityAdvancedActions.UpdateLinkedResources,
    payload: new Promise((resolve) =>
      resolve({
        id,
        type,
        path,
        name,
        description,
      }),
    ),
  })
}

export const validated = (identifier: string): ValidatedAction => ({
  type: CreateEntityAdvancedActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (
  identifier: string,
  errors: string[],
): ValidationErrorAction => ({
  type: CreateEntityAdvancedActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityAdvanced = (payload): any => ({
  type: CreateEntityAdvancedActions.ImportEntityAdvanced,
  payload,
})
