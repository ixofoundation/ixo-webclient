import { FlexBox } from 'components/App/App.styles'
import { useGetJoiningAgentsByCollectionId } from 'graphql/iid'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { GetGranteeRole } from 'lib/protocol'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import AgentUserSection from './AgentUser'
import { AgentRoles } from 'types/models'
import { IAgent } from 'types/agent'
import { Loader } from '@mantine/core'
import DeedOfferForm from './DeedOfferForm'

let interval: any = undefined

const AgentUsers: React.FC = () => {
  const theme: any = useTheme()
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')

  const adminAddress = useCurrentEntityAdminAccount()
  const agents = useGetJoiningAgentsByCollectionId(collectionId)
  const [pendingAgents, setPendingAgents] = useState<IAgent[]>([])
  const [approvedAgents, setApprovedAgents] = useState<IAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<IAgent | undefined>(undefined)

  const selectedAgentIid = useMemo(() => {
    return agents.find((agent: any) =>
      agent.verificationMethod.some(
        (vm: any) => vm.type === 'CosmosAccountAddress' && vm.blockchainAccountID === selectedAgent?.address,
      ),
    )
  }, [agents, selectedAgent])

  const getAgentsRole = useCallback(async () => {
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
        const { submitAuth, evaluateAuth } = await GetGranteeRole({
          granteeAddress: agent.address,
          adminAddress,
          collectionId,
        })
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
    setLoading(false)
  }, [adminAddress, agents, collectionId])

  useEffect(() => {
    setLoading(true)

    getAgentsRole()
    interval = setInterval(() => {
      getAgentsRole()
    }, 5 * 1000)

    return () => {
      setPendingAgents([])
      setApprovedAgents([])
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(agents), collectionId])

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
