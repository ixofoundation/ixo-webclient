import { AgentRole } from 'redux/account/account.types'
import { AgentStatus } from 'redux/selectedEntityAgents/entityAgents.types'

export interface ApiEntityAgent {
  name: string
  email: string
  agentDid: string
  role: AgentRole
  currentStatus: { version: string; status: AgentStatus }
}

export interface ApiListEntityAgentsPayload {
  projectDid: string
  role: string
}

export interface ApiUpdateEntityAgentPayload {
  agentDid: string
  version: string
  status: AgentStatus
  projectDid: string
  role: AgentRole
}

export interface ApiCreateEntityAgentPayload {
  email: string
  name: string
  role: AgentRole
  agentDid: string
  projectDid: string
}
