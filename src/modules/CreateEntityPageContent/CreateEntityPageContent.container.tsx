import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import * as pageContentSelectors from './CreateEntityPageContent.selectors'
import { RootState } from 'src/common/redux/types'
import { HeaderPageContent, BodyPageContent } from './types'
import HeaderCard from './components/HeaderCard/HeaderCard'
import BodyContentCard from './components/BodyContentCard/BodyContentCard'
import {
  updateHeaderContent,
  uploadHeaderContentImage,
  updateBodyContent,
  uploadBodyContentImage,
} from './CreateEntityPageContent.actions'
import { FormData } from 'src/common/components/JsonForm/types'

interface Props {
  header: HeaderPageContent
  body: BodyPageContent[]
  handleUpdateHeaderContent: (formData: FormData) => void
  handleUploadHeaderContentImage: (base64EncodedImage: string) => void
  handleUpdateBodyContent: (id: string, formData: FormData) => void
  handleUploadBodyContentImage: (id: string, base64EncodedImage: string) => void
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
    )
  }

  renderBodyContent = (): JSX.Element => {
    const {
      body,
      handleUpdateBodyContent,
      handleUploadBodyContentImage,
    } = this.props

    return (
      <>
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
      </>
    )
  }

  render(): JSX.Element {
    return this.renderHeader()
  }
}

const mapStateToProps = (state: RootState): any => ({
  header: pageContentSelectors.selectHeaderContent(state),
  body: pageContentSelectors.selectBodyContentSections(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateHeaderContent: (formData: FormData): void =>
    dispatch(updateHeaderContent(formData)),
  handleUploadHeaderContentImage: (base64EncodedImage: string): void =>
    dispatch(uploadHeaderContentImage(base64EncodedImage)),
  handleUpdateBodyContent: (id: string, formData: FormData): void =>
    dispatch(updateBodyContent(id, formData)),
  handleUploadBodyContentImage: (
    id: string,
    base64EncodedImage: string,
  ): void => dispatch(uploadBodyContentImage(id, base64EncodedImage)),
})

export const CreateEntityPageContentConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityPageContent)
