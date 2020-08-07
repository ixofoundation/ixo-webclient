import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import * as pageContentSelectors from './CreateEntityPageContent.selectors'
import { RootState } from '../../common/redux/types'
import {
  HeaderPageContent,
  BodyPageContent,
  ImagePageContent,
  VideoPageContent,
  ProfilePageContent,
  SocialPageContent,
  EmbeddedPageContent,
} from './types'
import HeaderCard from './components/HeaderCard/HeaderCard'
// import BodyContentCard from './components/BodyContentCard/BodyContentCard'
// import ImageContentCard from './components/ImageContentCard/ImageContentCard'
// import ProfileContentCard from './components/ProfileContentCard/ProfileContentCard'
//  import VideoContentCard from './components/VideoContentCard/VideoContentCard'
import SocialContentCard from './components/SocialContentCard/SocialContentCard'
import EmbeddedContentCard from './components/EmbeddedContentCard/EmbeddedContentCard'
import {
  updateHeaderContent,
  addBodySection,
  updateBodyContent,
  addImageSection,
  updateImageContent,
  addProfileSection,
  updateProfileContent,
  updateSocialContent,
  removeBodySection,
  removeImageSection,
  removeProfileSection,
  updateEmbeddedContent,
  addEmbeddedSection,
  removeEmbeddedSection,
} from './CreateEntityPageContent.actions'
import { FormData } from '../../common/components/JsonForm/types'
import FormCardWrapper from '../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import { ButtonGroup } from '../../common/components/JsonForm/JsonForm.styles'

interface Props {
  header: HeaderPageContent
  body: BodyPageContent[]
  images: ImagePageContent[]
  videos: VideoPageContent[]
  profiles: ProfilePageContent[]
  social: SocialPageContent
  embedded: EmbeddedPageContent[]
  handleUpdateHeaderContent: (formData: FormData) => void
  handleAddBodySection: () => void
  handleRemoveBodySection: (id: string) => void
  handleUpdateBodyContent: (id: string, formData: FormData) => void
  handleAddImageSection: () => void
  handleRemoveImageSection: (id: string) => void
  handleUpdateImageContent: (id: string, formData: FormData) => void
  handleAddVideoSection: () => void
  handleRemoveVideoSection: (id: string) => void
  handleUpdateVideoContent: (id: string, formData: FormData) => void
  handleAddProfileSection: () => void
  handleRemoveProfileSection: (id: string) => void
  handleUpdateProfileContent: (id: string, formData: FormData) => void
  handleUpdateSocialContent: (formData: FormData) => void
  handleAddEmbeddedSection: () => void
  handleRemoveEmbeddedSection: (id: string) => void
  handleUpdateEmbeddedContent: (id: string, formData: FormData) => void
}

class CreateEntityPageContent extends React.Component<Props> {
  // const validated[]..
  // const errors[]..
  // const submitting..
  /*
  x.submit() => onsubmit - yes, onerror = no
  x.submit()
  x.submit()
  x.submit()
  x.submit()
  x.submit()
  x.submit()
  */

  renderHeader = (): JSX.Element => {
    const {
      header: {
        title,
        shortDescription,
        imageDescription,
        fileSrc,
        company,
        country,
        sdgs,
        uploading,
      },
      handleUpdateHeaderContent,
    } = this.props

    return (
      <FormCardWrapper
        title="Header Card"
        description="The information in this card displays on the Explorer card."
        showAddSection={false}
      >
        <HeaderCard
          handleUpdateContent={handleUpdateHeaderContent}
          handleError={(errors): void => console.log(errors)}
          title={title}
          shortDescription={shortDescription}
          imageDescription={imageDescription}
          fileSrc={fileSrc}
          company={company}
          country={country}
          sdgs={sdgs}
          uploadingImage={uploading}
        />
      </FormCardWrapper>
    )
  }

