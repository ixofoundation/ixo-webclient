import { AgentRole, AgentRoleStrategyMap } from './types'

export const agentRoleMap: AgentRoleStrategyMap = {
  [AgentRole.Owner]: {
    title: 'Owner',
  },
  [AgentRole.Evaluator]: {
    title: 'Evaluator',
  },
  [AgentRole.Investor]: {
    title: 'Investor',
  },
  [AgentRole.ServiceProvider]: {
    title: 'Service Provider',
  },
}
