import * as React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { SDGArray } from '../../lib/commonData'
import { getCountryName, toTitleCase } from 'common/utils/formatters'
import { MatchType, AgentRoles } from '../../types/models'
import HeaderTabs from 'common/components/HeaderTabs/HeaderTabs'
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
import { selectUserIsLoggedIn } from 'modules/Account/Account.selectors'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import { useWindowSize } from 'common/hooks'
import { deviceWidth } from 'lib/commonData'
import IxoCircle from 'assets/images/ixo-circle.png'
import CreateEntityDropdown from '../../modules/EntityModules/CreateEntity/components/CreateEntityDropdown/CreateEntityDropdown'

export interface Props {
  project: any
  match: any
  isDetail: boolean
  isClaim?: boolean
  hasCapability: (role: [AgentRoles]) => boolean
  onlyTitle?: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
}

export const ProjectHero: React.SFC<Props> = ({
  project,
  match,
  isDetail,
  onlyTitle,
  assistantPanelToggle,
  enableAssistantButton = true,
}) => {
  const windowSize = useWindowSize()
  const isUserLoggedIn = useSelector(selectUserIsLoggedIn)
  const entityType = project.entityType
    ? (toTitleCase(project.entityType) as EntityType)
    : EntityType.Project

  const buttonsArray = [
    {
      iconClass: `icon-${entityType.toLowerCase()}`,
      linkClass: null,
      path: `/projects/${match.params.projectDID}/overview`,
      title: entityTypeMap[entityType].title,
    },
  ]

  if (entityType === EntityType.Project) {
    buttonsArray.push({
      iconClass: 'icon-dashboard',
      linkClass: null,
      path: `/projects/${match.params.projectDID}/detail`,
      title: 'DASHBOARD',
    })
  } else {
    buttonsArray.push({
      iconClass: 'icon-dashboard',
      linkClass: 'in-active',
      path: '/performace',
      title: 'DASHBOARD',
    })
  }

  if (isUserLoggedIn && project.bondDid) {
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
      <HeroContainer className="container-fluid" onlyTitle={false}>
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
                    <img src={IxoCircle} />
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
          assistantPanelToggle={assistantPanelToggle}
          enableAssistantButton={enableAssistantButton}
          activeTabColor={entityTypeMap[entityType].themeColor}
        />
        <CreateEntityDropdown />
      </HeroContainer>
    </React.Fragment>
  )
}
