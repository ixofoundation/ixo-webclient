import { ProposalsType } from './types'

export const mapProposalToRedux = (proposal: any): ProposalsType => {
  const {
    proposal_id,
    content,
    status,
    final_tally_result,
    total_deposit,
    submit_time,
    deposit_end_time,
    voting_end_time,
    voting_start_time,
  } = proposal
  return {
    proposalId: proposal_id,
    proposer: '', //  get from    /gov/proposals/{proposalId}/proposer
    content: content,
    tally: {
      yes: Number(final_tally_result.yes),
      no: Number(final_tally_result.no),
      noWithVeto: Number(final_tally_result.no_with_veto),
      abstain: Number(final_tally_result.abstain),
      available:
        Number(final_tally_result.yes) +
        Number(final_tally_result.no) +
        Number(final_tally_result.no_with_veto) +
        Number(final_tally_result.abstain),
    },
    status: status,
    totalDeposit: total_deposit,
    submitTime: submit_time,
    DepositEndTime: deposit_end_time,
    votingStartTime: voting_start_time,
    votingEndTime: voting_end_time,
  }
}
