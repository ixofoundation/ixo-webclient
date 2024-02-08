import { Flex } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Button } from 'pages/CreateEntity/Components'
import { ProjectCreationSuccess } from './ProjectCreationSuccessDetails'
import { DaoCreationSuccess } from './DaoCreationSuccessDetails'
import { ClaimCreationSuccess } from './ClaimCreationSuccessDetails.tsx'
import { DeedCreationSuccessScreen } from './DeedCreationSuccessDetails'
import { OracleCreationSuccess } from './OracleCreationSuccessDetails'
import { InvestmentCreationSuccess } from './InvestmentCreationSuccessDetails'

type CreationSuccessScreenProps = {
  entityType: string
  submitting: boolean
  handleSignToCreate: () => void
}

export const CreationSuccessScreen = ({ entityType, submitting, handleSignToCreate }: CreationSuccessScreenProps) => {
  const navigate = useNavigate()
  const CreationSuccessMap = {
    project: <ProjectCreationSuccess />,
    dao: <DaoCreationSuccess />,
    'protocol/claim': <ClaimCreationSuccess />,
    'protocol/deed': <DeedCreationSuccessScreen />,
    oracle: <OracleCreationSuccess />,
    protocol: <ClaimCreationSuccess />,
    investment: <InvestmentCreationSuccess />,
  }

  return (
    <Flex direction='column' justify={'space-between'} gap={4} h='100%'>
      <Flex direction='column' gap={4} style={{ width: '100%' }}>
        {CreationSuccessMap[entityType]}
      </Flex>
      <Flex gap={4} style={{ width: '100%' }}>
        {/* <Button
          variant='outline'
          bg='white'
          c={'black'}
          onClick={() => navigate(-1)}
          style={{ borderColor: mantineThemeColors['ixo-blue'][6] }}
        >
          Back
        </Button>
        <Button bg='ixo-blue.6' variant='primary' onClick={handleSignToCreate} loading={submitting}>
          Sign To Create
        </Button> */}
        <Button variant='secondary' onClick={() => navigate(-1)} style={{ width: '100%' }}>
          Back
        </Button>
        <Button variant='primary' onClick={handleSignToCreate} style={{ width: '100%' }} loading={submitting}>
          Sign To Create
        </Button>
      </Flex>
    </Flex>
  )
}
