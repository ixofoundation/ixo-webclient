import {promisify} from 'util'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import * as Toast from 'common/utils/Toast'
import {
  ApiCreateEntityAgentPayload, ApiEntityAgent, ApiListEntityAgentsPayload,
  ApiUpdateEntityAgentPayload
} from 'common/api/blocksync-api/types/entity-agent'


// Promisify the signature function:
const requestSigning =
  promisify((data, enc, cb) => keysafe.requestsSigning(data, cb, enc))

export const getEntityAgents = (entityDid, role) => async dispatch => {
  const agentsPayload = {projectDid, role}

  try {
    const signature =
      await requestSigning(JSON.stringify(agentsPayload), 'base64')

    const {error: agentsError, result: agents} =
      await blocksyncApi.agent.listAgentsForProject(
        agentsPayload,
        signature,
        process.env.REACT_APP_PDS_URL,
      )

    if (agentsError)
      throw agentsError

    return dispatch({
      type: EntityAgentsActions.GetEntityAgentsSuccess,
      payload: {
        agents: agents.map(({currentStatus = {}, ...agent}) => ({
          ...agent,
          status: currentStatus.status || AgentStatus.Pending,
          version: currentStatus.version || '2.0',
        })),
      },
    })

  } catch (error) {
    return dispatch({
      type: EntityAgentsActions.GetEntityAgentsFailure,
      payload: {error: error.message || error},
    })
  }
}

export const updateAgentStatus = (agentDid, status) => async (dispatch, getState) => {
  const {
    selectedEntityAgents: { agents },
    selectedEntity: { did: projectDid},
  } = getState()

  const { role, version } = agents[agentDid]

  const updateAgentPayload = {agentDid, status, role, version, projectDid}

  try {
    const signature =
      await requestSigning(JSON.stringify(updateAgentPayload), 'base64')

    const {error} =
      blocksyncApi.agent.updateAgentStatus(
        updateAgentPayload,
        signature,
        process.env.REACT_APP_PDS_URL,
      )

      if (error)
        throw error

      return dispatch({
        type: EntityAgentsActions.UpdateEntityAgentStatusSuccess,
        payload: {agentDid, status},
      })

  } catch (error) {
    return dispatch({
      type: EntityAgentsActions.UpdateEntityAgentStatusFailure,
      payload: {error: error.message || error},
    })
  }
}

export const createEntityAgent = (email, name, role) => async (dispatch, getState) => {
  const {account} = getState()

  const {
    account: {userInfo: {didDoc: {did: agentDid}}},
    selectedEntity: {did: projectDid},
  } = getState()

  const createAgentPayload = {email, name, role, agentDid, projectDid}

  try {
    const signature =
      await requestSigning(JSON.stringify(createAgentPayload), 'base64')

    const {error} =
      blocksyncApi.agent.createAgent(
        createAgentPayload,
        signature,
        process.env.REACT_APP_PDS_URL,
      )

    if (error) {
      Toast.errorToast(`Error: ${error.message}`)
      throw error
    }

    Toast.successToast(`Successfully applied to join`)

    return dispatch({
      type: EntityAgentsActions.CreateEntityAgentSuccess,
      payload: {
        agent: {
          name,
          email,
          userDid: agentDid,
          role,
          status: AgentStatus.Pending,
          version: '2.0',
        },
      },
    })

  } catch (error) {
    return dispatch({
      type: EntityAgentsActions.CreateEntityAgentFailure,
      payload: {error: error.message || error},
    })
  }
}
