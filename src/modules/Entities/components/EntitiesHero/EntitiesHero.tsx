import * as React from 'react'
import HeaderTabs from '../../../../common/components/HeaderTabs/HeaderTabs'
import { SingleStatistic } from '../../../../components/common/SingleStatistic/SingleStatistic'
import { StatType } from '../../../../types/models'
import Search from '../Search/Search'
import { contentType as ContentType } from '../../../../types/models'
import {
  ContainerInner,
  StatisticContainer,
  HeroInner,
  HeroContainer,
} from './EntitiesHero.styles'
import { EntityType, EntityTypeMap } from '../../types'

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
  entitiesCount,
  userEntitiesCount,
  requiredClaimsCount,
  successfulClaimsCount,
  contentType,
  handleChangeEntityTypes: handleChangeEntityType,
}) => {
  const getStats = (): Array<Record<string, any>> => {
    return [
      {
        title: `MY ACTIVE ${EntityTypeMap[entityType].plural.toUpperCase()}`,
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: userEntitiesCount,
      },
      {
        title: `TOTAL ${EntityTypeMap[entityType].plural.toUpperCase()}`,
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: entitiesCount,
      },
      {
        title: 'VERIFIED CLAIMS',
        type: StatType.fraction,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: [successfulClaimsCount, requiredClaimsCount],
      },
      {
        title: 'TOTAL IXO IN CIRCULATION',
        type: StatType.fraction,
        descriptor: [{ class: 'text', value: 'IXO staked to date' }],
        amount: [0, 0],
      },
    ]
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
      tabButtons.push(
        {
          iconClass: 'icon-impacts',
          linkClass: null,
          path: '/global-statistics',
          title: 'IMPACT',
          toolTip: null,
        },
        {
          iconClass: 'icon-economy',
          linkClass: 'in-active',
          path: '/economy',
          title: 'ECONOMY',
          toolTip: 'Coming Soon',
        },
      )
    }

    return tabButtons
  }

  return (
    <HeroContainer>
      <HeroInner className="container">
        <div className="row">
          {getStats().map((statistic, index) => {
            return (
              <StatisticContainer
                key={index}
                className="col-md-3 col-sm-6 col-6"
              >
                <ContainerInner>
                  <SingleStatistic
                    title={statistic.title}
                    type={statistic.type}
                    amount={statistic.amount}
                    descriptor={statistic.descriptor}
                  />
                </ContainerInner>
              </StatisticContainer>
            )
          })}
        </div>
      </HeroInner>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <HeaderTabs
              buttons={getHeaderTabButtons()}
              activeTabColor={EntityTypeMap[entityType].themeColor}
            />
          </div>
        </div>
      </div>
      {contentType !== ContentType.dashboard && (
        <Search
          entityType={entityType}
          filterChanged={handleChangeEntityType}
        />
      )}
    </HeroContainer>
  )
}
