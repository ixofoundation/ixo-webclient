import * as React from 'react'
import HeaderTabs from 'common/components/HeaderTabs/HeaderTabs'
import Search from '../Search/Search'
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
import { entityTypeMap } from '../../strategy-map'

// TODO - when we know what the other entity types headers will look like then possibly refactor this as it's messy with all the conditions
// or whatever else is needed. For now, just doing it based on entityType
import { getHeaderSchema, getHeaderTabButtons } from './EntitiesHero.utils'

export interface Props {
  entityType: EntityType
  showSearch: boolean
  filterSector: string
  handleChangeEntitiesType: (entityType: EntityType) => void
}

export const EntitiesHero: React.FunctionComponent<Props> = ({
  entityType,
  showSearch,
  filterSector,
  handleChangeEntitiesType,
}) => {
  const entityStrategyMap = entityTypeMap[entityType]
  const header = getHeaderSchema(filterSector, entityStrategyMap.headerSchema)
  const headerTabButtons = getHeaderTabButtons(
    entityType,
    entityStrategyMap.plural.toUpperCase(),
  )

  const getHeaderBackgroundUrl = (imagePath: string): string => {
    if (imagePath !== null) {
      return `url(${require(`assets/images/header-overrides/${imagePath}`)})`
    }
    return ''
  }

  return (
    <HeroContainer
      style={{
        backgroundImage: getHeaderBackgroundUrl(header.image),
      }}
    >
      <ColorOverlay
        style={{
          backgroundColor: header.color || entityStrategyMap.themeColor,
        }}
      ></ColorOverlay>
      <HeroInner className="container">
        <div className="row">
          <HeroTextWrapper className="col-md-5 col-sm-12 col-12">
            <h1>{header.title}</h1>
            <h3>{header.subTitle}</h3>
          </HeroTextWrapper>
          <HeroIndicatorsWrapper className="col-md-7 col-sm-12 col-12">
            <div className="row">
              {header.indicators.map((indicator, index) => {
                return indicator.indicatorLabel ? (
                  <StatisticContainer
                    key={index}
                    className="col-md-3 col-sm-6 col-6"
                  >
                    <ContainerInner
                      style={{
                        borderColor:
                          header.color || entityStrategyMap.themeColor,
                        color: header.color || entityStrategyMap.themeColor,
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
        buttons={headerTabButtons}
        activeTabColor={entityStrategyMap.themeColor}
        enableAssistantButton={true}
      />
      {showSearch && (
        <Search
          entityColor={entityStrategyMap.themeColor}
          entityType={entityType}
          filterChanged={handleChangeEntitiesType}
        />
      )}
    </HeroContainer>
  )
}
