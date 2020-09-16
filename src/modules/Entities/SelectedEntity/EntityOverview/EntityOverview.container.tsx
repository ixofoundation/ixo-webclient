import React, { Dispatch } from 'react'
import { Moment } from 'moment'
import { connect } from 'react-redux'
// // import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
// import ReactMd from 'react-md-file'
// import ProfileCard from '../ProfileCard/ProfileCard'
import ControlPanel from 'common/components/ControlPanel/ControlPanel'
import {
  OverviewContainer,
  SidebarWrapper,
  MainPanelWrapper,
  // ProfileCardsWrapper,
  // InlineImageWrapper,
} from './EntityOverview.container.styles'
import { EntityType } from 'modules/Entities/types'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import EntityHero from '../EntityHero/EntityHero'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { RootState } from 'common/redux/types'
import * as entitySelectors from '../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { getEntity } from '../SelectedEntity.actions'

interface Props {
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
  discourseUrl: string
  facebookUrl: string
  githubUrl: string
  instagramUrl: string
  linkedInUrl: string
  otherUrl: string
  telegramUrl: string
  twitterUrl: string
  bondDid: string
  sdgs: string[]
  isLoggedIn: boolean
}

export const EntityOverview: React.FunctionComponent<Props> = ({
  did,
  name,
  description,
  type,
  dateCreated,
  userDid,
  ownerLogo,
  ownerMission,
  ownerName,
  ownerWebsite,
  discourseUrl,
  facebookUrl,
  githubUrl,
  instagramUrl,
  linkedInUrl,
  otherUrl,
  telegramUrl,
  twitterUrl,
  bondDid,
  location,
  sdgs,
  image,
  isLoggedIn,
}) => {
  /*   const renderModalHeader = () => {
    return {
      title: props.modalData.title,
      subtitle: props.modalData.subtitle,
      icon: props.modalData.icon,
      width: '360',
    }
  }
 */
  return (
    <div>
      {/*       <ModalWrapper
        isModalOpen={props.isModalOpen}
        handleToggleModal={(): void => props.toggleModal({})}
        header={renderModalHeader()}
      >
        {props.modalData.content}
      </ModalWrapper> */}
      <OverviewContainer className="container-fluid">
        <div className="row">
          <MainPanelWrapper className="col-lg-9 pr-5">
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
            <Header name={name} description={description} image={image} />
            {/* {props.project.pageContent.map((content) => {
              return (
                <div className="content-section" key={content.title}>
                  {content.title && <h2>{content.title}</h2>}
                  {content.text && <p>{content.text}</p>}
                  {content.subTitle && <h3>{content.subTitle}</h3>}
                  {content.subText && <p>{content.subText}</p>}
                  {content.media && content.media.type === 'image' && (
                    <InlineImageWrapper>
                      <img src={content.media.link} alt={content.media.text} />
                      {content.media.text && <p>{content.media.text}</p>}
                      {content.media.caption && (
                        <p className="caption">{content.media.caption}</p>
                      )}
                    </InlineImageWrapper>
                  )}

                  {content.cards && (
                    <ProfileCardsWrapper>
                      {content.cards.map((user) => {
                        return <ProfileCard key={user.title} user={user} />
                      })}
                    </ProfileCardsWrapper>
                  )}
                  <hr />
                </div>
              )
            })} */}
            <Footer
              ownerLogo={ownerLogo}
              ownerMission={ownerMission}
              ownerName={ownerName}
              ownerWebsite={ownerWebsite}
              discourseUrl={discourseUrl}
              facebookUrl={facebookUrl}
              githubUrl={githubUrl}
              instagramUrl={instagramUrl}
              linkedInUrl={linkedInUrl}
              otherUrl={otherUrl}
              telegramUrl={telegramUrl}
              twitterUrl={twitterUrl}
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
  isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (did: string): void => dispatch(getEntity(did)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntityOverview)

/*
import { Table } from 'react-bootstrap'

 {content.media && content.media.type === 'video' && (
                      <>
                        <div
                          style={{
                            padding: '56.25% 0 0 0',
                            position: 'relative',
                          }}
                        >
                          <iframe
                            src={`https://player.vimeo.com/video/${getVideoID(
                              content.media.link,
                            )}`}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                            }}
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <script src="https://player.vimeo.com/api/player.js"></script>
                      </>
                    )}

                    {content.table && (
                      <div className="table-wrapper">
                        <Table striped borderless hover variant="dark">
                          <thead>
                            <tr>
                              {content.table.fields.map((field) => (
                                <th key={field}>{field}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {content.table.data.map((rowData, index) => (
                              <tr key={index}>
                                {rowData.map((rowInfo, index) => (
                                  <td key={index}>{rowInfo}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
*/
