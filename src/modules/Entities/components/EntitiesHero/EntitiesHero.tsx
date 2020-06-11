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
import { EntityType } from '../../types'
import { strategyMap } from '../../strategy-map'
import { ClaimInfoPage } from '../../../../common/components/SubmitClaimInfo/ClaimInfoPage'

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
  const entityStrategyMap = strategyMap[entityType]

  const getHeaderTabButtons = (): any => {
    const tabButtons = [
      {
        iconClass: `icon-${entityType.toLowerCase()}`,
        linkClass: entityType.toLowerCase(),
        path: '/',
        title: entityStrategyMap.plural.toUpperCase(),
      },
    ]

    if (entityType === EntityType.Project || entityType === EntityType.Cell) {
      tabButtons.push(
        {
          iconClass: 'icon-impacts',
          linkClass: null,
          path: '/global-statistics',
          title: 'IMPACT',
        },
        {
          iconClass: 'icon-economy',
          linkClass: 'in-active',
          path: '/economy',
          title: 'ECONOMY',
        },
      )
    }

    return tabButtons
  }

  return (
    <HeroContainer
      style={{
        backgroundImage:
          (entityStrategyMap.headerSchema.header &&
            entityStrategyMap.headerSchema.header.image) ||
          '',
      }}
    >
      <ColorOverlay
        style={{
          backgroundColor:
            (entityStrategyMap.headerSchema.header &&
              entityStrategyMap.headerSchema.header.color) ||
            entityStrategyMap.themeColor,
        }}
      ></ColorOverlay>
      <HeroInner className="container">
        <div className="row">
          <HeroTextWrapper className="col-md-5 col-sm-12 col-12">
            <h1>
              {entityStrategyMap.headerSchema.header &&
                entityStrategyMap.headerSchema.header.title}
            </h1>
            <h3>
              {entityStrategyMap.headerSchema.header &&
                entityStrategyMap.headerSchema.header.subTitle}
            </h3>
          </HeroTextWrapper>
          <HeroIndicatorsWrapper className="col-md-7 col-sm-12 col-12">
            <div className="row">
              {entityStrategyMap.headerSchema.header &&
                entityStrategyMap.headerSchema.header.indicators.map(
                  (indicator, index) => {
                    return indicator.indicatorLabel ? (
                      <StatisticContainer
                        key={index}
                        className="col-md-3 col-sm-6 col-6"
                      >
                        <ContainerInner
                          style={{
                            borderColor:
                              (entityStrategyMap.headerSchema.header &&
                                entityStrategyMap.headerSchema.header.color) ||
                              entityStrategyMap.themeColor,
                            color:
                              (entityStrategyMap.headerSchema.header &&
                                entityStrategyMap.headerSchema.header.color) ||
                              entityStrategyMap.themeColor,
                          }}
                        >
                          <h3>{indicator.indicatorSource}</h3>
                          <p>{indicator.indicatorLabel}</p>
                        </ContainerInner>
                      </StatisticContainer>
                    ) : null
                  },
                )}
            </div>
          </HeroIndicatorsWrapper>
        </div>
      </HeroInner>
      <HeaderTabs
        buttons={getHeaderTabButtons()}
        activeTabColor={entityStrategyMap.themeColor}
      />
      {contentType !== ContentType.dashboard && (
        <Search
          entityColor={entityStrategyMap.themeColor}
          entityType={entityType}
          filterChanged={handleChangeEntityType}
        />
      )}
      <ClaimInfoPage />
    </HeroContainer>
  )
}
