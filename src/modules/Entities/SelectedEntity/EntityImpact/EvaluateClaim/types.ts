import {
  EntityClaim
} from '../EntityClaims/types'

export enum SingleClaimActions {
  GetClaim = 'ixo/claim/GET_CLAIM'
}

export interface GetClaimAction {
  type: SingleClaimActions.GetClaim,
  payload: Promise<EntityClaim>
}