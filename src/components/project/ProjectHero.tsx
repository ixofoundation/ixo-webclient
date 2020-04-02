import * as React from 'react'
import { SDGArray, deviceWidth } from '../../lib/commonData'
import { getCountryName } from '../../common/utils/formatters'
import { MatchType, AgentRoles } from '../../types/models'
import HeaderSubTabs from '../common/HeaderSubTabs'
import Location from '../../assets/icons/Location'
import MediaQuery from 'react-responsive'
import {
  SingleSDG,
  HeroInner,
  HeroContainer,
  ColLeft,
  ColRight,
  Title,
  Description,
  HeaderText,
  AddClaim,
  SubTextContainer,
  SubNavItem,
} from './ProjectHero.styles'

export interface Props {
  project: any
  match: any
  isDetail: boolean
  isLoggedIn: boolean
  isClaim?: boolean
  hasCapability: (role: [AgentRoles]) => boolean
}

export const ProjectHero: React.SFC<Props> = ({
  project,
  match,
  isDetail,
  hasCapability,
  isClaim,
  isLoggedIn,
}) => {
  const buttonsArray = [
    {
      iconClass: 'icon-projects',
      path: `/projects/${match.params.projectDID}/overview`,
      title: 'PROJECT',
    },
    {
      iconClass: 'icon-impacts',
      path: `/projects/${match.params.projectDID}/detail`,
      title: 'PERFORMANCE',
    },
  ]

  if (isLoggedIn) {
    buttonsArray.push({
      iconClass: 'icon-funding',
      path: `/projects/${match.params.projectDID}/bonds/${project.bondDid}`,
      title: 'FUNDING',
    })
  }

  const handleSwitchDescription = (): JSX.Element => {
    if (isClaim) {
      return (
        <SubTextContainer>
          <SubNavItem exact={true} to={'/homepage'}>
            HOME
          </SubNavItem>{' '}
          <span>|</span>
          <SubNavItem exact={true} to={'/projects/'}>
            PROJECTS
          </SubNavItem>{' '}
          <span>|</span>
          <SubNavItem
            exact={true}
            to={`/projects/${match.params.projectDID}/overview/`}
          >
            {project.title}
          </SubNavItem>{' '}
          <span>|</span>
          <SubNavItem
            to={`/projects/${match.params.projectDID}/detail/new-claim`}
          >
            SUBMIT CLAIM
          </SubNavItem>
        </SubTextContainer>
      )
    } else {
      return (
        <SubTextContainer>
          {project.sdgs.map((SDG, index) => {
            const goal = Math.floor(SDG)
            if (goal > 0 && goal <= SDGArray.length) {
              return (
                <SingleSDG
                  target="_blank"
                  href={SDGArray[goal - 1].url}
                  key={index}
                >
                  <i className={`icon-sdg-${SDGArray[goal - 1].ico}`} />
                  {goal}. {SDGArray[goal - 1].title}
                </SingleSDG>
              )
            } else {
              return null
            }
          })}
        </SubTextContainer>
      )
    }
  }

  return (
    <HeroContainer className="container-fluid">
      <HeroInner className={`container ${isDetail && 'detailed'}`}>
        <div className="row">
          <ColLeft className="col-lg-8 col-sm-12">
            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              {handleSwitchDescription()}
              <Title>{project.title}</Title>
            </MediaQuery>
            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <Title>{project.title}</Title>
              {handleSwitchDescription()}
            </MediaQuery>

            {!isDetail && <Description>{project.shortDescription}</Description>}
            {!isDetail && hasCapability([AgentRoles.serviceProviders]) && (
              <AddClaim
                to={`/projects/${match.params.projectDID}/detail/new-claim`}
              >
                + CAPTURE CLAIM
              </AddClaim>
            )}
            {!isDetail && hasCapability([AgentRoles.evaluators]) && (
              <AddClaim
                to={`/projects/${match.params.projectDID}/detail/claims`}
              >
                EVALUATE CLAIMS
              </AddClaim>
            )}
          </ColLeft>
          <ColRight className="col-lg-4 col-sm-12">
            <MediaQuery maxWidth={`${deviceWidth.mobile}px`}>
              <p>
                <HeaderText>
                  Created by{' '}
                  <text style={{ fontWeight: 'bold' }}>
                    {project.ownerName}{' '}
                  </text>{' '}
                  <text style={{ fontWeight: 'bold', fontSize: 15 }}>·</text>{' '}
                  <text style={{ fontWeight: 'bold' }}>
                    {project.createdOn.split('T')[0]}
                  </text>
                </HeaderText>
              </p>
            </MediaQuery>
            <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
              <HeaderText>
                <p>
                  <text style={{ fontWeight: 'bold' }}>Created: </text>
                  {project.createdOn.split('T')[0]}
                </p>

                <p>
                  <text style={{ fontWeight: 'bold' }}>By: </text>{' '}
                  {project.ownerName}{' '}
                </p>
              </HeaderText>
            </MediaQuery>

            <p>
              <HeaderText>
                <Location width="14" style={{ fontWeight: 'bold' }} />
                {getCountryName(project.projectLocation)}
              </HeaderText>
            </p>
          </ColRight>
        </div>
      </HeroInner>
      <HeaderSubTabs buttons={buttonsArray} matchType={MatchType.strict} />
    </HeroContainer>
  )
}
