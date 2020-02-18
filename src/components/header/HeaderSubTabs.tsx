import * as React from 'react'
import styled from 'styled-components'
import { Tabs } from '../common/Tabs'
import { MatchType } from '../../types/models'

const PositionController = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 10;
  transform: translateY(75%);
  @media screen and (min-width: 768px) {
    right: 190px;
  }
`

const HeaderSubTabs = () => {
  return (
    <PositionController>
      <Tabs
        buttons={[
          { iconClass: 'icon-projects', path: '/', title: 'PROJECTS' },
          {
            iconClass: 'icon-impacts',
            path: '/global-statistics',
            title: 'IMPACTS',
          },
          { iconClass: 'icon-funding', path: '/', title: 'FUNDING' },
        ]}
        matchType={MatchType.exact}
      />
    </PositionController>
  )
}

export default HeaderSubTabs
