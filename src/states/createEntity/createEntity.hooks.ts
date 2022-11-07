import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  TEntityMetadataModel,
  TEntityCreatorModel,
  TEntityTagsModel,
  TEntityServiceModel,
  TEntityPaymentModel,
  TEntityLiquidityModel,
  TEntityClaimModel,
} from 'types'
import {
  gotoStepAction,
  updateClaimsAction,
  updateCreatorAction,
  updateEntityTypeAction,
  updateLiquidityAction,
  updateMetadataAction,
  updatePaymentsAction,
  updateServicesAction,
  updateTagsAction,
} from './createEntity.actions'
import {
  selectCreateEntityClaims,
  selectCreateEntityCreator,
  selectCreateEntityLiquidity,
  selectCreateEntityMetadata,
  selectCreateEntityPayments,
  selectCreateEntityServices,
  selectCreateEntityStepNo,
  selectCreateEntityTags,
  selectCreateEntityType,
} from './createEntity.selectors'
import {
  CreateEntityStrategyMap,
  TCreateEntityStepType,
  TCreateEntityStrategyType,
} from './strategy-map'

export function useCreateEntityStrategy(): {
  getStrategyByEntityType: (entityType: string) => TCreateEntityStrategyType
  getStrategyAndStepByPath: (
    path: string,
  ) => { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType }
} {
  const getStrategyByEntityType = (
    entityType: string,
  ): TCreateEntityStrategyType => {
    return CreateEntityStrategyMap[entityType]
  }
  const getStrategyAndStepByPath = (
    path: string,
  ): { strategy: TCreateEntityStrategyType; step: TCreateEntityStepType } => {
    const strategy = Object.values(CreateEntityStrategyMap).find(({ steps }) =>
      Object.values(steps).some(({ url }) => url === path),
    )
    const step = Object.values(strategy?.steps ?? {}).find(
      ({ url }) => url === path,
    )
    return { strategy, step }
  }
  return {
    getStrategyByEntityType,
    getStrategyAndStepByPath,
  }
}

export function useCreateEntityState(): any {
  const history = useHistory()
  const dispatch = useDispatch()
  const entityType: string = useSelector(selectCreateEntityType)
  const stepNo: number = useSelector(selectCreateEntityStepNo)
  const metadata: TEntityMetadataModel = useSelector(selectCreateEntityMetadata)
  const creator: TEntityCreatorModel = useSelector(selectCreateEntityCreator)
  const tags: TEntityTagsModel = useSelector(selectCreateEntityTags)
  const services: TEntityServiceModel[] = useSelector(
    selectCreateEntityServices,
  )
  const payments: TEntityPaymentModel[] = useSelector(
    selectCreateEntityPayments,
  )
  const liquidity: TEntityLiquidityModel[] = useSelector(
    selectCreateEntityLiquidity,
  )
  const claims: { [id: string]: TEntityClaimModel } = useSelector(
    selectCreateEntityClaims,
  )

  const updateEntityType = (entityType: string): void => {
    dispatch(updateEntityTypeAction(entityType))
  }
  const gotoStep = useCallback(
    (type: 1 | -1): void => {
      if (!entityType) return
      const { steps } = CreateEntityStrategyMap[entityType]
      const { nextStep, prevStep } = steps[stepNo]

      if (type === 1) {
        if (nextStep && steps[nextStep]?.url) {
          history.push(steps[nextStep].url)
          dispatch(gotoStepAction(nextStep))
        }
      } else if (type === -1) {
        if (prevStep && steps[prevStep]?.url) {
          history.push(steps[prevStep].url)
          dispatch(gotoStepAction(prevStep))
        }
      }
    },
    // eslint-disable-next-line
    [entityType, stepNo],
  )
  const updateMetadata = (metadata: TEntityMetadataModel): void => {
    dispatch(updateMetadataAction(metadata))
  }
  const updateCreator = (creator: TEntityCreatorModel): void => {
    dispatch(updateCreatorAction(creator))
  }
  const updateTags = (tags: TEntityTagsModel): void => {
    dispatch(updateTagsAction(tags))
  }
  const updateServices = (services: TEntityServiceModel[]): void => {
    dispatch(updateServicesAction(services))
  }
  const updatePayments = (payments: TEntityPaymentModel[]): void => {
    dispatch(updatePaymentsAction(payments))
  }
  const updateLiquidity = (liquidity: TEntityLiquidityModel[]): void => {
    dispatch(updateLiquidityAction(liquidity))
  }
  const updateClaims = (claims: { [id: string]: TEntityClaimModel }): void => {
    dispatch(updateClaimsAction(claims))
  }

  return {
    entityType,
    stepNo,
    metadata,
    creator,
    tags,
    services,
    payments,
    liquidity,
    claims,
    updateEntityType,
    gotoStep,
    updateMetadata,
    updateCreator,
    updateTags,
    updateServices,
    updatePayments,
    updateLiquidity,
    updateClaims,
  }
}
