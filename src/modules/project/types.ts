export interface Project {
  data: Data
  projectDid: string
  pubKey: string
  senderDid: string
  txHash: string
  status: string
}
export interface Data {
  [x: string]: any
  title: string
  projectDid: string
  ownerName: string
  ownerEmail: string
  shortDescription: string
  longDescription: string
  impactAction: string
  createdOn: Date
  createdBy: string
  projectLocation: string
  requiredClaims: number
  sdgs: number[]
  templates: Templates
  evaluatorPayPerClaim: string
  claimStats: ClaimStats
  claims: Claim[]
  agentStats?: AgentStats
  agents: Agent[]
  socialMedia: SocialMedia
  ixo: Ixo
  serviceEndpoint: string
  imageLink: string
  founder: Founder
}
interface Ixo {
  totalStaked: number
  totalUsed: number
}
export interface SocialMedia {
  facebookLink: string
  instagramLink: string
  twitterLink: string
  webLink: string
}
export interface Founder {
  name: string
  email: string
  countryOfOrigin: string
  shortDescription: string
  websiteURL: string
  logoLink: string
}
interface ClaimStats {
  currentSuccessful: number
  currentRejected: number
}
export interface Claim {
  date: Date
  location: Location
  claimId: string
  status: string
  saDid: string
  eaDid?: string
}
interface Location {
  long: string
  lat: string
}
interface Templates {
  claim: ClaimTemplate
}
interface ClaimTemplate {
  schema: string
  form: string
}
interface AgentStats {
  evaluators: number
  evaluatorsPending: number
  serviceProviders: number
  serviceProvidersPending: number
  investors: number
  investorsPending: number
}
export interface Agent {
  did: string
  status: string
  kyc?: boolean
  role: string
}
