import { EntityType } from 'modules/Entities/types';
import {
  GoToStepAction,
  CreateEntityActions,
  Step,
  NewEntityAction,
} from './types';

export const goToStep = (step: Step): GoToStepAction => ({
  type: CreateEntityActions.GoToStep,
  payload: {
    step,
  },
});

// TODO - clear any existing entity setup here IF existing entityType is different to current

export const newEntity = (entityType: EntityType): NewEntityAction => ({
  type: CreateEntityActions.NewEntity,
  payload: {
    entityType,
  },
});
