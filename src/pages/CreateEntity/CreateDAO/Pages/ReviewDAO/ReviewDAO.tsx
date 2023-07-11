import { ixo } from '@ixo/impactxclient-sdk'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import {
  AccordedRight,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import { useQuery } from 'hooks/window'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { TDAOMetadataModel } from 'types/protocol'
import DAOCard from '../../../Forms/ReviewCard/DAOCard'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { ReactComponent as ExclamationIcon } from 'assets/images/icon-exclamation-circle.svg'
import { useTheme } from 'styled-components'

const ReviewDAO: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const history = useHistory()
  const createEntityState = useCreateEntityState()
  const profile: TDAOMetadataModel = createEntityState.profile as TDAOMetadataModel
  const {
    entityType,
    service: serviceData,
    linkedEntity: linkedEntityData,
    daoGroups,
    daoController,
    clearEntity,
    gotoStep,
    gotoStepByNo,
  } = createEntityState
  const { UploadLinkedResource, CreateProtocol, CreateEntityBase } = useCreateEntity()
  const [submitting, setSubmitting] = useState(false)
  const { getQuery } = useQuery()
  const success = getQuery('success')

  const numOfMembers = useMemo(() => {
    const daoGroup = daoGroups[daoController]
    if (!daoGroup) {
      return 0
    }
    return daoGroup.votingModule.members.length
  }, [daoGroups, daoController])

  const handleSignToCreate = async (): Promise<void> => {
    setSubmitting(true)

    const accordedRight: AccordedRight[] = []
    const verification: Verification[] = []
    let service: Service[] = []
    let linkedEntity: LinkedEntity[] = []
    let linkedResource: LinkedResource[] = []

    // AccordedRight TODO:

    // Service
    service = serviceData.map((item: Service) => ({ ...item, id: `{id}#${item.id}` }))

    // LinkedEntity
    linkedEntity = Object.values(linkedEntityData)

    // LinkedResource
    linkedResource = linkedResource.concat(await UploadLinkedResource())

    // Verification
    const daoControllerAddress = daoGroups[daoController]?.coreAddress
    if (daoControllerAddress) {
      verification.push(
        ixo.iid.v1beta1.Verification.fromPartial({
          relationships: ['authentication'],
          method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
            id: `{id}#${daoControllerAddress}`,
            type: 'CosmosAccountAddress',
            controller: '{id}',
            blockchainAccountID: daoControllerAddress,
          }),
        }),
      )
    }

    // Create Protocol for dao
    const protocolDid = await CreateProtocol()
    if (!protocolDid) {
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }

    // Create DAO entity
    const entityDid = await CreateEntityBase(entityType, protocolDid, {
      service,
      linkedResource,
      accordedRight,
      linkedEntity,
      verification,
      relayerNode: process.env.REACT_APP_RELAYER_NODE,
    })
    if (!entityDid) {
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }

    setSubmitting(false)
    history.push({ pathname: history.location.pathname, search: `?success=true` })
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <DAOCard image={profile?.image ?? ''} name={profile?.name ?? ''} numberOfMembers={numOfMembers} />
      <FlexBox direction='column' justifyContent='space-between' gap={4} width='100%' style={{ flex: 1 }}>
        {!success && (
          <>
            <FlexBox direction='column' width='100%' gap={4}>
              <Typography variant='secondary'>
                This is the last step before creating this DAO on the ixo Blockchain.
              </Typography>
              <Typography variant='secondary'>
                <NavLink to={'/create/entity/dao/profile'} onClick={() => gotoStepByNo(2)}>
                  Review the DAO details
                </NavLink>{' '}
                you have configured.
              </Typography>
              <Typography variant='secondary'>
                <NavLink to={'/create/entity/dao/group'} onClick={() => gotoStepByNo(3)}>
                  View the DAO Groups
                </NavLink>{' '}
                you have added.
              </Typography>
              <Typography variant='secondary'>
                When you are ready to commit, sign with your DID Account keys, or{' '}
                <Typography variant='secondary' color='black'>
                  connect a different account
                </Typography>{' '}
                as the DAO Creator.
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button variant='secondary' onClick={(): void => gotoStep(-1)} style={{ width: '100%' }}>
                Back
              </Button>
              <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
                Sign To Create
              </Button>
            </FlexBox>
          </>
        )}
        {success === 'true' && (
          <>
            <FlexBox direction='column' justifyContent='center' alignItems='center' width='100%' height='100%' gap={4}>
              <SvgBox color={theme.ixoLightGreen} svgWidth={30} svgHeight={30}>
                <CheckCircleIcon />
              </SvgBox>
              <Typography variant='secondary' size='2xl'>
                {profile?.name} Successfully created!
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button
                variant='primary'
                onClick={() => {
                  history.push(`/explore?type=${entityType}`)
                  clearEntity()
                }}
                style={{ width: '100%' }}
              >
                View in the Explorer
              </Button>
            </FlexBox>
          </>
        )}
        {success === 'false' && (
          <>
            <FlexBox direction='column' justifyContent='center' alignItems='center' width='100%' height='100%' gap={4}>
              <SvgBox color={theme.ixoDarkOrange} svgWidth={30} svgHeight={30}>
                <ExclamationIcon />
              </SvgBox>
              <Typography variant='secondary' size='2xl'>
                Something went wrong. Please try again.
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button variant='secondary' onClick={() => history.goBack()} style={{ width: '100%' }}>
                Back
              </Button>
              <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
                Sign To Create
              </Button>
            </FlexBox>
          </>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default ReviewDAO
