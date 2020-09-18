import { AgentRole } from 'modules/Account/types'
import { AgentStatus } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/types'

export interface ApiEntityAgent {
  name: string
  email: string
  agentDid: string
  role: AgentRole
  currentStatus: AgentStatus
}

export interface ApiListEntityAgentsPayload {
  projectDid: string
  role: string
}

export interface ApiUpdateEntityAgentPayload {
  agentDid: string
  status: AgentStatus
  projectDid: string
  role: AgentRole
}
