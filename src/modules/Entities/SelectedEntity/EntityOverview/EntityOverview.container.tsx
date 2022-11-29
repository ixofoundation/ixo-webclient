import React from 'react'
import { Moment } from 'moment'
import { connect } from 'react-redux'
import ControlPanel from 'common/components/ControlPanel/ControlPanel'
import { OverviewContainer, SidebarWrapper, MainPanelWrapper } from './EntityOverview.container.styles'
import { EntityType, EntityTypeStrategyMap } from 'modules/Entities/types'
import EntityHero from '../EntityHero/EntityHero'
import { RootState } from 'redux/types'
import * as entitySelectors from '../../../../redux/selectedEntity/selectedEntity.selectors'
import * as entityOverviewSelectors from './EntityOverview.selectors'
import * as accountSelectors from 'redux/account/account.selectors'
import { Spinner } from 'common/components/Spinner'
import PageContentComponent from './components/PageContent/PageContent'
import TemplateContentComponent from './components/TemplateContent/TemplateContent'
import { PageContent } from '../../../../redux/selectedEntity/selectedEntity.types'
import * as entityClaimsSelectors from 'redux/createEntityClaims/createEntityClaims.selectors'
import { CreateEntityClaimsState } from 'redux/createEntityClaims/createEntityClaims.types'
import { AgentRole } from 'redux/account/account.types'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { LinkedResourcesSection } from './components/LinkedResourcesSection'

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
  isLoading: boolean
  entityClaims: CreateEntityClaimsState
  entity: any
  entityTypeMap: EntityTypeStrategyMap
  handleGetEntity: (did: string) => void
}

class EntityOverview extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
    assistantIntent: '',
    role: AgentRole.ServiceProvider,
  }

  componentWillUnmount(): void {
    document?.querySelector('body')?.classList.remove('noScroll')
  }

  handleRenderContent(): JSX.Element {
    const { did, type, pageContent, creatorLogo, creatorName, creatorMission, creatorWebsite } = this.props

    switch (type) {
      case EntityType.Template:
        return <TemplateContentComponent templateId={did} />
      default:
        return (
          <>
            <PageContentComponent
              pageContent={pageContent}
              creatorLogo={creatorLogo}
              creatorName={creatorName}
              creatorMission={creatorMission}
              creatorWebsite={creatorWebsite}
              type={type}
            />
            <LinkedResourcesSection />
          </>
        )
    }
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
      creatorLogo,
      location,
      sdgs,
      isLoading,
      entity,
    } = this.props

    if (isLoading) {
      return <Spinner info='Loading Entity...' />
    }

    let claims = []
    if (entity.entityClaims) {
      claims = entity.entityClaims.items
    }

    return (
      <div>
        <OverviewContainer className='container-fluid'>
          <div className='row'>
            <MainPanelWrapper className='col-lg-9 pr-md-5'>
              <EntityHero
                type={type}
                did={did}
                name={name}
                description={description}
                dateCreated={dateCreated}
                creatorName={creatorName}
                creatorLogo={creatorLogo}
                location={location}
                sdgs={sdgs}
                onlyTitle={false}
                assistantFixed={true}
                light
              />
              {this.handleRenderContent()}
            </MainPanelWrapper>
            <SidebarWrapper className='col-lg-3 position-relative'>
              <ControlPanel
                schema={this.props.entityTypeMap[type].controlPanelSchema}
                entityDid={did}
                userDid={userDid}
                claims={claims}
              />
            </SidebarWrapper>
          </div>
        </OverviewContainer>
      </div>
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
  isLoading: entitySelectors.entityIsLoading(state),
  entityClaims: entityClaimsSelectors.selectEntityClaims(state),
  entity: entitySelectors.selectSelectedEntity(state),
  entityTypeMap: selectEntityConfig(state),
})

// const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({})

// export default connect(mapStateToProps, mapDispatchToProps)(EntityOverview)
export default connect(mapStateToProps)(EntityOverview)
