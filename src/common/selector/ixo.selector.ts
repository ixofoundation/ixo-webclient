import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { IxoState } from 'modules/ixo/types'

export const selectIxoState = (state: RootState): IxoState => state.ixo

export const selectIxo = createSelector(
  selectIxoState,
  (ixo: IxoState) => ixo.ixo
)
