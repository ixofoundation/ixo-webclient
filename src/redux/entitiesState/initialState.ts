import { EntityInterface } from './slice'

export interface InitialEntitiesState {
  entities: EntityInterface[]
  entitiesStore: EntityInterface[]
  entitiesLoading: boolean
}

export const initialEntitiesState: InitialEntitiesState = {
  entities: [],
  entitiesLoading: true,
  entitiesStore: [],
}
