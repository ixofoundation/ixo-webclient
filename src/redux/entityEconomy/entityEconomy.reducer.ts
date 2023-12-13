import { EconomyActionTypes, EconomyState, EntityEconomyActions, ProposalsType } from './entityEconomy.types'

const initialState: EconomyState = {
  governance: {
    proposals: [],
  },
}

export const reducer = (state = initialState, action: EconomyActionTypes): any => {
  switch (action.type) {
    case EntityEconomyActions.GetProposalsSuccess:
      return {
        ...state,
        governance: {
          proposals: action.payload.sort((a: ProposalsType, b: ProposalsType) => b.proposalId - a.proposalId),
        },
      }
    case EntityEconomyActions.GetProposersSuccess: {
      const newProposals = { ...state }.governance.proposals.map((proposal: ProposalsType, i: number) => ({
        ...proposal,
        proposer: action.payload[i],
      }))
      return {
        ...state,
        governance: {
          proposals: newProposals,
        },
      }
    }
    default:
      return state
  }
}
