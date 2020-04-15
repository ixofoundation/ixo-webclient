import * as React from 'react'
import HeaderSubTabs from '../../../components/common/HeaderSubTabs'
import { SingleStatistic } from '../../../components/common/SingleStatistic'
import { StatType } from '../../../types/models'
import Search from '../../../components/common/Search'
import { contentType } from '../../../types/models'
import * as instanceSettings from '../../../instance-settings'
import { Stats } from '../types'
import {
  ContainerInner,
  StatisticContainer,
  HeroInner,
  HeroContainer,
} from './ProjectsHero.styles'

export interface State {
  statistics: Stats
}

export interface Props {
  ixo?: any
  myProjectsCount: number
  showMyProjects: Function
  contentType: contentType
}

export class ProjectsHero extends React.Component<Props, State> {
  state = {
    statistics: {
      claims: {
        total: 0,
        totalSuccessful: 0,
        totalSubmitted: 0,
        totalPending: 0,
        totalRejected: 0,
      },
      totalServiceProviders: 0,
      totalProjects: 0,
      totalEvaluationAgents: 0,
    },
  }

  loadingStats = false

  getConfig(): Array<Record<string, any>> {
    return [
      {
        title: 'MY ACTIVE PROJECTS',
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: this.props.myProjectsCount,
        onClick: (): void => this.props.showMyProjects(true),
      },
      {
        title: 'TOTAL PROJECTS',
        type: StatType.decimal,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: this.state.statistics.totalProjects,
        onClick: (): void => this.props.showMyProjects(false),
      },
      {
        title: 'VERIFIED CLAIMS',
        type: StatType.fraction,
        descriptor: [{ class: 'text', value: ' ' }],
        amount: [
          this.state.statistics.claims.totalSuccessful,
          this.state.statistics.claims.total,
        ],
        onClick: (): void => this.props.showMyProjects(false),
      },
      {
        ...instanceSettings.getCirculationHeroConfig(),
        onClick: (): void => this.props.showMyProjects(false),
      },
    ]
  }

  componentDidMount(): void {
    this.handleGetGlobalData()
  }

  UNSAFE_componentWillUpdate(): void {
    this.handleGetGlobalData()
  }

  handleGetGlobalData = (): void => {
    if (this.props.ixo && !this.loadingStats) {
      this.loadingStats = true
      this.props.ixo.stats.getGlobalStats().then(res => {
        const statistics: Stats = res
        this.setState({ statistics })
        this.loadingStats = false
      })
    }
  }

  handleSearchFilterChanged = (filter: string): void => {
    if (filter === 'all-projects') {
      this.props.showMyProjects(false)
    }
    if (filter === 'my-projects') {
      this.props.showMyProjects(true)
    }
  }

  render(): JSX.Element {
    return (
      <HeroContainer>
        <HeroInner className="container">
          <div className="row">
            {this.getConfig().map((statistic, index) => {
              return (
                <StatisticContainer
                  key={index}
                  className="col-md-3 col-sm-6 col-6"
                >
                  <ContainerInner onClick={(): void => statistic.onClick()}>
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
          <Search filterChanged={this.handleSearchFilterChanged} />
        )}
      </HeroContainer>
    )
  }
}
