import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { useAccount } from 'hooks/account'
import React, { useContext, useEffect } from 'react'
import { Redirect, Route, useParams } from 'react-router-dom'
import { DurationWithUnits } from 'types/dao'
import { TDAOMetadataModel } from 'types/protocol'
import { convertSecondsToDurationWithUnits, durationToSeconds } from 'utils/conversions'
import { getDaoContractInfo, membersToMemberships, thresholdToTQData } from 'utils/dao'
import { v4 as uuidv4 } from 'uuid'
import { EditEntityContext } from '../EditEntity'
import EditGroups from './EditGroups/EditGroups'
import EditMetadata from './EditMetadata/EditMetadata'
import EditProperty from './EditProperty/EditProperty'
import ReviewDAO from './ReviewDAO/ReviewDAO'

const EditDAO: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()
  const { cosmWasmClient, address } = useAccount()

  const entity = useContext(EditEntityContext)
  const metadata: TDAOMetadataModel = entity.metadata as TDAOMetadataModel
  const entityName = metadata?.name || ''
  const linkedEntity = Object.values(entity.linkedEntity).filter((item: LinkedEntity) => item.type === 'Group')

  useEffect(() => {
    entity.updatePartial('breadCrumbs', [{ text: 'DAO' }, { text: entityName }])
    entity.updatePartial('title', `Edit (${entityName}) DAO`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityName])

  useEffect(() => {
    if (linkedEntity.length > 0) {
      linkedEntity.forEach((item: LinkedEntity) => {
        const { id } = item
        const [, coreAddress] = id.split('#')
        getDaoContractInfo({ coreAddress, cosmWasmClient, address }).then((response) => {
          console.log('getDaoContractInfo', { response })
          const { type, config, proposalModule, votingModule, token } = response
          const { preProposeConfig, proposalConfig } = proposalModule

          const id = uuidv4()
          const name = config.name
          const description = config.description
          const depositRequired = !!preProposeConfig.deposit_info
          const depositInfo = preProposeConfig.deposit_info
          const anyoneCanPropose = preProposeConfig.open_proposal_submission
          const onlyMembersExecute = proposalConfig.only_members_execute
          const { value: proposalDuration, units: proposalDurationUnits } = convertSecondsToDurationWithUnits(
            proposalConfig.max_voting_period.time,
          )
          const allowRevoting = proposalConfig.allow_revoting
          const contractAddress = coreAddress
          const {
            thresholdType,
            thresholdPercentage,
            quorumEnabled,
            quorumType,
            quorumPercentage,
            absoluteThresholdCount,
          } = thresholdToTQData(proposalConfig.threshold)

          const { members } = votingModule

          let staking: any = undefined
          if (type === 'staking' && token) {
            const { tokenInfo, marketingInfo, config } = token

            // const decimals = tokenInfo.decimals
            const tokenSymbol = tokenInfo.symbol
            const tokenName = tokenInfo.name
            const tokenSupply = tokenInfo.total_supply
            const tokenLogo = marketingInfo?.logo !== 'embedded' && marketingInfo.logo?.url

            const unstakingDuration: DurationWithUnits = convertSecondsToDurationWithUnits(
              durationToSeconds(0, config.unstaking_duration),
            )

            staking = {
              tokenSymbol,
              tokenName,
              tokenSupply,
              tokenLogo,
              // treasuryPercent,
              unstakingDuration,
            }
          }

          const memberships = membersToMemberships(members)

          const daoGroup = {
            type,
            id,
            contractAddress,

            name,
            description,
            memberships,
            staking,

            depositRequired,
            depositInfo,
            anyoneCanPropose,

            onlyMembersExecute,
            thresholdType,
            thresholdPercentage: (thresholdPercentage ?? 0) / 100,
            quorumEnabled,
            quorumType,
            quorumPercentage: (quorumPercentage ?? 0) / 100,
            proposalDuration,
            proposalDurationUnits,
            allowRevoting,

            absoluteThresholdCount,
          }

          entity.updatePartial('daoGroups', { [id]: daoGroup }, true)
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(linkedEntity)])

  return (
    <>
      <Route exact path='/edit/entity/:entityId/metadata' component={EditMetadata} />
      <Route exact path='/edit/entity/:entityId/groups' component={EditGroups} />
      <Route exact path='/edit/entity/:entityId/property' component={EditProperty} />
      <Route exact path='/edit/entity/:entityId/review' component={ReviewDAO} />
      <Route exact path={`/edit/entity/:entityId`}>
        <Redirect to={`/edit/entity/${entityId}/metadata`} />
      </Route>
    </>
  )
}

export default EditDAO
