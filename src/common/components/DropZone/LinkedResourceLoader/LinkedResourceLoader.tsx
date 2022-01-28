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
import styled from 'styled-components'
import { ReactComponent as TextIcon } from 'assets/img/resourcetype/code.svg'
import { ReactComponent as PdfIcon } from 'assets/img/resourcetype/pdf.svg'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { PDS_URL } from 'modules/Entities/types'

const IconWrapper = styled.div`
  & path {
    fill: #04d0fb;
  }
`

interface Props {
  maxFileSize: number
  fileType: FileType
  uploading: boolean
  uploadedFileSrc: string
  path: string
  handleSave: (base64EncodedFile: string | undefined) => void
}

const FileLoader: React.FunctionComponent<Props> = ({
  fileType,
  uploading,
  uploadedFileSrc,
  maxFileSize,
  path,
  handleSave,
}) => {
  const maxFileSizeInMB = maxFileSize / 1000000
  const [previewDOM, setPreviewDOM] = React.useState<JSX.Element | null>(null)
  const onDropAccepted = (files: any): void => {
    const file = files[0]

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = (): void => {
      const base64EncodedFile = reader.result?.toString()

      if (base64EncodedFile) {
        handleSave(base64EncodedFile)
      }
    }
  }

  const fetchContent = (key: string): Promise<ApiResource> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<ApiResource>

  React.useEffect(() => {
    if (path) {
      const cid = path.split('/').pop()
      fetchContent(cid).then((resourceData: ApiResource) => {
        const { contentType } = resourceData

        console.log('contentType', contentType)

        if (contentType.indexOf('image') > -1) {
          setPreviewDOM(
            <img className="rounded-circle" src={path} alt="" width={'100%'} />,
          )
        } else if (contentType.indexOf('pdf') > -1) {
          setPreviewDOM(<PdfIcon width="70px" height="70px" />)
        } else if (contentType.indexOf('json') > -1) {
          setPreviewDOM(
            <IconWrapper>
              <TextIcon width="70px" height="70px" />
            </IconWrapper>,
          )
        } else {
          setPreviewDOM(null)
        }
      })
    } else {
      setPreviewDOM(null)
    }
  }, [path])

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
          <PulseLoader
            repeat={!previewDOM}
            style={{ width: '10rem', height: '10rem' }}
          >
            <a href={uploadedFileSrc} target="_blank" rel="noopener noreferrer">
              {/* {React.createElement(strategyMap[fileType].downloadIcon, {
                fill: '#39C3E6',
                width: 32,
              })} */}
              {previewDOM}
              {!previewDOM && 'Loading...'}
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
          <PulseLoader
            repeat={false}
            style={{ width: '10rem', height: '10rem' }}
          >
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
