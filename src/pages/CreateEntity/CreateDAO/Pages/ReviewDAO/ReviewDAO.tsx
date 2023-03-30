import { ixo } from '@ixo/impactxclient-sdk'
import { Verification } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/tx'
import { AccordedRight, LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import { useQuery } from 'hooks/window'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TDAOMetadataModel } from 'types/protocol'
import * as Toast from 'utils/toast'
import DAOCard from './DAOCard'
import { ReactComponent as CheckCircleIcon } from 'assets/images/icon-check-circle.svg'
import { ReactComponent as ExclamationIcon } from 'assets/images/icon-exclamation-circle.svg'

const ReviewDAO: React.FC = (): JSX.Element => {
  const history = useHistory()
  const createEntityState = useCreateEntityState()
  const metadata: TDAOMetadataModel = createEntityState.metadata as TDAOMetadataModel
  const { service, linkedEntity, daoGroups, daoController, gotoStep } = createEntityState
  const {
    // CreateDAO,
    // CreateDAOCredsIssuer,
    SaveProfile,
    SaveCreator,
    SaveAdministrator,
    SavePage,
    SaveTags,
    CreateProtocol,
    CreateEntityBase,
  } = useCreateEntity()
  const [submitting, setSubmitting] = useState(false)
  const { getQuery } = useQuery()
  const success = getQuery('success')

  const numOfMembers = useMemo(() => {
    const daoGroup = daoGroups[daoController]
    if (!daoGroup) {
      return 0
    }
    if (daoGroup.type !== 'staking') {
      return daoGroup.memberships.reduce((acc, cur) => acc + cur.members.length, 0)
    }
    return daoGroup.staking?.distributions.reduce((acc, cur) => acc + cur.members.length, 0) ?? 0
  }, [daoGroups, daoController])

  const handleSignToCreate = async (): Promise<void> => {
    setSubmitting(true)
    // const daoDid = 'did:ixo:entity:cf16fe551153ec5a1b96be3f59b2ec98'
    // const daoDid = await CreateDAO()
    // if (!daoDid) {
    //   Toast.errorToast(`Create DAO Failed`)
    //   return
    // } else {
    //   Toast.successToast(`Create DAO Succeed`)
    // }

    const daoCredsIssuerDid = 'did:ixo:entity:c4a5588bdd7f651f5f5e742887709d57'
    // const daoCredsIssuerDid = await CreateDAOCredsIssuer(daoDid)
    // if (!daoCredsIssuerDid) {
    //   Toast.errorToast(`Create DAO Creds Issuer Failed`)
    //   return
    // } else {
    //   Toast.successToast(`Create DAO Creds Issuer Succeed`)
    // }

    const [saveProfileRes, saveCreatorRes, saveAdministratorRes, savePageRes, saveTagsRes] = await Promise.allSettled([
      await SaveProfile(),
      await SaveCreator(daoCredsIssuerDid),
      await SaveAdministrator(daoCredsIssuerDid),
      await SavePage(),
      await SaveTags(),
    ]).then((responses) => responses.map((response: any) => response.value))

    const linkedResource: LinkedResource[] = []
    const accordedRight: AccordedRight[] = [] // TODO:
    const verification: Verification[] = []

    if (saveProfileRes) {
      linkedResource.push({
        id: '{id}#profile',
        type: 'Settings',
        description: 'Profile',
        mediaType: 'application/ld+json',
        serviceEndpoint: saveProfileRes.url,
        proof: saveProfileRes.cid,
        encrypted: 'false',
        right: '',
      })
    }
    if (saveCreatorRes) {
      linkedResource.push({
        id: '{id}#creator',
        type: 'VerifiableCredential',
        description: 'Creator',
        mediaType: 'application/ld+json',
        serviceEndpoint: `#cellnode-pandora/public/${saveCreatorRes.key}`,
        proof: saveCreatorRes.key,
        encrypted: 'false',
        right: '',
      })
    }
    if (saveAdministratorRes) {
      linkedResource.push({
        id: '{id}#administrator',
        type: 'VerifiableCredential',
        description: 'Administrator',
        mediaType: 'application/ld+json',
        serviceEndpoint: `#cellnode-pandora/public/${saveAdministratorRes.key}`,
        proof: saveAdministratorRes.key,
        encrypted: 'false',
        right: '',
      })
    }
    if (savePageRes) {
      linkedResource.push({
        id: '{id}#page',
        type: 'Settings',
        description: 'Page',
        mediaType: 'application/ld+json',
        serviceEndpoint: `#cellnode-pandora/public/${savePageRes.key}`,
        proof: savePageRes.key,
        encrypted: 'false',
        right: '',
      })
    }
    if (saveTagsRes) {
      linkedResource.push({
        id: '{id}#tags',
        type: 'Settings',
        description: 'Tags',
        mediaType: 'application/ld+json',
        serviceEndpoint: `#cellnode-pandora/public/${saveTagsRes.key}`,
        proof: saveTagsRes.key,
        encrypted: 'false',
        right: '',
      })
    }
    // if (saveClaimsRes) {
    //   linkedResource.push({
    //     id: '{id}#claims',
    //     type: 'Settings',
    //     description: 'Claims',
    //     mediaType: 'application/ld+json',
    //     serviceEndpoint: `#cellnode-pandora/public/${saveClaimsRes.key}`,
    //     proof: saveClaimsRes.key,
    //     encrypted: 'false',
    //     right: '',
    //   })
    // }

    const daoControllerAddress = daoGroups[daoController]?.contractAddress
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

    const protocolDid = await CreateProtocol()
    if (!protocolDid) {
      Toast.errorToast(`Create Entity Protocol Failed`)
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }
    const entityDid = await CreateEntityBase('dao', protocolDid, {
      service,
      linkedResource,
      accordedRight,
      linkedEntity: Object.values(linkedEntity),
      verification,
    })
    if (!entityDid) {
      Toast.errorToast(`Create Entity Failed`)
      setSubmitting(false)
      history.push({ pathname: history.location.pathname, search: `?success=false` })
      return
    }
    Toast.successToast(`Create Entity Succeed`)

    setSubmitting(false)
    history.push({ pathname: history.location.pathname, search: `?success=true` })
  }

  return (
    <FlexBox width={`${deviceWidth.tablet}px`} gap={10} alignItems='stretch'>
      <DAOCard image={metadata?.image ?? ''} name={metadata?.name ?? ''} numberOfMembers={numOfMembers} />
      <FlexBox direction='column' justifyContent='space-between' gap={4} width='100%' style={{ flex: 1 }}>
        {!success && (
          <>
            <FlexBox direction='column' width='100%' gap={4}>
              <Typography variant='secondary'>
                This is the last step before creating this DAO on the ixo Blockchain.
              </Typography>
              <Typography variant='secondary'>
                <Typography variant='secondary' color='blue'>
                  Review the DAO details
                </Typography>{' '}
                you have configured.
              </Typography>
              <Typography variant='secondary'>
                <Typography variant='secondary' color='blue'>
                  View the DAO Groups
                </Typography>{' '}
                you have added.
              </Typography>
              <Typography variant='secondary'>
                <Typography variant='secondary' color='blue'>
                  Confirm the Headline Metric
                </Typography>{' '}
                that will be displayed on the DAO card.
              </Typography>
              <Typography variant='secondary'>
                When you are ready to commit, sign with your DID Account keys, or{' '}
                <Typography variant='secondary' color='blue'>
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
                {metadata?.name} Successfully created!
              </Typography>
            </FlexBox>
            <FlexBox width='100%' gap={4}>
              <Button variant='primary' onClick={() => history.push('/explore?type=dao')} style={{ width: '100%' }}>
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
