/*Test file for styling: Style should be moved to ProjectHero (ProjectLevel) and ProjectsHero (GlobalLevel) in HeaderContainer*/
import * as React from 'react'
import styled from 'styled-components'
import { Tabs } from './Tabs'
import { MatchType } from '../../types/models'

const PositionController = styled.div`
  position: fixed;
  z-index: 9;
  left: 53%;
  top: 2%;
  @media screen and (min-width: 660px) {
    right: 190px;
    transform: translate(0, 75%);
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
