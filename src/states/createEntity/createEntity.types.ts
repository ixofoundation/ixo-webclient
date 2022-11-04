import { EAssetType, ELocalisation } from 'types'

export interface TAssetMetadata {
  localisation?: ELocalisation
  image?: string
  denom?: string
  icon?: string
  type?: EAssetType
  tokenName?: string
  name?: string
  maxSupply?: number | undefined
  decimals?: number
  description?: string
  brandName?: string
  country?: string
  autoGenerateZLottie?: boolean
  attributes?: { key: string; value: string }[]
  metrics?: {
    name?: string
    prefix?: string
    suffix?: string
    source?: string
  }[]
}

export interface TCreateEntityState {
  entityType: string
  metadata: TAssetMetadata

  stepNo: number
}

export enum ECreateEntityActions {
  UpdateEntityType = 'ixo/create/entity/UPDATE_ENTITY_TYPE',
  GotoStep = 'ixo/create/entity/GOTO_STEP',
  UpdateMetadata = 'ixo/create/entity/UPDATE_METADATA',
}

export interface TUpdateEntityTypeAction {
  type: typeof ECreateEntityActions.UpdateEntityType
  payload: string
}
export interface TGotoStepAction {
  type: typeof ECreateEntityActions.GotoStep
  payload: number
}
export interface TUpdateMetaDataAction {
  type: typeof ECreateEntityActions.UpdateMetadata
  payload: TAssetMetadata
}

export type TCreateEntityActionTypes =
  | TUpdateEntityTypeAction
  | TGotoStepAction
  | TUpdateMetaDataAction
