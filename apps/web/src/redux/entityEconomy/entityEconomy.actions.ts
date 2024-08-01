import { Dispatch } from 'redux'
import Axios from 'axios'
import { EntityEconomyActions, GetProposalsAction, GetProposersAction } from './entityEconomy.types'
import { mapProposalToRedux } from './entityEconomy.utils'

export const getProposals =
  () =>
  (dispatch: Dispatch): GetProposalsAction => {
    return dispatch({
      type: EntityEconomyActions.GetProposals,
      payload: Axios.get(`${import.meta.env.VITE_APP_GAIA_URL}/cosmos/gov/v1beta1/proposals`)
        .then((response) => response.data)
        .then((response) => {
          const { proposals } = response
          return proposals.map((proposal: any) => mapProposalToRedux(proposal))
        })
        .catch(() => []),
    })
  }

export const getProposers =
  (proposalIds: number[]) =>
  (dispatch: Dispatch): GetProposersAction => {
    const requests = proposalIds.map((proposalId: number) =>
      Axios.get(`${import.meta.env.VITE_APP_GAIA_URL}/gov/proposals/${proposalId}/proposer`),
    )

    return dispatch({
      type: EntityEconomyActions.GetProposers,
      payload: Promise.all(requests).then(
        Axios.spread((...responses: any[]) => {
          return responses.map(({ data }) => data.result.proposer)
        }),
      ),
    })
  }
