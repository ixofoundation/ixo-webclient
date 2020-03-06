/*Test file for styling: Style should be moved to ProjectHero (ProjectLevel) and ProjectsHero (GlobalLevel) in HeaderContainer*/
import * as React from 'react'
import { withRouter } from 'react-router-dom'
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
              iconClass: 'icon-projects',
              path: `/projects/${match.params.projectDID}/overview`,
              title: 'PROJECT',
            },
            {
              iconClass: 'icon-impacts',
              path: `/projects/${match.params.projectDID}/detail`,
              title: 'PERFORMANCE',
            },
            {
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
