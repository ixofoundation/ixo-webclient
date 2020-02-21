import * as React from 'react'
import styled from 'styled-components'
import { Tabs } from '../common/Tabs'
import { SingleStatistic } from '../common/SingleStatistic'
import { StatType, MatchType } from '../../types/models'
import { Stats } from '../../types/models/stats'
import { deviceWidth } from '../../lib/commonData'
import Search from '../common/Search'
import { contentType } from '../../types/models'

const ContainerInner = styled.div`
  height: auto;
  width: 100%;
  transition: border-left 0.3s ease;

  > div {
    transition: transform 0.3s ease;
  }
`

const StatisticContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  padding: 0;
  justify-content: center;

  @media (min-width: ${deviceWidth.tablet}px) {
    ${ContainerInner} {
      border-left: 1px solid rgba(73, 191, 224, 0.3);
    }
  }

  :first-child > div {
    border-left: 0;
  }
`

const HeroInner = styled.div`
  height: 100%;

  > .row {
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  :hover ${ContainerInner} {
    border-left: 1px solid rgba(73, 191, 224, 0);
  }

  :hover ${ContainerInner} > div {
    transform: scale(1.05);
  }
`

const PositionController = styled.div`
  position: absolute;
  right: 0;
  bottom: calc(0% - 20px);
  z-index: 1;
`

const HeroContainer = styled.div`
  background: url(${require('../../assets/images/heroBg.jpg')}) no-repeat center
    top;
  background-size: cover;
  margin: 0 0 0px;
  cursor: pointer;
  position: relative;

  ${HeroInner}:before {
    position: absolute;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: background 0.3s ease;

    background-color: rgba(3, 60, 80, 0);
  }

  ${HeroInner}:hover:before {
    background-color: rgba(3, 60, 80, 0.6);
    cursor: normal;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    height: 200px;
  }
`

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
        title: 'TOTAL IMPACT CLAIMS',
        type: StatType.fraction,
        descriptor: [{ class: 'text', value: 'verified to date' }],
        amount: [
          this.state.statistics.claims.totalSuccessful,
          this.state.statistics.claims.total,
        ],
        onClick: (): void => this.props.showMyProjects(false),
      },
      {
        title: 'TOTAL IXO IN CIRCULATION',
        type: StatType.fraction,
        descriptor: [{ class: 'text', value: 'IXO staked to date' }],
        amount: [0, 0],
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
              <PositionController>
                <Tabs
                  buttons={[
                    {
                      iconClass: 'icon-projects',
                      path: '/',
                      title: 'PROJECTS',
                    },
                    {
                      iconClass: 'icon-impacts',
                      path: '/global-statistics',
                      title: 'IMPACTS',
                    },
                  ]}
                  matchType={MatchType.exact}
                />
              </PositionController>
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
