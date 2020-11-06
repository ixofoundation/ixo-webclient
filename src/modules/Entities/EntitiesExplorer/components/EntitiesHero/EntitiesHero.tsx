import * as React from 'react'
import Search from '../Search/Search'
import {
  HeroInner,
  HeroContainer,
  HeroTextWrapper,
  HeroIndicatorsWrapper,
  ColorOverlay,
} from './EntitiesHero.styles'
import { EntityType } from '../../../types'
import { entityTypeMap } from '../../../strategy-map'
import { getHeaderSchema, getHeaderTabButtons } from './EntitiesHero.utils'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'lib/commonData'
import CreateEntityDropDown from 'modules/Entities/CreateEntity/components/CreateEntityDropdown/CreateEntityDropdown'
import HeaderTabs from 'common/components/HeaderTabs/HeaderTabs'
// TODO - when we know what the other entity types headers will look like then possibly refactor this as it's messy with all the conditions
// or whatever else is needed. For now, just doing it based on entityType

export interface Props {
  type: EntityType
  showSearch: boolean
  filterSector: string
  handleChangeEntitiesType: (type: EntityType) => void
  assistantPanelToggle?: () => void
}

export const EntitiesHero: React.FunctionComponent<Props> = ({
  type,
  showSearch,
  filterSector,
  handleChangeEntitiesType,
  assistantPanelToggle
}) => {
  const entityStrategyMap = entityTypeMap[type]
  const header = getHeaderSchema(filterSector, entityStrategyMap.headerSchema)
  const headerTabButtons = getHeaderTabButtons(
    type,
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
            {/* <div className="row">
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
            </div> */}
          </HeroIndicatorsWrapper>
        </div>
      </HeroInner>
      <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
        <CreateEntityDropDown />
      </MediaQuery>
      <HeaderTabs
        buttons={headerTabButtons}
        activeTabColor={entityStrategyMap.themeColor}
        enableAssistantButton={true}
        assistantPanelToggle={ assistantPanelToggle }
      />
      {showSearch && (
        <Search
          entityColor={entityStrategyMap.themeColor}
          type={type}
          filterChanged={handleChangeEntitiesType}
        />
      )}
    </HeroContainer>
  )
}
