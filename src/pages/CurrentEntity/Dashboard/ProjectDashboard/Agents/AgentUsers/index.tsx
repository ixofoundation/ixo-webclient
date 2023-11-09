import { FlexBox } from 'components/App/App.styles'
import { useGetJoiningAgentsByCollectionId } from 'graphql/iid'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { GetGranteeRole } from 'lib/protocol'
import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import AgentUserSection from './AgentUser'
import { AgentRoles } from 'types/models'
import { IAgent } from 'types/agent'

const AgentUsers: React.FC = () => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  const adminAddress = useCurrentEntityAdminAccount()
  const agents = useGetJoiningAgentsByCollectionId(collectionId)
  const [pendingAgents, setPendingAgents] = useState<IAgent[]>([])
  const [approvedAgents, setApprovedAgents] = useState<IAgent[]>([])

  useEffect(() => {
    ;(async () => {
      const joiningAgents: IAgent[] = agents
        .map((agent: any) => ({
          address:
            agent.verificationMethod.find((vm: any) => vm.type === 'CosmosAccountAddress')?.blockchainAccountID || '',
          role:
            agent.linkedResource
              .find((item: any) => item.type === 'DeedOffer' && item.description.split('#')[0] === collectionId)
              ?.description.split('#')[1] ?? AgentRoles.serviceProviders,
        }))
        .filter(Boolean)

      const pendingAgents: IAgent[] = []
      const approvedAgents: IAgent[] = []
      for (const agent of joiningAgents) {
        try {
          const { submitAuth, evaluateAuth } = await GetGranteeRole({ granteeAddress: agent.address, adminAddress })
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

    return () => {
      setPendingAgents([])
      setApprovedAgents([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminAddress, JSON.stringify(agents)])

  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <AgentUserSection title={'Authorized'} agents={approvedAgents} noAction />
      <FlexBox width='100%' height='1px' background={theme.ixoDarkBlue} />
      <AgentUserSection title={'Pending approval'} agents={pendingAgents} />
      <FlexBox width='100%' height='1px' background={theme.ixoDarkBlue} />
    </FlexBox>
  )
}

export default AgentUsers
