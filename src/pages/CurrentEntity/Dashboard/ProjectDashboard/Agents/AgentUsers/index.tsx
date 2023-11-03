import { FlexBox } from 'components/App/App.styles'
import { useGetJoiningAgentsByCollectionId } from 'graphql/iid'
import { useQuery } from 'hooks/window'
import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import AgentUserSection from './AgentUser'

const AgentUsers: React.FC = () => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  const joiningAgents = useGetJoiningAgentsByCollectionId(collectionId)
  const pendingAgents = useMemo(
    () =>
      joiningAgents
        .map(
          (agent: any) =>
            agent.verificationMethod.find((vm: any) => vm.type === 'CosmosAccountAddress')?.blockchainAccountID || '',
        )
        .filter(Boolean),
    [joiningAgents],
  )

  console.log({ pendingAgents })

  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <AgentUserSection title={'Pending approval'} agents={pendingAgents} />
      <FlexBox width='100%' height='1px' background={theme.ixoDarkBlue} />
    </FlexBox>
  )
}

export default AgentUsers
