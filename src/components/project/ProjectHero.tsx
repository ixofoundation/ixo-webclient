import * as React from 'react'
import moment from 'moment'
import { SDGArray } from '../../lib/commonData'
import { getCountryName, toTitleCase } from '../../common/utils/formatters'
import { MatchType, AgentRoles } from '../../types/models'
import HeaderTabs from '../../common/components/HeaderTabs/HeaderTabs'
import {
  SingleSDG,
  HeroInner,
  Flag,
  HeroContainer,
  HeroInfoItemsWrapper,
  HeroInfoItem,
  Title,
  Description,
  AddClaim,
  SubNavItem,
} from './ProjectHero.styles'
import CalendarSort from 'src/assets/icons/CalendarSort'
import availableFlags from '../../lib/json/availableFlags.json'
import { EntityType, EntityTypeMap } from 'src/modules/Entities/types'

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
  const entityType = project.entityType
    ? (toTitleCase(project.entityType) as EntityType)
    : EntityType.Project

  const buttonsArray = [
    {
      iconClass: `icon-${entityType.toLowerCase()}`,
      linkClass: null,
      path: `/projects/${match.params.projectDID}/overview`,
      title: EntityTypeMap[entityType].plural,
    },
    {
      iconClass: 'icon-impacts',
      linkClass: 'in-active',
      path: '/performace',
      title: 'PERFORMANCE',
    },
  ]

  if (entityType === EntityType.Project) {
    buttonsArray.push({
      iconClass: 'icon-impacts',
      linkClass: null,
      path: `/projects/${match.params.projectDID}/detail`,
      title: 'PERFORMANCE',
    })
  }

  if (isLoggedIn && project.bondDid) {
    buttonsArray.push({
      iconClass: 'icon-funding',
      linkClass: null,
      path: `/projects/${match.params.projectDID}/bonds/${project.bondDid}`,
      title: 'FUNDING',
    })
  } else {
    buttonsArray.push({
      iconClass: 'icon-funding',
      linkClass: 'in-active',
      path: '/funding',
      title: 'FUNDING',
    })
  }

  const getFlagURL = (projectLocation: string): string => {
    return availableFlags.availableFlags.includes(project.projectLocation)
      ? `url(${require(`../../assets/images/country-flags/${projectLocation.toLowerCase()}.svg`)})`
      : ''
  }

  const handleSwitchDescription = (): JSX.Element => {
    if (isClaim) {
      return (
        <>
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
        </>
      )
    } else {
      return (
        <>
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
        </>
      )
    }
  }

  return (
    <HeroContainer className="container-fluid">
      <HeroInner className={`container ${isDetail && 'detailed'}`}>
        <div className="row">
          <div className="col-sm-12">
            {handleSwitchDescription()}
            <Title>{project.title}</Title>
            <Description>{project.shortDescription}</Description>
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
            <HeroInfoItemsWrapper>
              <HeroInfoItem>
                <CalendarSort fill="#A5ADB0" />
                <span>{moment(project.createdOn).format('d MMM ‘YY')}</span>
              </HeroInfoItem>
              <HeroInfoItem>
                <span>{project.ownerName}</span>
              </HeroInfoItem>
              {project.projectLocation && (
                <HeroInfoItem>
                  {getFlagURL(project.projectLocation) !== '' && (
                    <Flag
                      style={{
                        background: getFlagURL(project.projectLocation),
                      }}
                    />
                  )}
                  <span>{getCountryName(project.projectLocation)}</span>
                </HeroInfoItem>
              )}
            </HeroInfoItemsWrapper>
          </div>
        </div>
      </HeroInner>
      <HeaderTabs
        buttons={buttonsArray}
        matchType={MatchType.strict}
        activeTabColor={EntityTypeMap[entityType].themeColor}
      />
    </HeroContainer>
  )
}
