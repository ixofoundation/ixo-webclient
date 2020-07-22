import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import * as pageContentSelectors from './CreateEntityPageContent.selectors'
import { RootState } from '../../common/redux/types'
import { HeaderPageContent, BodyPageContent, ImagePageContent } from './types'
import HeaderCard from './components/HeaderCard/HeaderCard'
import BodyContentCard from './components/BodyContentCard/BodyContentCard'
import ImageContentCard from './components/ImageContentCard/ImageContentCard'
import {
  updateHeaderContent,
  uploadHeaderContentImage,
  addBodySection,
  updateBodyContent,
  uploadBodyContentImage,
  addImageSection,
  updateImageContent,
  uploadImageContentImage,
} from './CreateEntityPageContent.actions'
import { FormData } from 'src/common/components/JsonForm/types'
import FormCardWrapper from '../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'

interface Props {
  header: HeaderPageContent
  body: BodyPageContent[]
  images: ImagePageContent[]
  handleUpdateHeaderContent: (formData: FormData) => void
  handleUploadHeaderContentImage: (base64EncodedImage: string) => void
  handleAddBodySection: () => void
  handleUpdateBodyContent: (id: string, formData: FormData) => void
  handleUploadBodyContentImage: (id: string, base64EncodedImage: string) => void
  handleAddImageSection: () => void
  handleUpdateImageContent: (id: string, formData: FormData) => void
  handleUploadImageContentImage: (
    id: string,
    base64EncodedImage: string,
  ) => void
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
              key={section.id}
              title={title}
              content={content}
              imageDid={imageDid}
              uploadingImage={uploadingImage}
              handleUpdateContent={(formData): void =>
                handleUpdateBodyContent(id, formData)
              }
              handleUploadImage={(base64EncodedImage): void =>
                handleUploadBodyContentImage(id, base64EncodedImage)
              }
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
              key={section.id}
              title={title}
              content={content}
              imageDid={imageDid}
              imageDescription={imageDescription}
              uploadingImage={uploadingImage}
              handleUpdateContent={(formData): void =>
                handleUpdateImageContent(id, formData)
              }
              handleUploadImage={(base64EncodedImage): void =>
                handleUploadImageContentImage(id, base64EncodedImage)
              }
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
        {this.renderBodySections()}
        {this.renderImageSections()}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  header: pageContentSelectors.selectHeaderContent(state),
  body: pageContentSelectors.selectBodyContentSections(state),
  images: pageContentSelectors.selectImageContentSections(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateHeaderContent: (formData: FormData): void =>
    dispatch(updateHeaderContent(formData)),
  handleUploadHeaderContentImage: (base64EncodedImage: string): void =>
    dispatch(uploadHeaderContentImage(base64EncodedImage)),
  handleAddBodySection: (): void => dispatch(addBodySection()),
  handleUpdateBodyContent: (id: string, formData: FormData): void =>
    dispatch(updateBodyContent(id, formData)),
  handleUploadBodyContentImage: (
    id: string,
    base64EncodedImage: string,
  ): void => dispatch(uploadBodyContentImage(id, base64EncodedImage)),
  handleAddImageSection: (): void => dispatch(addImageSection()),
  handleUpdateImageContent: (id: string, formData: FormData): void =>
    dispatch(updateImageContent(id, formData)),
  handleUploadImageContentImage: (
    id: string,
    base64EncodedImage: string,
  ): void => dispatch(uploadImageContentImage(id, base64EncodedImage)),
})

export const CreateEntityPageContentConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityPageContent)
