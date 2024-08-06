import Image from 'next/image'
import { Card } from 'screens/CurrentEntity/Components'
import { Flex } from '@mantine/core'
import { useClaimSetting } from 'hooks/claim'
import { Typography } from 'components/Typography'
import { useGetClaimTemplateEntityByClaimId, useGetClaimsByEntityId } from 'graphql/claims'
import { useParams } from 'react-router-dom'
import { Claim } from 'generated/graphql'
import { timeAgo } from 'utils/time'
import { IconCheckInCircle } from 'components/IconPaths'

interface ClaimItemProps {
  claim: Claim
}
const ClaimItem: React.FC<ClaimItemProps> = ({ claim }) => {
  const Setting = useClaimSetting()
  const claimTemplateEntity = useGetClaimTemplateEntityByClaimId(claim.claimId)

  return (
    <Flex
      w='100%'
      h={66}
      pos='relative'
      bg={'#0C3549'}
      justify='space-between'
      align={'center'}
      px={16}
      style={{ borderRadius: 4, cursor: 'pointer' }}
    >
      <Flex
        pos='absolute'
        top='50%'
        left='0px'
        w='8px'
        h='24px'
        bg={Setting[claim.evaluationByClaimId?.status || 0]?.color}
        style={{ transform: 'translate(-50%, -50%)', borderRadius: 100 }}
      />

      <Flex direction={'column'}>
        <Typography color='white' size='base'>
          {claimTemplateEntity?.profile?.name}
        </Typography>
        <Typography color='light-grey-blue' size='sm'>
          {claim.claimId}
        </Typography>
      </Flex>

      <Flex style={{ textAlign: 'right' }}>
        <Typography color='light-grey-blue' size='sm'>
          {timeAgo.format(new Date(claim.submissionDate))}
        </Typography>
      </Flex>
    </Flex>
  )
}

const LatestClaimsCard: React.FC = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const { data: claims } = useGetClaimsByEntityId(entityId!)

  return (
    <Card label='Latest claims' icon={IconCheckInCircle}>
      <Flex w='100%' direction={'column'} gap={8}>
        {claims.slice(0, 3).map((claim: Claim) => (
          <ClaimItem key={claim.claimId} claim={claim} />
        ))}
      </Flex>
    </Card>
  )
}

export default LatestClaimsCard
