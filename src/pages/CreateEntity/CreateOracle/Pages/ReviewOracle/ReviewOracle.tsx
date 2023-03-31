import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { AccordedRight, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import { useQuery } from 'hooks/window'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { TOracleMetadataModel } from 'types/protocol'
import OracleCard from './OracleCard'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { ReactComponent as ExclamationIcon } from 'assets/images/icon-exclamation-circle.svg'

const ReviewOracle: React.FC = (): JSX.Element => {
  const history = useHistory()
  const createEntityState = useCreateEntityState()
  const metadata: TOracleMetadataModel = createEntityState.metadata as TOracleMetadataModel
  const { entityType, service, linkedEntity, gotoStep, gotoStepByNo } = createEntityState
  const { UploadLinkedResource, CreateProtocol, CreateEntityBase } = useCreateEntity()
  const [submitting, setSubmitting] = useState(false)
  const { getQuery } = useQuery()
  const success = getQuery('success')

  const handleSignToCreate = async (): Promise<void> => {
    setSubmitting(true)

    const accordedRight: AccordedRight[] = [] // TODO:
    const verification: Verification[] = []
    let linkedResource: LinkedResource[] = []

    linkedResource = linkedResource.concat(await UploadLinkedResource())

    const protocolDid = await CreateProtocol()
    if (!protocolDid) {
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }
    const entityDid = await CreateEntityBase(entityType, protocolDid, {
      service,
      linkedResource,
      accordedRight,
      linkedEntity: Object.values(linkedEntity),
      verification,
    })
    if (entityDid) {
      history.push({ pathname: history.location.pathname, search: `?success=true` })
    } else {
      history.push({ pathname: history.location.pathname, search: `?success=false` })
    }
    setSubmitting(false)
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <OracleCard image={metadata?.image ?? ''} icon={metadata?.icon ?? ''} name={metadata?.name ?? ''} />
      <FlexBox direction='column' justifyContent='space-between' width='100%' style={{ flex: 1 }}>
        {!success && (
          <>
            <FlexBox direction='column' width='100%' gap={4}>
              <Typography variant='secondary'>
                This is the last step before creating this Oracle on the ixo Blockchain.
              </Typography>
              <Typography variant='secondary'>
                <NavLink to={'/create/entity/oracle/setup-metadata'} onClick={() => gotoStepByNo(2)}>
                  Review the Oracle details
                </NavLink>{' '}
                you have configured.
              </Typography>
              <Typography variant='secondary'>
                <Typography variant='secondary' color='blue'>
                  Confirm the Headline Metric
                </Typography>{' '}
                that will be displayed on the Oracle card.
              </Typography>
              <Typography variant='secondary'>
                When you are ready to commit, sign with your DID Account keys, or{' '}
                <Typography variant='secondary' color='blue'>
                  connect a different account
                </Typography>{' '}
                as the Oracle Creator.
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
                {metadata?.name} Successfully created!
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button
                variant='primary'
                onClick={() => history.push(`/explore?type=${entityType}`)}
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

export default ReviewOracle