  /* renderBodySections = (): JSX.Element => {
    const {
      body,
      handleUpdateBodyContent,
      handleAddBodySection,
      handleRemoveBodySection,
    } = this.props

    return (
      <FormCardWrapper
        title="Body Content Card"
        description="Accepts Markdown formatting such as **bold**, *italic* and ***bold italic***."
        showAddSection
        onAddSection={handleAddBodySection}
      >
        {body.map(section => {
          const { id, title, content, fileSrc, uploading } = section

          return (
            <BodyContentCard
              id={id}
              key={id}
              title={title}
              content={content}
              imageSrc={fileSrc}
              uploadingImage={uploading}
              handleUpdateContent={handleUpdateBodyContent}
              handleRemoveSection={handleRemoveBodySection}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  renderImageSections = (): JSX.Element => {
    const {
      images,
      handleUpdateImageContent,
      handleUploadImageContentImage,
      handleAddImageSection,
      handleRemoveImageSection,
    } = this.props

    return (
      <FormCardWrapper
        title="Image Content Card"
        description="Accepts Markdown formatting such as **bold**, *italic* and ***bold italic***."
        showAddSection
        onAddSection={handleAddImageSection}
      >
        {images.map(section => {
          const {
            id,
            title,
            content,
            imageSrc,
            imageDescription,
            uploadingImage,
          } = section

          return (
            <ImageContentCard
              id={id}
              key={id}
              title={title}
              content={content}
              imageSrc={imageSrc}
              imageDescription={imageDescription}
              uploadingImage={uploadingImage}
              handleUpdateContent={handleUpdateImageContent}
              handleUploadImage={handleUploadImageContentImage}
              handleRemoveSection={handleRemoveImageSection}
            />
          )
        })}
      </FormCardWrapper>
    )
  } */

  // Disable for now until proper video processing
  /*   renderVideoSections = (): JSX.Element => {
    const {
      videos,
      handleUpdateVideoContent,
      handleUploadVideoContentVideo,
      handleAddVideoSection,
      handleRemoveVideoSection,
    } = this.props

    return (
      <FormCardWrapper
        title="Video Content Card"
        description="Accepts Markdown formatting such as **bold**, *italic* and ***bold italic***."
        showAddSection
        onAddSection={handleAddVideoSection}
      >
        {videos.map(section => {
          const { id, title, content, videoDid, uploadingVideo } = section

          return (
            <VideoContentCard
              id={id}
              key={id}
              title={title}
              content={content}
              videoDid={videoDid}
              uploadingVideo={uploadingVideo}
              handleUpdateContent={handleUpdateVideoContent}
              handleUploadVideo={handleUploadVideoContentVideo}
              handleRemoveSection={handleRemoveVideoSection}
            />
          )
        })}
      </FormCardWrapper>
    )
  } */

  /*  renderProfileSections = (): JSX.Element => {
    const {
      profiles,
      handleUpdateProfileContent,
      handleUploadProfileContentImage,
      handleAddProfileSection,
      handleRemoveProfileSection,
    } = this.props

    return (
      <FormCardWrapper
        title="Profile Card"
        description="Accepts Markdown formatting such as **bold**, *italic* and ***bold italic***."
        showAddSection
        onAddSection={handleAddProfileSection}
      >
        {profiles.map(section => {
          const {
            id,
            name,
            position,
            imageSrc,
            linkedInUrl,
            twitterUrl,
            uploadingImage,
          } = section

          return (
            <ProfileContentCard
              id={id}
              key={id}
              name={name}
              position={position}
              linkedInUrl={linkedInUrl}
              twitterUrl={twitterUrl}
              imageSrc={imageSrc}
              uploadingImage={uploadingImage}
              handleUpdateContent={handleUpdateProfileContent}
              handleUploadImage={handleUploadProfileContentImage}
              handleRemoveSection={handleRemoveProfileSection}
            />
          )
        })}
      </FormCardWrapper>
    )
  } */

