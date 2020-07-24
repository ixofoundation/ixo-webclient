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
} from './types'
import HeaderCard from './components/HeaderCard/HeaderCard'
import BodyContentCard from './components/BodyContentCard/BodyContentCard'
import ImageContentCard from './components/ImageContentCard/ImageContentCard'
import VideoContentCard from './components/VideoContentCard/VideoContentCard'
import ProfileContentCard from './components/ProfileContentCard/ProfileContentCard'
import SocialContentCard from './components/SocialContentCard/SocialContentCard'
import {
  updateHeaderContent,
  uploadHeaderContentImage,
  addBodySection,
  updateBodyContent,
  uploadBodyContentImage,
  addImageSection,
  updateImageContent,
  uploadImageContentImage,
  addVideoSection,
  updateVideoContent,
  uploadVideoContentVideo,
  addProfileSection,
  updateProfileContent,
  uploadProfileContentImage,
  updateSocialContent,
  removeBodySection,
  removeImageSection,
  removeVideoSection,
  removeProfileSection,
} from './CreateEntityPageContent.actions'
import { FormData } from 'src/common/components/JsonForm/types'
import FormCardWrapper from '../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'

interface Props {
  header: HeaderPageContent
  body: BodyPageContent[]
  images: ImagePageContent[]
  videos: VideoPageContent[]
  profiles: ProfilePageContent[]
  social: SocialPageContent
  handleUpdateHeaderContent: (formData: FormData) => void
  handleUploadHeaderContentImage: (base64EncodedImage: string) => void
  handleAddBodySection: () => void
  handleRemoveBodySection: (id: string) => void
  handleUpdateBodyContent: (id: string, formData: FormData) => void
  handleUploadBodyContentImage: (id: string, base64EncodedImage: string) => void
  handleAddImageSection: () => void
  handleRemoveImageSection: (id: string) => void
  handleUpdateImageContent: (id: string, formData: FormData) => void
  handleUploadImageContentImage: (
    id: string,
    base64EncodedImage: string,
  ) => void
  handleAddVideoSection: () => void
  handleRemoveVideoSection: (id: string) => void
  handleUpdateVideoContent: (id: string, formData: FormData) => void
  handleUploadVideoContentVideo: (
    id: string,
    base64EncodedVideo: string,
  ) => void
  handleAddProfileSection: () => void
  handleRemoveProfileSection: (id: string) => void
  handleUpdateProfileContent: (id: string, formData: FormData) => void
  handleUploadProfileContentImage: (
    id: string,
    base64EncodedImage: string,
  ) => void
  handleUpdateSocialContent: (formData: FormData) => void
}

class CreateEntityPageContent extends React.Component<Props> {
  renderHeader = (): JSX.Element => {
    const {
      header: {
        title,
        shortDescription,
        imageDescription,
        imageDid,
        company,
        country,
        sdgs,
        uploadingImage,
      },
      handleUpdateHeaderContent,
      handleUploadHeaderContentImage,
    } = this.props

    return (
      <FormCardWrapper
        title="Header Card"
        description="The information in this card displays on the Explorer card."
        showAddSection={false}
      >
        <HeaderCard
          handleUpdateContent={handleUpdateHeaderContent}
          handleUploadImage={handleUploadHeaderContentImage}
          title={title}
          shortDescription={shortDescription}
          imageDescription={imageDescription}
          imageDid={imageDid}
          company={company}
          country={country}
          sdgs={sdgs}
          uploadingImage={uploadingImage}
        />
      </FormCardWrapper>
    )
  }

  renderBodySections = (): JSX.Element => {
    const {
      body,
      handleUpdateBodyContent,
      handleUploadBodyContentImage,
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
          const { id, title, content, imageDid, uploadingImage } = section

          return (
            <BodyContentCard
              id={id}
              key={id}
              title={title}
              content={content}
              imageDid={imageDid}
              uploadingImage={uploadingImage}
              handleUpdateContent={handleUpdateBodyContent}
              handleUploadImage={handleUploadBodyContentImage}
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
            imageDid,
            imageDescription,
            uploadingImage,
          } = section

          return (
            <ImageContentCard
              id={id}
              key={id}
              title={title}
              content={content}
              imageDid={imageDid}
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
  }

  renderVideoSections = (): JSX.Element => {
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
  }

  renderProfileSections = (): JSX.Element => {
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
            imageDid,
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
              imageDid={imageDid}
              uploadingImage={uploadingImage}
              handleUpdateContent={handleUpdateProfileContent}
              handleUploadImage={handleUploadProfileContentImage}
              handleRemoveSection={handleRemoveProfileSection}
            />
          )
        })}
      </FormCardWrapper>
    )
  }

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

  render(): JSX.Element {
    return (
      <>
        {this.renderHeader()}
        {this.renderBodySections()}
        {this.renderImageSections()}
        {this.renderVideoSections()}
        {this.renderProfileSections()}
        {this.renderSocialContent()}
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
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateHeaderContent: (formData: FormData): void =>
    dispatch(updateHeaderContent(formData)),
  handleUploadHeaderContentImage: (base64EncodedImage: string): void =>
    dispatch(uploadHeaderContentImage(base64EncodedImage)),
  handleAddBodySection: (): void => dispatch(addBodySection()),
  handleRemoveBodySection: (id: string): void =>
    dispatch(removeBodySection(id)),
  handleUpdateBodyContent: (id: string, formData: FormData): void =>
    dispatch(updateBodyContent(id, formData)),
  handleUploadBodyContentImage: (
    id: string,
    base64EncodedImage: string,
  ): void => dispatch(uploadBodyContentImage(id, base64EncodedImage)),
  handleAddImageSection: (): void => dispatch(addImageSection()),
  handleRemoveImageSection: (id: string): void =>
    dispatch(removeImageSection(id)),
  handleUpdateImageContent: (id: string, formData: FormData): void =>
    dispatch(updateImageContent(id, formData)),
  handleUploadImageContentImage: (
    id: string,
    base64EncodedImage: string,
  ): void => dispatch(uploadImageContentImage(id, base64EncodedImage)),
  handleAddVideoSection: (): void => dispatch(addVideoSection()),
  handleRemoveVideoSection: (id: string): void =>
    dispatch(removeVideoSection(id)),
  handleUpdateVideoContent: (id: string, formData: FormData): void =>
    dispatch(updateVideoContent(id, formData)),
  handleUploadVideoContentVideo: (
    id: string,
    base64EncodedVideo: string,
  ): void => dispatch(uploadVideoContentVideo(id, base64EncodedVideo)),
  handleAddProfileSection: (): void => dispatch(addProfileSection()),
  handleRemoveProfileSection: (id: string): void =>
    dispatch(removeProfileSection(id)),
  handleUpdateProfileContent: (id: string, formData: FormData): void =>
    dispatch(updateProfileContent(id, formData)),
  handleUploadProfileContentImage: (
    id: string,
    base64EncodedImage: string,
  ): void => dispatch(uploadProfileContentImage(id, base64EncodedImage)),
  handleUpdateSocialContent: (formData: FormData): void =>
    dispatch(updateSocialContent(formData)),
})

export const CreateEntityPageContentConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityPageContent)
