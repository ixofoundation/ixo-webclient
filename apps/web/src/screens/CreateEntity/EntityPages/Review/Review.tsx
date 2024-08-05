import { ixo, utils } from '@ixo/impactxclient-sdk'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import {
  AccordedRight,
  LinkedClaim,
  LinkedEntity,
  LinkedResource,
  Service,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import { useQuery } from 'hooks/window'
import { Button } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as CheckCircleIcon } from '/public/assets/images/icon-check-circle.svg'
import { ReactComponent as ExclamationIcon } from '/public/assets/images/icon-exclamation-circle.svg'
import { useTheme } from 'styled-components'
import { CreationSuccessScreen } from './CreationSuccessScreen'
import { createEntityCard, withEntityData } from 'components'
import { EntityType } from 'types/entities'
import { Box } from '@mantine/core'
import { toRootEntityType } from 'utils/entities'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { currentRelayerNode } from 'constants/common'

const Review = ({ showNavigation = true }: { showNavigation?: boolean }): JSX.Element => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const createEntityState = useCreateEntityState()
  const profile = createEntityState.profile
  const {
    entityType,
    service: serviceData,
    linkedEntity: linkedEntityData,
    daoGroups,
    daoController,
    linkedResource: linkedResourceData,
    protocolId,
    clearEntity,
  } = createEntityState
  const { UploadLinkedResource, UploadLinkedClaim, CreateProtocol, CreateEntityBase } = useCreateEntity()
  const { pathname } = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const { getQuery } = useQuery()
  const success = getQuery('success')
  const { transaction, close } = useWallet()

  console.log({ entityType })

  // Handle final entity type properties in handleSignToCreate
  // Need to refactor using best practises
  const handleSignToCreate = async (): Promise<void> => {
    setSubmitting(true)

    const accordedRight: AccordedRight[] = []
    const verification: Verification[] = []
    let service: Service[] = []
    let linkedEntity: LinkedEntity[] = []
    let linkedResource: LinkedResource[] = []
    let linkedClaim: LinkedClaim[] = []
    let controller: string[] = []

    // AccordedRight TODO:

    // Service
    service = serviceData

    // LinkedEntity
    linkedEntity = Object.values(linkedEntityData)

    // LinkedResource
    linkedResource = linkedResource.concat(Object.values(linkedResourceData))
    linkedResource = linkedResource.concat(await UploadLinkedResource())

    // LinkedClaim
    linkedClaim = linkedClaim.concat(await UploadLinkedClaim())

    if (entityType === 'dao') {
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

      // controller
      controller = controller.concat([utils.did.generateWasmDid(daoControllerAddress)])
    }

    // Create Protocol for an entity
    let protocolDid = protocolId
    if (!protocolDid) {
      const protocolResponse = await CreateProtocol({ sequence: 1 })
      protocolDid = utils.common.getValueFromEvents(protocolResponse, 'wasm', 'token_id')
    }

    if (!protocolDid) {
      setSubmitting(false)
      navigate({ pathname: pathname, search: `?success=false` })
      return
    }

    // Create an entity
    const { did: entityDid } = await CreateEntityBase(
      entityType.replace('-', '/'),
      protocolDid,
      {
        service,
        linkedResource,
        accordedRight,
        linkedEntity,
        linkedClaim,
        verification,
        relayerNode: currentRelayerNode,
        ...(controller?.length > 0 && { controller }),
      },
      { sequence: 2, transactionSessionHash: transaction.transactionSessionHash },
    )
    if (!entityDid) {
      setSubmitting(false)
      navigate({ pathname: pathname, search: `?success=false` })
      return
    }

    close()
    setSubmitting(false)
    navigate({ pathname: pathname, search: `?success=true` })
  }

  const renderEntityCard = (type: string, entity: any) => {
    const EntityCard = createEntityCard(type as EntityType)
    const WrappedEntityCard = withEntityData(EntityCard)
    return (
      <Box w='360px' style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <WrappedEntityCard entity={entity} />
      </Box>
    )
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} $gap={10} $alignItems='stretch'>
      {renderEntityCard(entityType, { ...createEntityState })}
      <FlexBox $direction='column' $justifyContent='space-between' $gap={4} width='100%' style={{ flex: 1 }}>
        {!success && (
          <CreationSuccessScreen
            entityType={entityType}
            handleSignToCreate={handleSignToCreate}
            submitting={submitting}
            showNavigation={showNavigation}
          />
        )}
        {success === 'true' && (
          <>
            <FlexBox
              $direction='column'
              $justifyContent='center'
              $alignItems='center'
              width='100%'
              height='100%'
              $gap={4}
              $textAlign='center'
            >
              <SvgBox color={theme.ixoLightGreen} $svgWidth={30} $svgHeight={30}>
                <CheckCircleIcon />
              </SvgBox>
              <Typography variant='secondary' size='2xl'>
                {profile?.name} Successfully created!
              </Typography>
            </FlexBox>
            <FlexBox width='100%' $gap={4}>
              <Button
                variant='primary'
                onClick={() => {
                  navigate(`/explore?type=${toRootEntityType(entityType)}`)
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
            <FlexBox
              $direction='column'
              $justifyContent='center'
              $alignItems='center'
              width='100%'
              height='100%'
              $gap={4}
              $textAlign='center'
            >
              <SvgBox color={theme.ixoDarkOrange} $svgWidth={30} $svgHeight={30}>
                <ExclamationIcon />
              </SvgBox>
              <Typography variant='secondary' size='2xl'>
                Something went wrong. Please try again.
              </Typography>
            </FlexBox>
            {showNavigation && (
              <FlexBox width='100%' $gap={4}>
                <Button variant='secondary' onClick={() => navigate(-1)} style={{ width: '100%' }}>
                  Back
                </Button>
                <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
                  Sign To Create
                </Button>
              </FlexBox>
            )}
          </>
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default Review
