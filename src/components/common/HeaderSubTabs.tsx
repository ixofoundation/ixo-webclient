/*Test file for styling: Style should be moved to ProjectHero (ProjectLevel) and ProjectsHero (GlobalLevel) in HeaderContainer*/
import * as React from 'react'
import { withRouter } from 'react-router-dom'
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

export interface Props {
  location: any
  history: any
  match: any
}

class HeaderSubTabs extends React.Component<Props> {
  render(): JSX.Element {
    const { match } = this.props

    return (
      <PositionController>
        <Tabs
          buttons={[
            {
              linkClass: '',
              iconClass: 'icon-projects',
              path: `/projects/${match.params.projectDID}/overview`,
              title: 'PROJECT',
            },
            {
              linkClass: '',
              iconClass: 'icon-impacts',
              path: `/projects/${match.params.projectDID}/detail`,
              title: 'PERFORMANCE',
            },
            {
              linkClass: window.location.pathname.startsWith(
                `/projects/${match.params.projectDID}/bonds`,
              )
                ? 'active'
                : null,
              iconClass: 'icon-funding',
              path: `/projects/${match.params.projectDID}/bonds`,
              title: 'FUNDING',
            },
          ]}
          matchType={MatchType.exact}
        />
      </PositionController>
    )
  }
}

export default withRouter(HeaderSubTabs)
