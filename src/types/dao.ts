/**
 * @example
  {
    "avatar": "https://randomuser.me/api/portraits/men/71.jpg",
    "name": "Jane Doe",
    "address": "ixo19h3lqj50uhzdrv8mkafnp55nqmz4ghc2sd3m48",
    "role": "Blockchain developer",
    "votingPower": 1.12,
    "staking": 50,
    "votes": 45,
    "proposals": 4,
    "status": "approved",
    "verified": false,
    "administrator": true,
    "assignedAuthority": 24.51
  }
 */
export interface IDAOMember {
  avatar?: string
  name?: string
  address: string
  role?: string
  votingPower: number
  staking: number
  votes: number
  proposals: number
  status: string // approved | rejected | pending
  verified?: boolean
  administrator?: boolean
  assignedAuthority: number
}
