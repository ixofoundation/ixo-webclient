import * as React from 'react'
import moment from 'moment'
import { getCountryName } from 'utils/formatters'
import { MatchType } from '../../../../types/models'
import HeaderTabs from 'components/HeaderTabs/HeaderTabs2'
import {
  HeroInner,
  Flag,
  HeroContainer,
  HeroInfoItemsWrapper,
  HeroInfoItem,
  Title,
  Description,
} from './EntityHero.styles'
import CalendarSort from 'assets/icons/CalendarSort'
import availableFlags from 'data/availableFlags.json'
import { requireCheckDefault } from 'utils/images'
import { useEntityConfig } from 'hooks/configs'
import { useMemo } from 'react'
import { HeaderTab } from 'components/Dashboard/types'
import useCurrentEntity, {
  useCurrentEntityCreator,
  useCurrentEntityMetadata,
  useCurrentEntityProfile,
} from 'hooks/currentEntity'
import { useParams } from 'react-router-dom'

interface Props {
  onlyTitle: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
  light?: boolean
  assistantFixed?: boolean
}

const EntityHero: React.FunctionComponent<Props> = ({
  onlyTitle,
  enableAssistantButton = true,
  light = false,
  assistantFixed = false,
  assistantPanelToggle,
}) => {
  const { entityId } = useParams<{ entityId: string }>()
  const { title, themeColor } = useEntityConfig()
  const { entityType } = useCurrentEntity()
  const { name, description, location } = useCurrentEntityProfile()
  const { displayName: creatorName, logo: creatorLogo } = useCurrentEntityCreator()
  const { createdAt } = useCurrentEntityMetadata()

  const headerTabs = useMemo(() => {
    const buttons: HeaderTab[] = []

    /**
     * @description overview page
     */
    buttons.push({
      iconClass: `icon-${entityType!.toLowerCase()}`,
      path: `/entity/${entityId}/overview`,
      title: title,
      tooltip: `${title} Overview`,
    })

    /**
     * @description dashboard page
     */
    buttons.push({
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'DASHBOARD',
      tooltip: `${title} Management`,
    })

    /**
     * @description treasury page
     */
    buttons.push({
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'TREASURY',
      tooltip: `${title} Management`,
    })

    return buttons
  }, [title, entityId, entityType])

  const getFlagURL = (projectLocation: string): string => {
    if (availableFlags.availableFlags.includes(location)) {
      return `url(${requireCheckDefault(
        require(`../../../../assets/images/country-flags/${projectLocation.toLowerCase()}.svg`),
      )})`
    } else if (location === 'AA') {
      return `url(${requireCheckDefault(require('assets/images/country-flags/global.svg'))})`
    }

    return ''
  }

  return (
    <>
      <HeroContainer onlyTitle={onlyTitle} light={light ? 1 : 0}>
        <HeroInner className='detailed'>
          <div className='row'>
            <div className='col-sm-12'>
              <Title light={light ? 1 : 0}>{name}</Title>
              {!onlyTitle && (
                <>
                  <Description>{description}</Description>
                  <HeroInfoItemsWrapper>
                    {createdAt && (
                      <HeroInfoItem>
                        <CalendarSort fill='#A5ADB0' />
                        <span>{moment(createdAt).format('d MMM ‘YY')}</span>
                      </HeroInfoItem>
                    )}
                    <HeroInfoItem>
                      {creatorLogo && (
                        <img alt='' src={creatorLogo} width='20px' height='20px' style={{ borderRadius: 100 }} />
                      )}
                      {creatorName && <span>{creatorName}</span>}
                    </HeroInfoItem>
                    {location && (
                      <HeroInfoItem>
                        {getFlagURL(location) !== '' && (
                          <Flag
                            style={{
                              background: getFlagURL(location),
                            }}
                          />
                        )}
                        <span>{getCountryName(location)}</span>
                      </HeroInfoItem>
                    )}
                  </HeroInfoItemsWrapper>
                </>
              )}
            </div>
          </div>
        </HeroInner>
        <HeaderTabs
          matchType={MatchType.strict}
          assistantPanelToggle={assistantPanelToggle}
          enableAssistantButton={enableAssistantButton}
          activeTabColor={themeColor}
          assistantFixed={assistantFixed}
          buttons={headerTabs}
        />
      </HeroContainer>
    </>
  )
}

export default EntityHero
