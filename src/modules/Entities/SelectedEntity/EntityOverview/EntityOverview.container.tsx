import React, { Dispatch } from 'react'
import { Moment } from 'moment'
import { connect } from 'react-redux'
import ControlPanel from 'common/components/ControlPanel/ControlPanel'
import {
  OverviewContainer,
  SidebarWrapper,
  MainPanelWrapper,
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

interface Props {
  match: any
  did: string
  name: string
  description: string
  image: string
  type: EntityType
  dateCreated: Moment
  userDid: string
  ownerLogo: string
  ownerMission: string
  ownerName: string
  ownerWebsite: string
  location: string
  bondDid: string
  sdgs: string[]
  pageContent: PageContent
  isLoggedIn: boolean
  isLoading: boolean
  handleGetEntity: (did: string) => void
}

class EntityOverview extends React.Component<Props> {
  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: did },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(did)
  }

  render(): JSX.Element {
    const {
      did,
      name,
      description,
      type,
      dateCreated,
      userDid,
      ownerName,
      ownerMission,
      ownerLogo,
      ownerWebsite,
      bondDid,
      location,
      sdgs,
      pageContent,
      isLoggedIn,
      isLoading,
    } = this.props

    if (isLoading) {
      return <Spinner info="Loading Entity..." />
    }

    return (
      <div>
        <OverviewContainer className="container-fluid">
          <div className="row">
            <MainPanelWrapper className="col-lg-9 pr-md-5">
              <EntityHero
                type={type}
                did={did}
                bondDid={bondDid}
                name={name}
                description={description}
                dateCreated={dateCreated}
                ownerName={ownerName}
                location={location}
                sdgs={sdgs}
                loggedIn={isLoggedIn}
                onlyTitle={false}
              />
              <PageContentComponent
                pageContent={pageContent}
                ownerLogo={ownerLogo}
                ownerName={ownerName}
                ownerMission={ownerMission}
                ownerWebsite={ownerWebsite}
              />
            </MainPanelWrapper>
            <SidebarWrapper className="col-lg-3">
              <ControlPanel
                schema={entityTypeMap[type].controlPanelSchema}
                entityDid={did}
                userDid={userDid}
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
  ownerLogo: entitySelectors.selectEntityOwnerLogo(state),
  ownerMission: entitySelectors.selectEntityOwnerMission(state),
  ownerName: entitySelectors.selectEntityOwnerName(state),
  ownerWebsite: entitySelectors.selectEntityOwnerWebsite(state),
  location: entitySelectors.selectEntityLocation(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  sdgs: entitySelectors.selectEntitySdgs(state),
  pageContent: entityOverviewSelectors.selectPageContent(state),
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  isLoading: entitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityOverview)
