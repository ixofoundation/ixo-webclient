import React, { Dispatch } from 'react'
import { Moment } from 'moment'
import { connect } from 'react-redux'
import ControlPanel from 'common/components/ControlPanel/ControlPanel'
import EntityLayout from 'modules/Entities/SelectedEntity/EntityLayout.container'
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
import PageContentComponent from './components/PageContent/PageContent'
import { PageContent } from '../types'
import FundingChat from 'modules/FundingChat/FundingChat.container'
import AssistantContext from 'common/contexts/Assistant'
import {Transition, animated} from 'react-spring/renderprops'
import * as entityClaimsSelectors from 'modules/Entities/CreateEntity/CreateEntityClaims/CreateEntityClaims.selectors'
import { CreateEntityClaimsState } from 'modules/Entities/CreateEntity/CreateEntityClaims/types'

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
  isLoading: boolean,
  entityClaims: CreateEntityClaimsState,
  entity: any,
  handleGetEntity: (did: string) => void,
}

class EntityOverview extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
  }

  assistantPanelToggle = (): void => {
    const { assistantPanelActive } = this.state

    // Assistant panel shown
    if (!assistantPanelActive) {
      document?.querySelector('body')?.classList?.add('noScroll')
    } else {
      document?.querySelector('body')?.classList.remove('noScroll')
    }


    this.setState({assistantPanelActive: !assistantPanelActive})
  }

  render(): JSX.Element {
    const {
      match,
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
      entity
    } = this.props

    const { assistantPanelActive } = this.state

    if (isLoading) {
      return <EntityLayout match={match} />
    }

    return <EntityLayout match={match}>
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
                isLoggedIn={isLoggedIn}
                onlyTitle={false}
                assistantPanelToggle={ this.assistantPanelToggle }
                light
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
                claims={ entity.entityClaims.items }
                assistantPanelToggle={ this.assistantPanelToggle }
              />
              <Transition
                  items={assistantPanelActive}
                  from={{ width: '0%', }}
                  enter={{ width: '100%' }}
                  leave={{ width: '0%' }}
                >

                    {
                      assistantPanelActive => assistantPanelActive && (props =>
                        <AssistantContainer style={ props }>
                          <animated.div style={{ width: '25%' }}>
                              <FundingChat
                                  assistantPanelToggle={ this.assistantPanelToggle }
                              />
                          </animated.div>
                        </AssistantContainer>)
                    }
              </Transition>
            </SidebarWrapper>
          </div>
        </OverviewContainer>
      </div>
      </AssistantContext.Provider>
    </EntityLayout>
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
  entityClaims: entityClaimsSelectors.selectEntityClaims(state),
  entity: entitySelectors.selectSelectedEntity(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityOverview)
