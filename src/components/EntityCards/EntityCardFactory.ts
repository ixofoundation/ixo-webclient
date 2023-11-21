import { EntityType } from 'types/entities'
import { DaoCard } from './DaoCard'
import ProtocolCard from 'pages/EntitiesExplorer/Components/EntityCard/ProtocolCard'
import OracleCard from 'pages/EntitiesExplorer/Components/EntityCard/OracleCard/OracleCard'
import InvestmentCard from 'pages/EntitiesExplorer/Components/EntityCard/InvestmentCard'
import { AssetCard } from './AssetCard'
import { ProjectCard } from './ProjectCard'

export const createEntityCard = (entityType: EntityType): React.ComponentType<any> => {
  switch (entityType) {
    case EntityType.Project:
      return ProjectCard
    case EntityType.Dao:
      return DaoCard
    case EntityType.Protocol:
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
