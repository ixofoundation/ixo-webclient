/*Test file for styling: Style should be moved to ProjectHero (ProjectLevel) and ProjectsHero (GlobalLevel) in HeaderContainer*/
import * as React from 'react'
import styled from 'styled-components'
import { Tabs } from './Tabs'
import { MatchType } from '../../types/models'
import { deviceWidth } from '../../lib/commonData'

const PositionController = styled.div`
  position: fixed;
  z-index: 9;
  left: 50%;
  top: 3.5rem;
  transform: translateX(-50%);
  @media (min-width: ${deviceWidth.desktop}px) {
    left: initial;
    right: 190px;
    transform: none;
  }
`

const HeaderSubTabs = (): JSX.Element => {
  return (
    <PositionController>
      <Tabs
        buttons={[
          {
            iconClass: 'icon-projects',
            path: '/',
            title: 'PROJECT',
          },
          {
            iconClass: 'icon-impacts',
            path: '/global-statistics',
            title: 'PERFORMANCE',
          },
          {
            iconClass: 'icon-funding',
            path: '/bonds',
            title: 'FUNDING',
          },
        ]}
        matchType={MatchType.exact}
      />
    </PositionController>
  )
}

export default HeaderSubTabs
