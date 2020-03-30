import * as React from 'react'
import styled from 'styled-components'
import { SDGArray, deviceWidth } from '../../lib/commonData'
import { Link, NavLink } from 'react-router-dom'
import { getCountryName } from '../../common/utils/formatters'
import { MatchType, AgentRoles } from '../../types/models'
import * as instanceSettings from '../../instance-settings'
import HeaderSubTabs from '../common/HeaderSubTabs'
import Location from '../../assets/icons/Location'
import MediaQuery from 'react-responsive'

const SingleSDG = styled.a`
  &&& {
    color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
  }
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-weight: 300;
  font-size: 14px;
  margin: 0 10px 0 0;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  i {
    font-size: 22px;
    margin-right: 8px;
  }

  i:before {
    width: 50px;
    display: inline-block;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    i:before {
      width: auto;
    }
  }

  &&&:hover,
  :hover i:before {
    color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
  }
`

const HeroInner = styled.div`
  padding-top: 45px;
  padding-bottom: 94px;
  position: relative;
  height: 100%;

  @media (min-width: ${deviceWidth.desktop + 1}px) {
    padding-top: 150px;
  }
`

const HeroContainer = styled.div`
  background: url(${instanceSettings.getBGImageSrc()}) no-repeat center top;
  background-size: cover;
  margin: 0;
  position: relative;

  .detailed {
    padding-bottom: 50px;
  }
`

const ColLeft = styled.div``

const ColRight = styled.div`
  color: white;
  font-weight: 200;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-bottom: 0;
    line-height: 24px;
  }

  i {
    margin-right: 8px;
  }

  i:before {
    color: white;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 200;
  line-height: 1;
  margin-bottom: 5px;
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};

  @media (min-width: 600px) {
    font-size: 45px;
  }
`

const Description = styled.p`
  color: white;
  font-size: 12px;
  margin-top: 2px;
`
const HeaderText = styled.text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`

const AddClaim = styled(Link)`
  color: white;
  display: inline-block;
  text-align: center;
  background: ${/* eslint-disable-line */ props =>
    props.theme.bg.gradientButton};
  font-size: 15px;
  width: 288px;
  padding: 10px 0;
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  margin-right: 10px;

  :hover {
    text-decoration: none;
    color: white;
    background: ${/* eslint-disable-line */ props => props.theme.bg.lightBlue};
  }
`

const SubTextContainer = styled.div`
  margin-bottom: 10px;

  @media (min-width: ${deviceWidth.desktop}px) {
    margin-bottom: 0;
  }
`

const SubNavItem = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;

  &.active {
    color: white;
  }

  + span {
    color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
    margin: 0 10px;
  }
  :hover {
    color: white;
    text-decoration: none;
  }
`

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