  renderSocialContent = (): JSX.Element => {
    const {
      social: {
        linkedInUrl,
        facebookUrl,
        twitterUrl,
        discourseUrl,
        instagramUrl,
        telegramUrl,
        githubUrl,
        otherUrl,
      },
      handleUpdateSocialContent,
    } = this.props

    return (
      <FormCardWrapper
        title="Social Card"
        description="The information in this card displays on the Explorer card."
        showAddSection={false}
      >
        <SocialContentCard
          handleUpdateContent={handleUpdateSocialContent}
          linkedInUrl={linkedInUrl}
          facebookUrl={facebookUrl}
          twitterUrl={twitterUrl}
          discourseUrl={discourseUrl}
          instagramUrl={instagramUrl}
          telegramUrl={telegramUrl}
          githubUrl={githubUrl}
          otherUrl={otherUrl}
        />
      </FormCardWrapper>
    )
  }

  renderEmbeddedSections = (): JSX.Element => {
    const {
      embedded,
      handleUpdateEmbeddedContent,
      handleAddEmbeddedSection,
      handleRemoveEmbeddedSection,
    } = this.props

    return (
      <FormCardWrapper
        title="Embedded Content"
        description={null}
        showAddSection
        onAddSection={handleAddEmbeddedSection}
      >
        {embedded.map(section => {
          const { id, title, urls } = section

          return (
            <EmbeddedContentCard
              id={id}
              key={id}
              title={title}
              urls={urls}
              handleUpdateContent={handleUpdateEmbeddedContent}
              handleRemoveSection={handleRemoveEmbeddedSection}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    return (
      <>
        {this.renderHeader()}
        {/*         {this.renderBodySections()}
        {this.renderImageSections()} */}
        {/* {this.renderVideoSections()} */}
        {/*         {this.renderProfileSections()} */}
        {this.renderSocialContent()}
        {this.renderEmbeddedSections()}
        <ButtonGroup className="buttons-group">
          <button type="submit" className="submitForm">
            Next
          </button>
        </ButtonGroup>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  header: pageContentSelectors.selectHeaderContent(state),
  body: pageContentSelectors.selectBodyContentSections(state),
  images: pageContentSelectors.selectImageContentSections(state),
  profiles: pageContentSelectors.selectProfileContentSections(state),
  videos: pageContentSelectors.selectVideoContentSections(state),
  social: pageContentSelectors.selectSocialContent(state),
  embedded: pageContentSelectors.selectEmbeddedContentSections(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateHeaderContent: (formData: FormData): void =>
    dispatch(updateHeaderContent(formData)),
  handleAddBodySection: (): void => dispatch(addBodySection()),
  handleRemoveBodySection: (id: string): void =>
    dispatch(removeBodySection(id)),
  handleUpdateBodyContent: (id: string, formData: FormData): void =>
    dispatch(updateBodyContent(id, formData)),
  handleAddImageSection: (): void => dispatch(addImageSection()),
  handleRemoveImageSection: (id: string): void =>
    dispatch(removeImageSection(id)),
  handleUpdateImageContent: (id: string, formData: FormData): void =>
    dispatch(updateImageContent(id, formData)),
  handleAddProfileSection: (): void => dispatch(addProfileSection()),
  handleRemoveProfileSection: (id: string): void =>
    dispatch(removeProfileSection(id)),
  handleUpdateProfileContent: (id: string, formData: FormData): void =>
    dispatch(updateProfileContent(id, formData)),
  handleUpdateSocialContent: (formData: FormData): void =>
    dispatch(updateSocialContent(formData)),
  handleUpdateEmbeddedContent: (id: string, formData: FormData): void =>
    dispatch(updateEmbeddedContent(id, formData)),
  handleAddEmbeddedSection: (): void => dispatch(addEmbeddedSection()),
  handleRemoveEmbeddedSection: (id: string): void =>
    dispatch(removeEmbeddedSection(id)),
})

export const CreateEntityPageContentConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityPageContent)
