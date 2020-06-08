import * as React from 'react'
import HeaderTabs from '../../../../common/components/HeaderTabs/HeaderTabs'
import Search from '../Search/Search'
import { contentType as ContentType } from '../../../../types/models'
import {
  ContainerInner,
  StatisticContainer,
  HeroInner,
  HeroContainer,
  HeroTextWrapper,
  HeroIndicatorsWrapper,
  ColorOverlay,
} from './EntitiesHero.styles'
import { EntityType, EntityTypeMap } from '../../types'
import ProjectHeaderSchema from './schema/ProjectHeader.schema.json'
import CellHeaderSchema from './schema/CellHeader.schema.json'
import InvestmentHeaderSchema from './schema/InvestmentHeader.schema.json'
import OracleHeaderSchema from './schema/OracleHeader.schema.json'
import TemplateHeaderSchema from './schema/TemplateHeader.schema.json'
import DataHeaderSchema from './schema/DataHeader.schema.json'

// TODO - when we know what the other entity types headers will look like then possibly refactor this as it's messy with all the conditions
// or whatever else is needed. For now, just doing it based on entityType

export interface Props {
  entityType: EntityType
  entitiesCount: number
  userEntitiesCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  contentType: ContentType
  handleChangeEntityTypes: (entityType: EntityType) => void
}

export const EntitiesHero: React.FunctionComponent<Props> = ({
  entityType,
  contentType,
  handleChangeEntityTypes: handleChangeEntityType,
}) => {
  const getSchema = (): Record<string, any> => {
    console.log('schema: ', DataHeaderSchema)
    switch (EntityTypeMap[entityType].title) {
      case 'Project':
        return ProjectHeaderSchema
      case 'Cell':
        return CellHeaderSchema
      case 'Investment':
        return InvestmentHeaderSchema
      case 'Oracle':
        return OracleHeaderSchema
      case 'Template':
        return TemplateHeaderSchema
      case 'Data':
        return DataHeaderSchema
      default:
        return null
    }
  }

  const getHeaderTabButtons = (): any => {
    const tabButtons = [
      {
        iconClass: `icon-${entityType.toLowerCase()}`,
        linkClass: entityType.toLowerCase(),
        path: '/',
        title: EntityTypeMap[entityType].plural.toUpperCase(),
        toolTip: null,
      },
    ]

    if (entityType === EntityType.Project) {
      tabButtons.push({
        iconClass: 'icon-impacts',
        linkClass: null,
        path: '/global-statistics',
        title: 'IMPACT',
        toolTip: null,
      })
    }

    return tabButtons
  }

  return (
    <HeroContainer
      style={{
        backgroundImage: (getSchema().header && getSchema().header.image) || '',
      }}
    >
      <ColorOverlay
        style={{
          backgroundColor:
            (getSchema().header && getSchema().header.color) ||
            EntityTypeMap[entityType].themeColor,
        }}
      ></ColorOverlay>
      <HeroInner className="container">
        <div className="row">
          <HeroTextWrapper className="col-md-5 col-sm-12 col-12">
            <h1>{getSchema().header && getSchema().header.title}</h1>
            <h3>{getSchema().header && getSchema().header.subTitle}</h3>
          </HeroTextWrapper>
          <HeroIndicatorsWrapper className="col-md-7 col-sm-12 col-12">
            <div className="row">
              {getSchema().header &&
                getSchema().header.indicators.map((indicator, index) => {
                  return indicator.indicatorLabel ? (
                    <StatisticContainer
                      key={index}
                      className="col-md-3 col-sm-6 col-6"
                    >
                      <ContainerInner
                        style={{
                          borderColor:
                            (getSchema().header && getSchema().header.color) ||
                            EntityTypeMap[entityType].themeColor,
                          color:
                            (getSchema().header && getSchema().header.color) ||
                            EntityTypeMap[entityType].themeColor,
                        }}
                      >
                        <h3>{indicator.indicatorSource}</h3>
                        <p>{indicator.indicatorLabel}</p>
                      </ContainerInner>
                    </StatisticContainer>
                  ) : null
                })}
            </div>
          </HeroIndicatorsWrapper>
        </div>
      </HeroInner>
      <HeaderTabs
        buttons={getHeaderTabButtons()}
        activeTabColor={EntityTypeMap[entityType].themeColor}
      />
      {contentType !== ContentType.dashboard && (
        <Search
          entityColor={EntityTypeMap[entityType].themeColor}
          entityType={entityType}
          filterChanged={handleChangeEntityType}
        />
      )}
    </HeroContainer>
  )
}
