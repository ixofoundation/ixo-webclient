import * as React from 'react'
import Dropzone from 'react-dropzone'
import {
  DropZoneStyles,
  LoaderWrapper,
  UploadingWrapper,
} from '../Loader.styles'
import UploadFlat from 'src/assets/icons/UploadFlat'
import { strategyMap } from '../strategy-map'
import { FileType } from '../types'

interface Props {
  maxFileSize: number
  fileType: FileType
  uploading: boolean
  uploadedFileSrc: string
  handleSave: (base64EncodedFile: string) => void
}

const FileLoader: React.FunctionComponent<Props> = ({
  fileType,
  uploading,
  uploadedFileSrc,
  maxFileSize,
  handleSave,
}) => {
  const maxFileSizeInMB = maxFileSize / 100000

  const onDropAccepted = (files): void => {
    const file = files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = (): void => {
      handleSave(reader.result.toString())
    }
  }

  if (uploading) {
    return (
      <LoaderWrapper>
        <UploadingWrapper>
          <div className="icon-pulse-wrapper repeat">
            <UploadFlat width={32} fill="#39C3E6" />
          </div>
          <p>Uploading...</p>
        </UploadingWrapper>
      </LoaderWrapper>
    )
  }

  if (uploadedFileSrc) {
    return (
      <LoaderWrapper>
        <a href={uploadedFileSrc} target="_blank" rel="noopener noreferrer">
          <div className="icon-wrapper">
            {React.createElement(strategyMap[fileType].downloadIcon, {
              fill: '#39C3E6',
              width: 32,
            })}
          </div>
        </a>
        <Dropzone
          accept={strategyMap[fileType].mimeType}
          onDropAccepted={onDropAccepted}
          style={DropZoneStyles}
        >
          <button>{strategyMap[fileType].replaceButtonText} </button>
        </Dropzone>
      </LoaderWrapper>
    )
  }

  return (
    <LoaderWrapper>
      <Dropzone
        maxSize={maxFileSize}
        accept={strategyMap[fileType].mimeType}
        onDropAccepted={onDropAccepted}
        style={DropZoneStyles}
      >
        <div className="icon-wrapper">
          <UploadFlat width={32} fill="#39C3E6" />
        </div>
        <p className="desktop-upload-item">Drag files to upload, or</p>
        <button>{strategyMap[fileType].uploadButtonText}</button>
        <small>jpeg/png, max size {maxFileSizeInMB}mb</small>
      </Dropzone>
    </LoaderWrapper>
  )
}

export default FileLoader
