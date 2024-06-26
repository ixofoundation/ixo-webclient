import { useWallet } from '@ixo-webclient/wallet-connector'
import { Box, Flex, Text, Button, Badge, Grid } from '@mantine/core'
import { useGetIid } from 'graphql/iid'
import { useGetUserGranteeRole } from 'hooks/claim'
import { useMemo } from 'react'
import { LiaUserCircleSolid } from 'react-icons/lia'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { AgentRoles } from 'types/models'
import { toRootEntityType } from 'utils/entities'

const Apply = ({ collectionId }: { collectionId: string }) => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { type } = useAppSelector(getEntityById(entityId))
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const openForm = (role: AgentRoles) => {
    return () => {
      const currentSearchParams = new URLSearchParams(window.location.search)
      currentSearchParams.append('agentRole', role)
      currentSearchParams.append('collectionId', collectionId)
      navigate({ pathname: pathname, search: currentSearchParams.toString() })
    }
  }

  return (
    <Box>
      <Text fw='bolder'>Contribute to this {toRootEntityType(type)}</Text>
      <Flex gap={10} mt={10} direction={'column'}>
        <Button radius={4} size='md' onClick={openForm(AgentRoles.serviceProviders)}>
          Apply as a Service Agent
        </Button>
        <Button radius={4} size='md' onClick={openForm(AgentRoles.evaluators)}>
          Offer Oracle Services
        </Button>
        <Button radius={4} size='md' disabled>
          Make a Financial Contribution
        </Button>
      </Flex>
    </Box>
  )
}

const ApplicationUnderReview = () => {
  return (
    <Box w='100%'>
      <Text>You have to be approved as an Agent to submit claims.</Text>
      <Button w='100%' radius={4} size='md' disabled mt='md'>
        Application under review
      </Button>
    </Box>
  )
}

const SubmitClaim = ({ data }: { data: any }) => {
  const { entityId = '' } = useParams()
  const { claim } = useAppSelector(getEntityById(entityId))
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const collectionProtocol = data?.collection?.protocol

  const claimWithProtocol = useMemo(() => {
    return Object.values(claim ?? {}).find((c) => c.template?.id.split('#')[0] === collectionProtocol)
  }, [claim, collectionProtocol])

  const openClaimForm = () => {
    const currentSearchParams = new URLSearchParams(window.location.search)
    currentSearchParams.append('claimId', claimWithProtocol?.id ?? '')
    navigate({ pathname: pathname, search: currentSearchParams.toString() })
  }

  const { pending, approved, disputed, rejected } = useMemo(() => {
    let pending = 0,
      approved = 0,
      disputed = 0,
      rejected = 0
    data.collection?.claimsByCollectionId?.nodes?.map((claim: any) => {
      if (claim?.paymentsStatus?.approval === 'PAID') {
        approved++
      }
      if (claim?.paymentsStatus?.rejection === 'AUTHORIZED') {
        rejected++
      }
      if (
        claim?.paymentsStatus?.approval === 'NO_PAYMENT' &&
        claim?.paymentsStatus?.rejection === 'NO_PAYMENT' &&
        claim?.paymentsStatus?.submission === 'PAID'
      ) {
        pending++
      }
      if (claim?.paymentsStatus?.approval === 'DISPUTED') {
        disputed++
      }
    })
    return { pending, approved, disputed, rejected }
  }, [data.collection?.claimsByCollectionId?.nodes])


  return (
    <Box w='100%'>
      <Flex justify={'space-between'} align='center'>
        <Text>Role</Text>{' '}
        <Badge size='lg' c='black' leftSection={<LiaUserCircleSolid size={15} />}>
          Agent
        </Badge>
      </Flex>
      <Grid mt={'md'}>
        <Grid.Col span={6}>
          <Badge
            c='black'
            leftSection={<Box bg='blue' h='12' w='12' style={{ borderRadius: '100%' }} />}
            color='gray.2'
            size='lg'
            w='100%'
          >
            {pending} pending
          </Badge>
        </Grid.Col>
        <Grid.Col span={6}>
          <Badge
            c='black'
            leftSection={<Box bg='green' h='12' w='12' style={{ borderRadius: '100%' }} />}
            color='gray.2'
            size='lg'
            w='100%'
          >
            {approved} approved
          </Badge>
        </Grid.Col>
        <Grid.Col span={6}>
          <Badge
            c='black'
            leftSection={<Box bg='orange' h='12' w='12' style={{ borderRadius: '100%' }} />}
            color='gray.2'
            size='lg'
            w='100%'
          >
            {disputed} disputed
          </Badge>
        </Grid.Col>
        <Grid.Col span={6}>
          <Badge
            c='black'
            leftSection={<Box bg='red' h='12' w='12' style={{ borderRadius: '100%' }} />}
            color='gray.2'
            size='lg'
            w='100%'
          >
            {rejected} rejected
          </Badge>
        </Grid.Col>
      </Grid>
      <Button w='100%' radius={4} size='md' mt='md' onClick={openClaimForm}>
        Submit new Claim
      </Button>
    </Box>
  )
}

const ApplicationSubmissionCard = ({ data }: { data: any }) => {
  const { wallet } = useWallet()
  const { data: iid } = useGetIid(wallet?.did ?? '')
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { owner, accounts, verificationMethod } = useAppSelector(getEntityById(entityId))
  const userRole = useGetUserGranteeRole(wallet?.address ?? '', owner, accounts, verificationMethod)

  const applicationSent = useMemo(() => {
    return iid?.linkedResource.some(
      (v) =>
        v.id === `{id}#offer#${data?.collection?.id}` &&
        v.type === 'DeedOffer' &&
        v.description.split('#')[0] === data?.collection?.id,
    )
  }, [iid?.linkedResource, data.collection?.id])

  return (
    <Box mt={15} bg='#fff' p={20} style={{ borderRadius: 12 }}>
      {!applicationSent && <Apply collectionId={data?.collection?.id} />}
      {applicationSent && !userRole && <ApplicationUnderReview />}
      {applicationSent && userRole && <SubmitClaim data={data} />}
    </Box>
  )
}

export default ApplicationSubmissionCard
