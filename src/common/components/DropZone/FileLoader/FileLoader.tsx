import * as React from 'react'
import Dropzone from 'react-dropzone'
import { DropZoneStyles } from '../Loader.styles'

interface Props {
  acceptedFileTypes: string
  uploading: boolean
  uploadedFileSrc: string
  handleSave: (base64EncodedFile: string) => void
}

const FileLoader: React.FunctionComponent<Props> = ({
  uploading,
  uploadedFileSrc,
  acceptedFileTypes,
  handleSave,
}) => {
  return (
    <Dropzone
      accept={acceptedFileTypes}
      onDropAccepted={this.onDropAccepted}
      style={DropZoneStyles}
    >
      <button>Update Image</button>
    </Dropzone>
  )
}
