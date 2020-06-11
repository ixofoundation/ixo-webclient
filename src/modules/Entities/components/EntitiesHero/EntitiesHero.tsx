import * as React from 'react'
import HeaderTabs from '../../../../common/components/HeaderTabs/HeaderTabs'
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
import { EntityType, Category } from '../../types'
import { strategyMap } from '../../strategy-map'
import { getHeaderSchema, getHeaderTabButtons } from './EntitiesHero.utils'

export interface Props {
  entityType: EntityType
  showSearch: boolean
  filterCategories: Category[]
  handleChangeEntitiesType: (entityType: EntityType) => void
}

export const EntitiesHero: React.FunctionComponent<Props> = ({
  entityType,
  showSearch,
  filterCategories,
  handleChangeEntitiesType,
}) => {
  const entityStrategyMap = strategyMap[entityType]
  const header = getHeaderSchema(
    filterCategories,
    entityStrategyMap.headerSchema,
  )
  const headerTabButtons = getHeaderTabButtons(
    entityType,
    entityStrategyMap.plural.toUpperCase(),
  )

  return (
    <HeroContainer
      style={{
        backgroundImage: header.image || '',
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
