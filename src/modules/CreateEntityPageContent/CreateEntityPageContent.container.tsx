import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import * as pageContentSelectors from './CreateEntityPageContent.selectors'
import { RootState } from 'src/common/redux/types'
import { HeaderPageContent } from './types'
import HeaderCard from './components/HeaderCard/HeaderCard'
import {
  updateHeaderContent,
  uploadHeaderContentImage,
} from './CreateEntityPageContent.actions'
import { FormData } from 'src/common/components/JsonForm/types'

interface Props {
  header: HeaderPageContent
  handleUpdateHeaderContent: (formData: FormData) => void
  handleUploadHeaderContentImage: (base64EncodedImage: string) => void
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

  render(): JSX.Element {
    return this.renderHeader()
  }
}

const mapStateToProps = (state: RootState): any => ({
  header: pageContentSelectors.selectHeaderContent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateHeaderContent: (formData: FormData): void =>
    dispatch(updateHeaderContent(formData)),
  handleUploadHeaderContentImage: (base64EncodedImage: string): void =>
    dispatch(uploadHeaderContentImage(base64EncodedImage)),
})

export const CreateEntityPageContentConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityPageContent)
