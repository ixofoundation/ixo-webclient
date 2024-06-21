import { Box, Button, Flex, Text } from '@mantine/core'
import { SvgBox } from 'components/App/App.styles'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { useGetUserGranteeRole } from 'hooks/claim'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AgentRoles } from 'types/models'
import { useGetClaimCollectionsByEntityId, useGetClaimTemplateEntityByCollectionId } from 'graphql/claims'
import { useState } from 'react'
import { ClaimCollection } from 'generated/graphql'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { useQuery } from 'hooks/window'
import OfferForm from 'pages/CurrentEntity/Overview/OfferForm'

interface OfferBoxProps {
  collection: ClaimCollection
  selectedCollectionId: string
  setSelectedCollectionId: (selectedCollectionId: string) => void
}

export const OfferBox: React.FC<OfferBoxProps> = ({ collection, selectedCollectionId, setSelectedCollectionId }) => {
  const collectionId = collection.id
  const claimTemplateEntity = useGetClaimTemplateEntityByCollectionId(collectionId!)

  return (
    <Flex direction='column' align='center' gap={4}>
      <PropertyBox
        icon={<ClaimIcon />}
        required={true}
        set={true}
        size={70}
        hovered={!!collectionId && selectedCollectionId === collectionId}
        handleClick={(): void => {
          collectionId && setSelectedCollectionId(collectionId)
        }}
      />
      <Text
        variant='primary'
        size='xs'
        c={selectedCollectionId === collectionId ? 'blue' : 'black'}
        style={{ width: 70, textAlign: 'center' }}
      >
        {claimTemplateEntity?.profile?.name}
      </Text>
    </Flex>
  )
}

const ClaimPanel = ({ data }: { data: any }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('')
  const { wallet } = useWallet()

  const { getQuery } = useQuery()
  const claimCollectionId = getQuery('collectionId')
  const agentRole = getQuery('agentRole')

  const { entityId = '' } = useParams<{ entityId: string }>()
  const entity = useAppSelector(getEntityById(entityId))

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { data: claimCollections } = useGetClaimCollectionsByEntityId(entityId)

  const userRole = useGetUserGranteeRole(
    wallet?.address ?? '',
    entity.owner,
    entity.accounts,
    entity.verificationMethod,
  )

  const applicationRequired = userRole !== AgentRoles.serviceProviders

  const handleApply = (role: AgentRoles) => {
    return () => {
      const search = new URLSearchParams()
      search.append('collectionId', selectedCollectionId ?? '')
      search.append('agentRole', role)
      navigate({ pathname: pathname, search: search.toString() })
    }
  }

  const handleSubmitClaim = () => {
    const search = new URLSearchParams()
    search.append('claimId', data.id ?? '')
    navigate({ pathname: pathname, search: search.toString() })
  }

  if (claimCollectionId && agentRole) {
    return <OfferForm claimCollectionId={claimCollectionId} agentRole={agentRole} />
  }

  return (
    <Flex style={{ borderRadius: 12 }} bg='#fff' p={20} direction={'column'}>
      <Flex align={'center'}>
        <SvgBox $svgWidth={5} $svgHeight={5} color={primaryColor}>
          <ClaimIcon />
        </SvgBox>
        <Text ml={10}>{data.template?.title}</Text>
      </Flex>
      {applicationRequired && (
        <Box mt={15}>
          {claimCollections.map((collection: ClaimCollection) => (
            <OfferBox
              key={collection.id}
              collection={collection}
              selectedCollectionId={selectedCollectionId}
              setSelectedCollectionId={setSelectedCollectionId}
            />
          ))}
          <Text fw='bold'>Apply as:</Text>
          <Flex gap={5} mt={5}>
            <Button size='compact-md' onClick={handleApply(AgentRoles.serviceProviders)}>
              Apply as agent
            </Button>
            <Button size='compact-md' onClick={handleApply(AgentRoles.evaluators)}>
              Apply as evaluator
            </Button>
          </Flex>
        </Box>
      )}
      {!applicationRequired && <Button size='compact-md' onClick={handleSubmitClaim} mt={15}>Submit Claim</Button>   }
    </Flex>
  )
}

export default ClaimPanel
