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
  StyledFundingTitle,
} from './ProjectHero.styles'
import CalendarSort from 'assets/icons/CalendarSort'
import availableFlags from 'lib/json/availableFlags.json'
import { EntityType } from 'modules/Entities/types'
import { strategyMap } from 'modules/Entities/strategy-map'
import { useWindowSize } from 'common/hooks'
import { deviceWidth } from 'lib/commonData'

export interface Props {
  project: any
  match: any
  isDetail: boolean
  isLoggedIn: boolean
  isClaim?: boolean
  hasCapability: (role: [AgentRoles]) => boolean
  onlyTitle?: boolean
}

export const ProjectHero: React.SFC<Props> = ({
  project,
  match,
  isDetail,
  isLoggedIn,
  onlyTitle,
}) => {
  const windowSize = useWindowSize()

  const entityType = project.entityType
    ? (toTitleCase(project.entityType) as EntityType)
    : EntityType.Project

  const buttonsArray = [
    {
      iconClass: `icon-${entityType.toLowerCase()}`,
      linkClass: null,
      path: `/projects/${match.params.projectDID}/overview`,
      title: strategyMap[entityType].plural,
    },
  ]

  if (entityType === EntityType.Project) {
    buttonsArray.push({
      iconClass: 'icon-impacts',
      linkClass: null,
      path: `/projects/${match.params.projectDID}/detail`,
      title: 'DASHBOARD',
    })
  } else {
    buttonsArray.push({
      iconClass: 'icon-impacts',
      linkClass: 'in-active',
      path: '/performace',
      title: 'DASHBOARD',
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
    if (availableFlags.availableFlags.includes(project.projectLocation)) {
      return `url(${require(`../../assets/images/country-flags/${projectLocation.toLowerCase()}.svg`)})`
    } else if (project.projectLocation === 'AA') {
      return `url(${require('../../assets/images/country-flags/global.svg')})`
    }

    return ''
  }

  const renderSDGs = (): JSX.Element => {
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

  return (
    <React.Fragment>
      {onlyTitle && windowSize.width > deviceWidth.tablet && (
        <StyledFundingTitle>{project.title}</StyledFundingTitle>
      )}
      <HeroContainer className="container-fluid" onlyTitle>
        {!onlyTitle && windowSize.width > deviceWidth.tablet && (
          <HeroInner className={`container ${isDetail && 'detailed'}`}>
            <div className="row">
              <div className="col-sm-12">
                {renderSDGs()}
                <Title>{project.title}</Title>
                <Description>{project.shortDescription}</Description>
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
        )}
        <HeaderTabs
          buttons={buttonsArray}
          matchType={MatchType.strict}
          activeTabColor={strategyMap[entityType].themeColor}
        />
      </HeroContainer>
    </React.Fragment>
  )
}
