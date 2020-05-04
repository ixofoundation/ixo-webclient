import * as React from 'react'
import HeaderSubTabs from '../../../../components/common/HeaderSubTabs'
import { SingleStatistic } from '../../../../components/common/SingleStatistic'
import { StatType } from '../../../../types/models'
import Search from '../../../../common/components/Search/Search'
import { contentType } from '../../../../types/models'
import {
  ContainerInner,
  StatisticContainer,
  HeroInner,
  HeroContainer,
} from './ProjectsHero.styles'

export interface Props {
  projectsCount: number
  userProjectsCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  contentType: contentType
}

export class ProjectsHero extends React.Component<Props> {
  getStats = (): Array<Record<string, any>> => {
    return [
      {
        title: 'MY ACTIVE PROJECTS',
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: this.props.userProjectsCount,
      },
      {
        title: 'TOTAL PROJECTS',
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: this.props.projectsCount,
      },
      {
        title: 'VERIFIED CLAIMS',
        type: StatType.fraction,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: [
          this.props.successfulClaimsCount,
          this.props.requiredClaimsCount,
        ],
      },
      {
        title: 'TOTAL IXO IN CIRCULATION',
        type: StatType.fraction,
        descriptor: [{ class: 'text', value: 'IXO staked to date' }],
        amount: [0, 0],
      },
    ]
  }

  render(): JSX.Element {
    return (
      <HeroContainer>
        <HeroInner className="container">
          <div className="row">
            {this.getStats().map((statistic, index) => {
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
        {this.props.contentType !== contentType.dashboard && (
          <Search filterChanged={(): void => null} />
        )}
      </HeroContainer>
    )
  }
}
