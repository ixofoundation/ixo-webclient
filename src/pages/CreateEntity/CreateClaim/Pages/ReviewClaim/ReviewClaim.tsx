import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { AccordedRight, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { TClaimMetadataModel } from 'types/protocol'
import * as Toast from 'utils/toast'
import ClaimCard from './ClaimCard'

const ReviewClaim: React.FC = (): JSX.Element => {
  const createEntityState = useCreateEntityState()
  const metadata: TClaimMetadataModel = createEntityState.metadata as TClaimMetadataModel
  const { entityType, service, linkedEntity, gotoStep } = createEntityState
  const { UploadLinkedResource, CreateProtocol, CreateEntityBase } = useCreateEntity()
  const [submitting, setSubmitting] = useState(false)

  const handleSignToCreate = async (): Promise<void> => {
    setSubmitting(true)

    const accordedRight: AccordedRight[] = [] // TODO:
    const verification: Verification[] = []
    let linkedResource: LinkedResource[] = []

    linkedResource = linkedResource.concat(await UploadLinkedResource())

    const protocolDid = await CreateProtocol()
    if (!protocolDid) {
      Toast.errorToast(`Create Entity Protocol Failed`)
      setSubmitting(false)
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
      Toast.successToast(`Create Entity Succeed`)
    } else {
      Toast.errorToast(`Create Entity Failed`)
    }
    setSubmitting(false)
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <ClaimCard
        type={metadata.type}
        title={metadata.title}
        description={metadata.description}
        numOfQuestions={Object.keys(metadata.questions).length}
      />
      <FlexBox direction='column' justifyContent='space-between' width='100%' style={{ flex: 1 }}>
        <FlexBox direction='column' width='100%' gap={4}>
          <Typography variant='secondary'>
            This is the last step before creating this Claim on the ixo Blockchain.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Review the Claim details
            </Typography>{' '}
            you have configured.
          </Typography>
          <Typography variant='secondary'>
            <Typography variant='secondary' color='blue'>
              Confirm the Headline Metric
            </Typography>{' '}
            that will be displayed on the Claim card.
          </Typography>
          <Typography variant='secondary'>
            When you are ready to commit, sign with your DID Account keys, or{' '}
            <Typography variant='secondary' color='blue'>
              connect a different account
            </Typography>{' '}
            as the Claim Creator.
          </Typography>
        </FlexBox>
        <FlexBox width='100%' gap={4} mt={4}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)} style={{ width: '100%' }}>
            Back
          </Button>
          <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
            Sign To Create
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default ReviewClaim
