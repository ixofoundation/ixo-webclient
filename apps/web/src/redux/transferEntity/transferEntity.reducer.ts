import { ETransferEntityActions, TTransferEntityActionTypes, TTransferEntityState } from './transferEntity.types'

export const initialState: TTransferEntityState = {
  breadCrumbs: [{ text: 'Entity Name' }],
  title: 'Transfer entity',
  subtitle: '',

  selectedEntity: undefined,
  recipientDid: '',
}

export const reducer = (state = initialState, action: TTransferEntityActionTypes): TTransferEntityState => {
  switch (action.type) {
    case ETransferEntityActions.UpdateBreadCrumbs:
      return { ...state, breadCrumbs: action.payload }
    case ETransferEntityActions.UpdateTitle:
      return { ...state, title: action.payload }
    case ETransferEntityActions.UpdateSubtitle:
      return { ...state, subtitle: action.payload }
    case ETransferEntityActions.UpdateSelectedEntity:
      return { ...state, selectedEntity: action.payload }
    case ETransferEntityActions.UpdateRecipientDid:
      return { ...state, recipientDid: action.payload }
    default:
      return state
  }
}
