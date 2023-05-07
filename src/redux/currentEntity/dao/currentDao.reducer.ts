import { CurrentDaoActions, CurrentDaoActionTypes, CurrentDao } from './currentDao.types'

const initialState: CurrentDao = {}

export const reducer = (state = initialState, action: CurrentDaoActionTypes): CurrentDao => {
  switch (action.type) {
    case CurrentDaoActions.UpdateGroup:
      return { ...state, [action.payload.coreAddress]: action.payload }
    case CurrentDaoActions.ClearGroup:
      return { ...initialState }
    case CurrentDaoActions.SelectGroup: {
      const { address, multi } = action.payload

      if (!multi) {
        const updatedState = Object.fromEntries(
          Object.entries({ ...state }).map(([key, value]) => [
            key,
            { ...value, selected: value.coreAddress === address ? true : false },
          ]),
        )
        return { ...updatedState }
      } else {
        const updatedState = { ...state, [address]: { ...state[address], selected: !state[address].selected } }
        return { ...updatedState }
      }
    }
    default:
      return { ...state }
  }
}
