import { CreateEntitySettingsState } from 'modules/CreateEntitySettings/types';
import { CreateEntityAdvancedState } from 'modules/CreateEntityAdvanced/types';
import { KeysafeState } from '../../modules/keysafe/types';
import { IxoState } from '../../modules/ixo/types';
import { BondState } from '../../modules/bond/types';
import { Currency } from '../../types/models';
import { AccountState } from '../../modules/Account/types';
import { BondBuyState } from '../../modules/BondBuy/types';
import { BondSellState } from '../../modules/BondSell/types';
import { BondSwapState } from '../../modules/BondSwap/types';
import { EntitiesState, Entity } from '../../modules/Entities/types';
import { FuelEntityState } from '../../modules/FuelEntity/types';
import { SubmitEntityClaimState } from '../../modules/SubmitEntityClaim/types';

import { CreateEntityPageContentState } from '../../modules/CreateEntityPageContent/types';
import { CreateEntityAttestationState } from '../../modules/CreateEntityAttestation/types';
import { CreateClaimTemplateState } from '../../modules/CreateClaimTemplate/types';
import { CreateEntityState } from '../../modules/CreateEntity/types';

export interface RootState {
  keySafe: KeysafeState
  ixo: IxoState
  web3: any
  bondBuy: BondBuyState
  bondSell: BondSellState
  bondSwap: BondSwapState
  account: AccountState
  bondAccountOrders: any[]
  activeBond: BondState
  tokenSupply: Currency[]
  entities: EntitiesState
  fuelEntity: FuelEntityState
  submitEntityClaim: SubmitEntityClaimState
  createClaimTemplate: CreateClaimTemplateState
  selectedEntity: Entity
  createEntity: CreateEntityState
  createEntityPageContent: CreateEntityPageContentState
  createEntityAttestation: CreateEntityAttestationState
  createEntitySettings: CreateEntitySettingsState
  createEntityAdvanced: CreateEntityAdvancedState
  router: any
}
