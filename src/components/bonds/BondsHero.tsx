import * as React from 'react'
import styled from 'styled-components'
import { deviceWidth } from '../../lib/commonData'
import HeaderSubTabs from '../common/HeaderSubTabs'

const HeroContainer = styled.div`
  background: url(${require('../../assets/images/heroBg.jpg')}) no-repeat center
    top;
  color: white;
  background-size: cover;
  margin: 0;
  font-weight: normal;

  .container,
  .container .row {
    height: 100%;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    height: 200px;
  }
`

const BondsHeroHeading = styled.h1`
  color: white;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
`

const StatusIndicator = styled.span`
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.75rem;
  border-radius: 50%;
  background: ${/* eslint-disable-line */ props => props.theme.bg.green};
`

const StatisticContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  padding: 0;

  &:last-child {
    justify-content: center;
    flex-direction: column;
  }
  i {
    font-size: 0.8125em;
  }
`
const OutcomeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 1.25rem;
`

const Outcome = styled.div`
  font-family: Roboto Condensed;
  font-size: 0.875rem;
  line-height: 1.2;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #49bfe0;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 0.75rem;
  }
  i {
    font-size: 1.5em;
    margin-right: 0.25rem;
  }
`

export class BondsHero extends React.Component<{}, {}> {
  outcomes = [
    { title: '3. good health', iconClass: 'icon-sdg-goodhealth' },
    {
      title: '6. clean water and sanitation',
      iconClass: 'icon-sdg-cleanwater',
    },
    { title: '15. Life on land', iconClass: 'icon-sdg-lifeonland' },
  ]

  render(): JSX.Element {
    return (
      <HeroContainer>
        <HeaderSubTabs />
        <div className="container">
          <div className="row">
            <StatisticContainer className="col-8">
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
            </StatisticContainer>
            <StatisticContainer className="col-4">
              <div>
                <strong>Created:</strong> 24 March 18
              </div>
              <div>
                <strong>By:</strong> Water for Africa
              </div>
              <div>
                <i className="icon-location" />
                &nbsp; Uganda
              </div>
            </StatisticContainer>
          </div>
        </div>
      </HeroContainer>
    )
  }
}
