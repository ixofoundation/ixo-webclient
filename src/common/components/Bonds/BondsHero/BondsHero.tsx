import * as React from 'react'
import { withRouter } from 'react-router-dom'
import HeaderSubTabs from '../../../../components/common/HeaderSubTabs'
import Location from '../../../../assets/icons/Location'
import MediaQuery from 'react-responsive'
import { deviceWidth } from '../../../../lib/commonData'
import {
  BondsHeroHeading,
  HeroContainer,
  Outcome,
  OutcomeWrapper,
  StatisticContainer,
  StatusIndicator,
} from './BondsHero.styles'

export interface Props {
  location: any
  history: any
  match: any
}
class BondsHero extends React.Component<Props, {}> {
  outcomes = [
    { title: '3. good health', iconClass: 'icon-sdg-goodhealth' },
    {
      title: '6. clean water and sanitation',
      iconClass: 'icon-sdg-cleanwater',
    },
    { title: '15. Life on land', iconClass: 'icon-sdg-lifeonland' },
  ]

  render(): JSX.Element {
    const { match } = this.props
    return (
      <HeroContainer>
        <HeaderSubTabs
          buttons={[
            {
              linkClass: '',
              iconClass: 'icon-projects',
              path: `/projects/${match.params.projectDID}/overview`,
              title: 'PROJECT',
            },
            {
              linkClass: '',
              iconClass: 'icon-impacts',
              path: `/projects/${match.params.projectDID}/detail`,
              title: 'PERFORMANCE',
            },
            {
              linkClass: window.location.pathname.startsWith(
                `/projects/${match.params.projectDID}/bonds/${match.params.bondDID}`,
              )
                ? 'active'
                : null,
              iconClass: 'icon-funding',
              path: `/projects/${match.params.projectDID}/bonds/${match.params.bondDID}`,
              title: 'FUNDING',
            },
          ]}
        />
        <StatisticContainer className="title-section">
          <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
            <OutcomeWrapper>
              {this.outcomes.map(outcome => (
                <Outcome key={outcome.title}>
                  <i className={outcome.iconClass}></i>
                  {outcome.title}
                </Outcome>
              ))}
            </OutcomeWrapper>
            <BondsHeroHeading>
              <StatusIndicator className="active" />
              Togo water project
            </BondsHeroHeading>
          </MediaQuery>
          <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
            <BondsHeroHeading>
              <StatusIndicator className="active" />
              Togo water project
            </BondsHeroHeading>
            <OutcomeWrapper>
              {this.outcomes.map(outcome => (
                <Outcome key={outcome.title}>
                  <i className={outcome.iconClass}></i>
                  {outcome.title}
                </Outcome>
              ))}
            </OutcomeWrapper>
          </MediaQuery>
        </StatisticContainer>
        <StatisticContainer className="description-section">
          <div>
            <strong>Created:</strong> 24 March 18
          </div>
          <div>
            <strong>By:</strong> Water for Africa
          </div>
          <div>
            <Location width="14" />
            &nbsp; Uganda
          </div>
        </StatisticContainer>
      </HeroContainer>
    )
  }
}

export default withRouter(BondsHero)
