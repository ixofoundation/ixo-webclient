export type IxoState = {
  ixo: any
};

export enum IxoActions {
  InitIxo = 'ixo/Ixo/INIT_IXO',
  ResetIxo = 'ixo/Ixo/RESET_IXO',
}

export interface InitIxoAction {
  type: typeof IxoActions.InitIxo
  payload: {
    ixo: any
  }
}

export interface ResetIxoAction {
  type: typeof IxoActions.ResetIxo
}

export type IxoActionTypes = InitIxoAction | ResetIxoAction;
