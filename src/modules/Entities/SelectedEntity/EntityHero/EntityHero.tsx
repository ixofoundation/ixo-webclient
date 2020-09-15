import { EntityType } from 'modules/Entities/types'

interface Props {
  type: EntityType
  did: string
  bondDid: string
  name: string
  description: string
  dateCreated: string
  ownerName: string
  location: string
  sdgs: string[]
}
