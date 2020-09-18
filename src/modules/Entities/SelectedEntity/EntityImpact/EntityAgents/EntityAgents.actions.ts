import { Dispatch } from 'redux'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import { EntityAgentsActions, GetEntityAgentsAction } from './types'
import { AgentRole } from 'modules/Account/types'
import { PDS_URL } from 'modules/Entities/types'
import {
  ApiEntityAgent,
  ApiListEntityAgentsPayload,
} from 'common/api/blocksync-api/types/entity-agent'

export const getEntityAgents = (entityDid: string, role: AgentRole) => (
  dispatch: Dispatch,
): GetEntityAgentsAction => {
  const agentsPayload: ApiListEntityAgentsPayload = {
    projectDid: entityDid,
    role,
  }

  keysafe.requestSigning(
    JSON.stringify(agentsPayload),
    (signError: any, signature: any): any => {
      if (signError) {
        return dispatch({
          type: EntityAgentsActions.GetEntityAgentsFailure,
          payload: {
            error: signError,
          },
        })
      }

      blocksyncApi.agent
        .listAgentsForProject(agentsPayload, signature, PDS_URL)
        .then((response: any) => {
          if (response.error) {
            return dispatch({
              type: EntityAgentsActions.GetEntityAgentsFailure,
              payload: {
                error: response.error.message,
              },
            })
          } else {
            const agents: ApiEntityAgent[] = response.result
            return dispatch({
              type: EntityAgentsActions.GetEntityAgentsSuccess,
              payload: agents.map((agent) => {
                const { agentDid, currentStatus, email, name, role } = agent

                return {
                  name,
                  email,
                  did: agentDid,
                  role,
                  status: currentStatus,
                }
              }),
            })
          }
        })
        .catch((error) => {
          return dispatch({
            type: EntityAgentsActions.GetEntityAgentsFailure,
            payload: {
              error: error.message,
            },
          })
        })
    },
    'base64',
  )

  return null
}
