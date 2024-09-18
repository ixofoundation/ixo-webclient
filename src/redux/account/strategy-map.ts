import { AgentRole, AgentRoleStrategyMap } from './account.types'

export const agentRoleMap: AgentRoleStrategyMap = {
  [AgentRole.Owner]: {
    title: 'Owner',
    plural: 'Owners',
  },
  [AgentRole.Evaluator]: {
    title: 'Evaluator',
    plural: 'Evaluators',
  },
  [AgentRole.Investor]: {
    title: 'Investor',
    plural: 'Investors',
  },
  [AgentRole.ServiceProvider]: {
    title: 'Service Provider',
    plural: 'Service Providers',
  },
}
