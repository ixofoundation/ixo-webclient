import { AgentRoles } from './models'

export interface IAgent {
  address: string
  role: AgentRoles
  collectionId?: string
}
