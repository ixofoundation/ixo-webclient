import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import ClaimTemplateCard from 'components/Modals/ClaimSetupModal/ClaimTemplateCard'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import { useQuery } from 'hooks/window'
import moment from 'moment'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { ReactComponent as ExclamationIcon } from 'assets/images/icon-exclamation-circle.svg'
import { NavLink, RouteComponentProps, useHistory } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { CreateCollection } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { utils } from '@ixo/impactxclient-sdk'

const ReviewClaim: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const theme: any = useTheme()
  const history = useHistory()
  const baseLink = match.path.split('/').slice(0, -1).join('/')

  const { signingClient, signer } = useAccount()
  const createEntityState = useCreateEntityState()
  const profile = createEntityState.profile
  const { entityType, service: serviceData, linkedEntity: linkedEntityData, creator, clearEntity } = createEntityState
  const { UploadLinkedResource, CreateProtocol, CreateEntityBase } = useCreateEntity()
  const [submitting, setSubmitting] = useState(false)
  const { getQuery } = useQuery()
  const success = getQuery('success')

  const handlePrev = () => {
    history.push(`${baseLink}/property`)
  }

  const handleSignToCreate = async (): Promise<void> => {
    setSubmitting(true)

    const accordedRight: AccordedRight[] = []
    const verification: Verification[] = []
    let service: Service[] = []
    let linkedEntity: LinkedEntity[] = []
    let linkedResource: LinkedResource[] = []
    const linkedClaim: LinkedClaim[] = []

    // AccordedRight TODO:

    // Service
    service = serviceData

    // LinkedEntity
    linkedEntity = Object.values(linkedEntityData)

    // LinkedResource
    linkedResource = linkedResource.concat(await UploadLinkedResource())

    // Create Protocol for claim
    const protocolDid = await CreateProtocol()
    if (!protocolDid) {
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }

    // Create Claim entity
    const { did: entityDid, adminAccount } = await CreateEntityBase(entityType, protocolDid, {
      service,
      linkedResource,
      accordedRight,
      linkedEntity,
      linkedClaim,
      verification,
      relayerNode: process.env.REACT_APP_RELAYER_NODE,
    })
    if (!entityDid) {
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }

    const res = await CreateCollection(signingClient, signer, {
      entityDid,
      protocolDid,
      paymentsAccount: adminAccount,
    })
    const collectionId = utils.common.getValueFromEvents(
      res!,
      'ixo.claims.v1beta1.CollectionCreatedEvent',
      'collection',
      (c) => c.id,
    )
    console.log({ collectionId })

    if (!collectionId) {
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }

    setSubmitting(false)
    history.push({ pathname: history.location.pathname, search: `?success=true` })
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <ClaimTemplateCard
        template={{
          id: '',
          type: profile?.type || '',
          title: profile?.name || '',
          description: profile?.description || '',
          creator: creator?.displayName,
          createdAt: moment(new Date()).format('DD-MMM-YYYY'),
        }}
      />
      <FlexBox direction='column' justifyContent='space-between' width='100%' style={{ flex: 1 }}>
        {!success && (
          <>
            <FlexBox direction='column' width='100%' gap={4}>
              <Typography variant='secondary'>
                This is the last step before creating this Verifiable Claim on the ixo Blockchain.
              </Typography>
              <Typography variant='secondary'>
                <NavLink to={`${baseLink}/collection`}>Review the Verifiable Claim details</NavLink> you have
                configured.
              </Typography>
              <Typography variant='secondary'>
                When you are ready to commit, sign with your DID Account keys, or{' '}
                <Typography variant='secondary' color='black'>
                  connect a different account
                </Typography>{' '}
                as the Verifiable Claim Creator.
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4} mt={4}>
              <Button variant='secondary' onClick={handlePrev} style={{ width: '100%' }}>
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
                {profile.name} Successfully created!
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button
                variant='primary'
                onClick={() => {
                  history.push(`/explore?type=${entityType.startsWith('protocol/') ? 'protocol' : entityType}`)
                  clearEntity()
                }}
                style={{ width: '100%' }}
              >
                Back to the Explorer
              </Button>
            </FlexBox>
          </>
        )}
        {success === 'false' && (
          <>
            <FlexBox
              direction='column'
              justifyContent='center'
              alignItems='center'
              width='100%'
              height='100%'
              gap={4}
              textAlign='center'
            >
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

export default ReviewClaim
