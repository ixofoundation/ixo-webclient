import React, { Dispatch } from 'react'
import { Moment } from 'moment'
import { connect } from 'react-redux'
import ControlPanel from 'common/components/ControlPanel/ControlPanel'
import {
  OverviewContainer,
  SidebarWrapper,
  MainPanelWrapper,
  AssistantContainer,
} from './EntityOverview.container.styles'
import { EntityType } from 'modules/Entities/types'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import EntityHero from '../EntityHero/EntityHero'
import { RootState } from 'common/redux/types'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as entityOverviewSelectors from './EntityOverview.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'
import { Spinner } from 'common/components/Spinner'
import PageContentComponent from './components/PageContent/PageContent'
import { PageContent } from '../types'
import FundingChat from 'modules/FundingChat/FundingChat.container'
import AssistantContext from 'common/contexts/Assistant'
import {Transition} from 'react-spring/renderprops'

interface Props {
  match: any
  did: string
  name: string
  description: string
  image: string
  type: EntityType
  dateCreated: Moment
  userDid: string
  creatorLogo: string
  creatorMission: string
  creatorName: string
  creatorWebsite: string
  location: string
  sdgs: string[]
  pageContent: PageContent
  isLoggedIn: boolean
  isLoading: boolean
  handleGetEntity: (did: string) => void
}

class EntityOverview extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
  }

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(did)
  }

  assistantPanelToggle = (): void => {
    const { assistantPanelActive } = this.state
    this.setState({assistantPanelActive: !assistantPanelActive})
  }

  render(): JSX.Element {
    const {
      did,
      name,
      description,
      type,
      dateCreated,
      userDid,
      creatorName,
      creatorMission,
      creatorLogo,
      creatorWebsite,
      location,
      sdgs,
      pageContent,
      isLoggedIn,
      isLoading,
    } = this.props

    const { assistantPanelActive } = this.state

    if (isLoading) {
      return <Spinner info="Loading Entity..." />
    }

    return (
      <AssistantContext.Provider value={{ active: assistantPanelActive }}>
      <div>
        <OverviewContainer className="container-fluid">
          <div className="row">
            <MainPanelWrapper className="col-lg-9 pr-md-5">
              <EntityHero
                type={type}
                did={did}
                name={name}
                description={description}
                dateCreated={dateCreated}
                creatorName={creatorName}
                location={location}
                sdgs={sdgs}
                loggedIn={isLoggedIn}
                onlyTitle={false}
                assistantPanelToggle={ this.assistantPanelToggle }
              />
              <PageContentComponent
                pageContent={pageContent}
                creatorLogo={creatorLogo}
                creatorName={creatorName}
                creatorMission={creatorMission}
                creatorWebsite={creatorWebsite}
              />
            </MainPanelWrapper>
            <SidebarWrapper className="col-lg-3 position-relative">
              <ControlPanel
                schema={entityTypeMap[type].controlPanelSchema}
                entityDid={did}
                userDid={userDid}
              />
              <Transition
                  items={assistantPanelActive}
                  from={{ width: '0%' }}
                  enter={{ width: '100%' }}
                  leave={{ width: '0%' }}
                >
                
                    {
                      assistantPanelActive => assistantPanelActive && (props => 
                        <AssistantContainer style={ props }>
                          <FundingChat 
                            assistantPanelToggle={ this.assistantPanelToggle }
                        /></AssistantContainer>)
                    }
              </Transition>
            </SidebarWrapper>
          </div>
        </OverviewContainer>
      </div>
      </AssistantContext.Provider>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  did: entitySelectors.selectEntityDid(state),
  name: entitySelectors.selectEntityName(state),
  description: entitySelectors.selectEntityDescription(state),
  image: entitySelectors.selectEntityImage(state),
  type: entitySelectors.selectEntityType(state),
  dateCreated: entitySelectors.selectEntityDateCreated(state),
  userDid: accountSelectors.selectUserDid(state),
  creatorLogo: entitySelectors.selectEntityCreatorLogo(state),
  creatorMission: entitySelectors.selectEntityCreatorMission(state),
  creatorName: entitySelectors.selectEntityCreatorName(state),
  creatorWebsite: entitySelectors.selectEntityCreatorWebsite(state),
  location: entitySelectors.selectEntityLocation(state),
  sdgs: entitySelectors.selectEntitySdgs(state),
  pageContent: entityOverviewSelectors.selectPageContent(state),
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  isLoading: entitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityOverview)
