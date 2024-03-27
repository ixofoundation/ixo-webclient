import { EntityType } from 'types/entities'
import { DaoCard } from './DaoCard'
import ProtocolCard from 'pages/EntitiesExplorer/Components/EntityCard/ProtocolCard'
import InvestmentCard from 'pages/EntitiesExplorer/Components/EntityCard/InvestmentCard'
import { OracleCard } from './OracleCard'
import { AssetCard } from './AssetCard'
import { ProjectCard } from './ProjectCard'

export const createEntityCard = (entityType: EntityType): React.ComponentType<any> => {
  switch (entityType) {
    case EntityType.Project:
      return ProjectCard
    case EntityType.Dao:
      return DaoCard
    case EntityType.Protocol:
    case EntityType.ProtocolClaim:
    case EntityType.ProtocolDeed:
      return ProtocolCard
    case EntityType.Oracle:
      return OracleCard
    case EntityType.Investment:
      return InvestmentCard
    case EntityType.Asset:
      return AssetCard
    default:
      return AssetCard
  }
}
