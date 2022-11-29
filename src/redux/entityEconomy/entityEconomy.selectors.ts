import { createSelector } from 'reselect'
import { RootState } from 'redux/types'
import { EconomyState, GovernanceState, ProposalsType, ProposalStatus } from './entityEconomy.types'

export const selectEconomy = (state: RootState): EconomyState => state.economy

export const selectEconomyGovernance = createSelector(selectEconomy, (economy: EconomyState): GovernanceState => {
  return economy.governance
})

export const selectGovernanceProposals = createSelector(
  selectEconomyGovernance,
  (governance: GovernanceState): ProposalsType[] => {
    try {
      return governance.proposals
    } catch (e) {
      console.log('selectGovernanceProposals', e)
      return []
    }
  },
)

export const selectVotingPeriodProposals = createSelector(
  selectGovernanceProposals,
  (proposals: ProposalsType[]): ProposalsType[] => {
    try {
      return proposals.filter(
        (proposal) => proposal.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
        // true,
      )
    } catch (e) {
      console.log('selectVotingPeriodProposals', e)
      return []
    }
  },
)
