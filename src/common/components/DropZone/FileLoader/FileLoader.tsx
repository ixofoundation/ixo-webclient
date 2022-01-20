import * as React from 'react'
import Dropzone from 'react-dropzone'
import {
  LoaderWrapper,
  UploadingWrapper,
  DropZoneStyles,
} from '../Loader.styles'
import UploadFlat from 'assets/icons/UploadFlat'
import PulseLoader from '../../PulseLoader/PulseLoader'
import { strategyMap } from '../strategy-map'
import { FileType } from '../types'

interface Props {
  maxFileSize: number
  fileType: FileType
  uploading: boolean
  uploadedFileSrc: string
  handleSave: (base64EncodedFile: string | undefined) => void
}

const FileLoader: React.FunctionComponent<Props> = ({
  fileType,
  uploading,
  uploadedFileSrc,
  maxFileSize,
  handleSave,
}) => {
  const maxFileSizeInMB = maxFileSize / 1000000

  const onDropAccepted = (files: any): void => {
    const file = files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = (): void => {
      console.log(11111, reader)
      handleSave(reader.result?.toString())
    }
  }

  if (uploading) {
    return (
      <LoaderWrapper>
        <UploadingWrapper>
          <PulseLoader repeat={true}>
            <UploadFlat width={32} fill="#39C3E6" />
          </PulseLoader>
          <p>Uploading...</p>
        </UploadingWrapper>
      </LoaderWrapper>
    )
  }

  if (uploadedFileSrc) {
    return (
      <LoaderWrapper>
        <span className="file-preview">
          <PulseLoader repeat={false}>
            <a href={uploadedFileSrc} target="_blank" rel="noopener noreferrer">
              {React.createElement(strategyMap[fileType].downloadIcon, {
                fill: '#39C3E6',
                width: 32,
              })}
            </a>
          </PulseLoader>
        </span>
        <Dropzone
          accept={strategyMap[fileType].mimeType}
          onDropAccepted={onDropAccepted}
          style={DropZoneStyles}
        >
          <button type="button">
            {strategyMap[fileType].replaceButtonText}{' '}
          </button>
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
        <React.Fragment>
          <PulseLoader repeat={false}>
            <UploadFlat width={32} fill="#39C3E6" />
          </PulseLoader>
          <p className="desktop-upload-item">Drag files to upload, or</p>
          <button type="button">
            {strategyMap[fileType].uploadButtonText}
          </button>
          <small>
            {strategyMap[fileType].fileTypesText}, max size {maxFileSizeInMB}
            mb
          </small>
        </React.Fragment>
      </Dropzone>
    </LoaderWrapper>
  )
}

export default FileLoader
