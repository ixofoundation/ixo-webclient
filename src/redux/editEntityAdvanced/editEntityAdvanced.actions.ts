import { v4 as uuidv4 } from 'uuid'
import { Dispatch } from 'redux'
import { FormData } from 'components/JsonForm/types'
import blocksyncApi from 'api/blocksync/blocksync'
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
  ValidatedAction,
  ValidationErrorAction,
  RemoveLinkedResourcesSectionAction,
  UpdateLinkedResourcesAction,
  AddLinkedResourcesSectionAction,
} from './editEntityAdvanced.types'
import { RootState } from 'redux/store'
import { selectCellNodeEndpoint } from '../selectedEntity/selectedEntity.selectors'

export const addLinkedEntity = (): AddLinkedEntitySectionAction => {
  return {
    type: EditEntityAdvancedActions.AddLinkedEntity,
    payload: {
      id: uuidv4(),
    },
  }
}

export const removeLinkedEntity = (id: string): RemoveLinkedEntitySectionAction => {
  return {
    type: EditEntityAdvancedActions.RemoveLinkedEntity,
    payload: {
      id,
    },
  }
}

export const updateLinkedEntity = (id: string, formData: FormData): UpdateLinkedEntityAction => {
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

export const updatePayment = (id: string, formData: FormData): UpdatePaymentAction => {
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

export const updateStake = (id: string, formData: FormData): UpdateStakeAction => {
  const { type, stakeId, denom, stakeAddress, minStake, slashCondition, slashFactor, slashAmount, unbondPeriod } =
    formData

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

export const updateNode = (id: string, formData: FormData): UpdateNodeAction => {
  const { type, nodeId, serviceEndpoint } = formData

  return {
    type: EditEntityAdvancedActions.UpdateNode,
    payload: {
      id,
      type,
      nodeId,
      serviceEndpoint,
    },
  }
}

export const addLiquidity = (): AddLiquiditySectionAction => ({
  type: EditEntityAdvancedActions.AddLiquidity,
  payload: {
    id: uuidv4(),
  },
})

export const removeLiquidity = (id: string): RemoveLiquiditySectionAction => ({
  type: EditEntityAdvancedActions.RemoveLiquidity,
  payload: {
    id,
  },
})

export const updateLiquidity = (id: string, formData: FormData): UpdateLiquidityAction => {
  const { source, liquidityId } = formData

  return {
    type: EditEntityAdvancedActions.UpdateLiquidity,
    payload: {
      id,
      source,
      liquidityId,
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
  const { purpose, type, keyValue, signature, controller, dateCreated, dateUpdated } = formData

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

export const updateService = (id: string, formData: FormData): UpdateServiceAction => {
  const { type, shortDescription, serviceEndpoint, publicKey, properties, serviceId } = formData

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

export const removeDataResource = (id: string): RemoveDataResourceSectionAction => ({
  type: EditEntityAdvancedActions.RemoveDataResource,
  payload: {
    id,
  },
})

export const updateDataResource = (id: string, formData: FormData): UpdateDataResourceAction => {
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

export const addLinkedResourcesSection = (): AddLinkedResourcesSectionAction => ({
  type: EditEntityAdvancedActions.AddLinkedResourcesSection,
  payload: {
    id: uuidv4(),
  },
})

export const removeLinkedResourcesSection = (id: string): RemoveLinkedResourcesSectionAction => ({
  type: EditEntityAdvancedActions.RemoveLinkedResourcesSection,
  payload: {
    id,
  },
})

export const updateLinkedResources =
  (id: string, formData: FormData) =>
  (dispatch: Dispatch, getState: () => RootState): UpdateLinkedResourcesAction => {
    const state = getState()
    const cellNodeEndpoint = selectCellNodeEndpoint(state)
    const { editEntityAdvanced } = state
    const linkedResource = editEntityAdvanced.linkedResources[id]
    const { type, path, name, description, file } = formData

    if (file && file.startsWith('data:')) {
      if (linkedResource?.path === path) {
        return dispatch({
          type: EditEntityAdvancedActions.UpdateLinkedResources,
          payload: blocksyncApi.project
            .createPublic(file, cellNodeEndpoint!) //  TODO: maybe rely on Nodes card
            .then((response: any) => ({
              id,
              type,
              path: `${cellNodeEndpoint}public/${response.result}`, //  TODO: maybe rely on Nodes card
              name,
              description,
            })),
        })
      }
    }

    return dispatch({
      type: EditEntityAdvancedActions.UpdateLinkedResources,
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
  type: EditEntityAdvancedActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (identifier: string, errors: string[]): ValidationErrorAction => ({
  type: EditEntityAdvancedActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityAdvanced = (payload: any): any => ({
  type: EditEntityAdvancedActions.ImportEntityAdvanced,
  payload,
})
