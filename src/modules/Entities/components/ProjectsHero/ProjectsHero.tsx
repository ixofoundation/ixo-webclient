import * as React from 'react'
import HeaderSubTabs from '../../../../components/common/HeaderSubTabs'
import { SingleStatistic } from '../../../../components/common/SingleStatistic'
import { StatType } from '../../../../types/models'
import Search from '../Search/Search'
import { contentType as ContentType } from '../../../../types/models'
import {
  ContainerInner,
  StatisticContainer,
  HeroInner,
  HeroContainer,
} from './ProjectsHero.styles'
import { EntityType } from '../../types'

export interface Props {
  entityType: EntityType
  projectsCount: number
  userProjectsCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  contentType: ContentType
  handleChangeEntityType: (entityType: EntityType) => void
}

export const ProjectsHero: React.FunctionComponent<Props> = ({
  entityType,
  projectsCount,
  userProjectsCount,
  requiredClaimsCount,
  successfulClaimsCount,
  contentType,
  handleChangeEntityType,
}) => {
  const getStats = (): Array<Record<string, any>> => {
    return [
      {
        title: 'MY ACTIVE PROJECTS',
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: userProjectsCount,
      },
      {
        title: 'TOTAL PROJECTS',
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: projectsCount,
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
            <HeaderSubTabs
              buttons={[
                {
                  iconClass: 'icon-explorer',
                  path: '/',
                  title: 'EXPLORER',
                },
                {
                  iconClass: 'icon-impacts',
                  path: '/global-statistics',
                  title: 'IMPACTS',
                },
              ]}
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
