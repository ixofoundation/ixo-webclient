import { FlexBox } from 'components/App/App.styles'
import { useGetJoiningAgentsByCollectionId } from 'graphql/iid'
import { useQuery } from 'hooks/window'
import { useEffect, useMemo, useState } from 'react'
import AgentUserSection from './AgentUser'
import { IAgent } from 'types/agent'
import { Loader } from '@mantine/core'
import DeedOfferForm from './DeedOfferForm'
import { useTheme } from 'styled-components'

const AgentUsers: React.FC = () => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  const { agents, pendingAgents, approvedAgents } = useGetJoiningAgentsByCollectionId(collectionId)
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<IAgent | undefined>(undefined)

  const selectedAgentIid = useMemo(() => {
    return agents.find((agent: any) =>
      agent.verificationMethod.some(
        (vm: any) => vm.type === 'CosmosAccountAddress' && vm.blockchainAccountID === selectedAgent?.address,
      ),
    )
  }, [agents, selectedAgent])

  useEffect(() => {
    const agentsExist = agents.length > 0
    const allAgentsLoaded = pendingAgents.length + approvedAgents.length === agents.length

    setLoading(agentsExist && !allAgentsLoaded)

    return () => {
      setLoading(true)
    }
  }, [agents, pendingAgents, approvedAgents])

  if (loading) {
    return (
      <FlexBox width='100%' $direction='column' $justifyContent='center' $alignItems='center'>
        <Loader color='ixo-blue.6' />
      </FlexBox>
    )
  }
  return (
    <FlexBox width='100%' $direction='column' $gap={6}>
      <AgentUserSection
        title={'Authorized'}
        agents={approvedAgents}
        noAction
        onClick={(agent) => setSelectedAgent((v) => (agent === v ? undefined : agent))}
      />
      <FlexBox width='100%' height='1px' background={theme.ixoDarkBlue} />
      <AgentUserSection
        title={'Pending approval'}
        agents={pendingAgents}
        onClick={(agent) => setSelectedAgent((v) => (agent === v ? undefined : agent))}
      />
      <FlexBox width='100%' height='1px' background={theme.ixoDarkBlue} />
      {selectedAgentIid && <DeedOfferForm collectionId={collectionId} agent={selectedAgentIid} />}
    </FlexBox>
  )
}

export default AgentUsers
