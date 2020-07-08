import * as React from 'react'
import Dropzone from 'react-dropzone'
import { DropZoneStyles } from '../Loader.styles'

interface Props {
  acceptedFileTypes: string
  uploading: boolean
  uploadedFileSrc: string
  handleSave: (base64EncodedFile: string) => void
}

class FileLoader extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  onDropAccepted = () => {
    return false
  }

  render() {
    const { acceptedFileTypes } = this.props

    return (
      <Dropzone
        accept={acceptedFileTypes}
        onDropAccepted={this.onDropAccepted}
        style={DropZoneStyles}
      >
        <button>Update File</button>
      </Dropzone>
    )
  }
}
