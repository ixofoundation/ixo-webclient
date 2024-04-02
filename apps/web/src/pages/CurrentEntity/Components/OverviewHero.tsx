import * as React from 'react'
import moment from 'moment'
import { getCountryName } from 'utils/formatters'
import HeaderTabs from 'components/HeaderTabs/HeaderTabs'
import {
  HeroInner,
  Flag,
  HeroContainer,
  HeroInfoItemsWrapper,
  HeroInfoItem,
  Title,
  Description,
} from './OverviewHero.styles'
import CalendarSort from 'assets/icons/CalendarSort'
import availableFlags from 'constants/availableFlags.json'
import { requireCheckDefault } from 'utils/images'
import { useEntityConfig } from 'hooks/configs'
import { useHeaderTabs } from 'hooks/headerTabs'
import { MatchType } from 'types/models'
import { Skeleton } from '@mantine/core'

interface Props {
  $onlyTitle: boolean
  assistantPanelToggle?: () => void
  enableAssistantButton?: boolean
  light?: boolean
  assistantFixed?: boolean

  startDate: string
  name?: string
  description?: string
  location?: string
  creatorName: string
  creatorLogo: string
}

const OverviewHero: React.FunctionComponent<Props> = ({
  $onlyTitle,
  enableAssistantButton = true,
  light = false,
  assistantFixed = false,
  assistantPanelToggle,

  startDate,
  name,
  description,
  location,
  creatorLogo,
  creatorName,
}) => {
  const entityConfig = useEntityConfig()
  const themeColor = entityConfig.themeColor

  const headerTabs = useHeaderTabs()

  const getFlagURL = (projectLocation: string): string => {
    if (location && availableFlags.availableFlags.includes(location)) {
      return `url(${requireCheckDefault(
        require(`../../../assets/images/country-flags/${projectLocation.toLowerCase()}.svg`),
      )})`
    } else if (location === 'AA') {
      return `url(${requireCheckDefault(require('assets/images/country-flags/global.svg'))})`
    }

    return ''
  }

  return (
    <>
      <HeroContainer $onlyTitle={$onlyTitle} light={light ? 1 : 0}>
        <HeroInner className='detailed'>
          <div className='row'>
            <div className='col-sm-12'>
              {name ? <Title light={light ? 1 : 0}>{name}</Title> : <Skeleton h={40} w={400} my={4} />}
              {!$onlyTitle && (
                <>
                  {description ? <Description>{description}</Description> : <Skeleton h={10} w={300} my={4} />}
                  <HeroInfoItemsWrapper>
                    {startDate ? (
                      <HeroInfoItem>
                        <CalendarSort fill='#A5ADB0' />
                        <span>{moment(startDate).format('DD MMM ‘YY')}</span>
                      </HeroInfoItem>
                    ) : (
                      <Skeleton h={10} w={150} my={4} />
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

export default OverviewHero
