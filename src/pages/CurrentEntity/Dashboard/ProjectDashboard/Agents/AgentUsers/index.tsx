import { FlexBox } from 'components/App/App.styles'
import { useGetJoiningAgentsByCollectionId } from 'graphql/iid'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { GetGranteeRole } from 'lib/protocol'
import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import AgentUserSection from './AgentUser'

const AgentUsers: React.FC = () => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  const adminAddress = useCurrentEntityAdminAccount()
  const agents = useGetJoiningAgentsByCollectionId(collectionId)
  const [pendingAgents, setPendingAgents] = useState<string[]>([])
  const [approvedAgents, setApprovedAgents] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const joiningAgents = agents
        .map(
          (agent: any) =>
            agent.verificationMethod.find((vm: any) => vm.type === 'CosmosAccountAddress')?.blockchainAccountID || '',
        )
        .filter(Boolean)

      const pendingAgents: string[] = []
      const approvedAgents: string[] = []
      for (const agent of joiningAgents) {
        try {
          const { submitAuth, evaluateAuth } = await GetGranteeRole({ granteeAddress: agent, adminAddress })
          if (submitAuth || evaluateAuth) {
            approvedAgents.push(agent)
          } else {
            pendingAgents.push(agent)
          }
        } catch (e) {
          console.error(e)
        }
      }
      setPendingAgents(pendingAgents)
      setApprovedAgents(approvedAgents)
    })()
  }, [adminAddress, agents])

  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <AgentUserSection title={'Authorized'} agents={approvedAgents} />
      <FlexBox width='100%' height='1px' background={theme.ixoDarkBlue} />
      <AgentUserSection title={'Pending approval'} agents={pendingAgents} />
      <FlexBox width='100%' height='1px' background={theme.ixoDarkBlue} />
    </FlexBox>
  )
}

export default AgentUsers
