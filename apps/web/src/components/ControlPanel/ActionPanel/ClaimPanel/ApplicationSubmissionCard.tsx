import { useWallet } from '@ixo-webclient/wallet-connector'
import { Box, Flex, Text, Button, Badge } from '@mantine/core'
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
      <Button w="100%" radius={4} size='md' disabled mt="md">
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
  return (
    <Box w='100%'>
      <Flex justify={'space-between'} align='center'>
        <Text>Role</Text>{' '}
        <Badge size='lg' c='black' leftSection={<LiaUserCircleSolid size={15} />}>
          Agent
        </Badge>
      </Flex>
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
  const { type, owner, accounts, verificationMethod } = useAppSelector(getEntityById(entityId))
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
