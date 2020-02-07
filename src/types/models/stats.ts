export interface Stats {
  claims: Claims
  totalServiceProviders: number
  totalProjects: number
  totalEvaluationAgents: number
}
interface Claims {
  total: number
  totalSuccessful: number
  totalSubmitted: number
  totalPending: number
  totalRejected: number
}
