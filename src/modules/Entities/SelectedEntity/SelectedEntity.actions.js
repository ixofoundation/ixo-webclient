import {promisify} from 'util'
import moment from 'moment'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { fromBase64 } from 'js-base64'
import keysafe from 'common/keysafe/keysafe'
import { keys } from 'lodash'
import {SelectedEntityActions} from './types'
import {FundSource} from '../types'


// Promisify the signature function:
const requestSigning =
  promisify((data, enc, cb) => keysafe.requestsSigning(data, cb, enc))


export const clearEntity = () => ({
  type: SelectedEntityActions.ClearEntity,
})

export const getEntity = did => async (dispatch, getState) => {
  const {selectedEntity} = getState()

  if (selectedEntity && selectedEntity.did === did)
    return null

  dispatch(clearEntity())

  const apiEntity = await blocksyncApi.project.getProjectByProjectDid(did)

  const resourceData =
    await blocksyncApi.project.fetchPublic(
      apiEntity.data.page.cid,
      process.env.REACT_APP_PDS_URL,
    )

  const content = JSON.parse(fromBase64(resourceData.data))

  // TODO - in future we will get all claims
  const claimToUse = apiEntity.data.entityClaims && apiEntity.data.entityClaims.items[0]

  const alphabondToUse = apiEntity.data.funding.items.find(
    (fund) => fund['@type'] === FundSource.Alphabond,
  )

  return dispatch({
    type: SelectedEntityActions.GetEntitySuccess,

    payload: {
      did: apiEntity.projectDid,
      type: apiEntity.data['@type'],
      creatorDid: apiEntity.data.createdBy,
      status: apiEntity.status,
      name: apiEntity.data.name,
      description: apiEntity.data.description,
      dateCreated: moment(apiEntity.data.createdOn),
      creatorName: apiEntity.data.creator.displayName,
      creatorLogo: apiEntity.data.creator.logo,
      creatorMission: apiEntity.data.creator.mission,
      creatorWebsite: apiEntity.data.creator.website,
      location: apiEntity.data.location,
      image: apiEntity.data.image,
      logo: apiEntity.data.logo,
      serviceProvidersCount: apiEntity.data.agentStats.serviceProviders,
      serviceProvidersPendingCount:
        apiEntity.data.agentStats.serviceProvidersPending,
      evaluatorsCount: apiEntity.data.agentStats.evaluators,
      evaluatorsPendingCount: apiEntity.data.agentStats.evaluatorsPending,
      goal: claimToUse ? claimToUse.goal : undefined,
      claimTemplateId: claimToUse ? claimToUse['@id'] : undefined,
      requiredClaimsCount: claimToUse ? claimToUse.targetMax : undefined,
      pendingClaimsCount: claimToUse
        ? apiEntity.data.claims.filter((claim) => claim.status === '0')
            .length
        : undefined,
      successfulClaimsCount: claimToUse
        ? apiEntity.data.claimStats.currentSuccessful
        : undefined,
      rejectedClaimsCount: claimToUse
        ? apiEntity.data.claimStats.currentRejected
        : undefined,
      agents: apiEntity.data.agents,
      sdgs: apiEntity.data.sdgs,
      bondDid: alphabondToUse ? alphabondToUse.id : undefined,
      entityClaims: apiEntity.data.entityClaims,
      claims: apiEntity.data.claims,
      content,
    },
  })
}

export const updateProjectStatus = (projectDid, status) => async dispatch => {
  const statusData = {projectDid, status}

  try {
    const signature = keysafe.requestSigning(JSON.stringify(statusData), 'base64')

    await blocksyncApi.project.updateProjectStatus(
      statusData,
      signature,
      process.env.PDS_URL,
    )

    return dispatch({type: SelectedEntityActions.UpdateProjectStatus})

  } catch (error) {
    console.error(error)
  }
}
