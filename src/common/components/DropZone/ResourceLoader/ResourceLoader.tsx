import * as React from 'react'
import Dropzone, { Accept } from 'react-dropzone'
import {
  LoaderWrapper,
  UploadingWrapper,
  StyledDropzone,
} from '../Loader.styles'
import UploadFlat from 'assets/icons/UploadFlat'
import PulseLoader from '../../PulseLoader/PulseLoader'
import { strategyMap } from '../strategy-map'
import { FileType } from '../types'
import styled from 'styled-components'
import { ApiResource } from 'common/api/blocksync-api/types/resource'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { PDS_URL } from 'modules/Entities/types'

import {
  Algorithm,
  Asset,
  Authorisation,
  Credential,
  Image,
  Impact,
  Pdf,
  SmartContract,
  // Text,
} from 'assets/icons/LinkedResources'
import { LinkedResourceType } from 'modules/Entities/types'

export const IconWrapper = styled.div<{ color: string }>`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: ${({ color }): string => color};
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 7.5rem;
    height: 7.5rem;
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

  const generateResourceColorAndIcon = (
    type: LinkedResourceType,
  ): [string, JSX.Element] => {
    switch (type) {
      case LinkedResourceType.ALGORITHM:
        return ['#ED9526', <Algorithm key={1} />]
      case LinkedResourceType.IMPACT_PROOF:
        return ['#E2223B', <Impact key={1} />]
      case LinkedResourceType.CREDENTIAL:
        return ['#85AD5C', <Credential key={1} />]
      case LinkedResourceType.IMAGE:
        return ['#E4BC3D', <Image key={1} />]
      case LinkedResourceType.DATA_ASSET:
        return ['#AD245C', <Asset key={1} />]
      case LinkedResourceType.AUTHORISATION:
        return ['#7C2740', <Authorisation key={1} />]
      case LinkedResourceType.PDF:
        return ['#9F2415', <Pdf key={1} />]
      case LinkedResourceType.CODE:
        return ['#39C3E6', <SmartContract key={1} />]
      default:
        return ['#FFFFFF', <></>]
    }
  }

  const fetchContent = (key: string): Promise<ApiResource> =>
    blocksyncApi.project.fetchPublic(key, PDS_URL) as Promise<ApiResource>

  React.useEffect(() => {
    if (path) {
      const cid = path.split('/').pop()
      fetchContent(cid).then((resourceData: ApiResource) => {
        const { contentType } = resourceData
        if (contentType.indexOf('image') > -1) {
          setPreviewDOM(<img src={path} alt="" width={'100%'} />)
        } else if (contentType.indexOf('pdf') > -1) {
          const [color, icon] = generateResourceColorAndIcon(
            LinkedResourceType.PDF,
          )
          setPreviewDOM(<IconWrapper color={color}>{icon}</IconWrapper>)
        } else if (contentType.indexOf('json') > -1) {
          const [color, icon] = generateResourceColorAndIcon(
            LinkedResourceType.CODE,
          )
          setPreviewDOM(<IconWrapper color={color}>{icon}</IconWrapper>)
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
          accept={strategyMap[fileType].newMimeType as Accept}
          onDropAccepted={onDropAccepted}
        >
          {({ getRootProps, getInputProps }): JSX.Element => (
            <StyledDropzone
              {...getRootProps({
                className: 'dropzone',
                onDrop: (event) => event.stopPropagation(),
              })}
            >
              <input {...getInputProps()} />
              <button type="button">
                {strategyMap[fileType].replaceButtonText}{' '}
              </button>
            </StyledDropzone>
          )}
        </Dropzone>
      </LoaderWrapper>
    )
  }

  return (
    <LoaderWrapper>
      <Dropzone
        maxSize={maxFileSize}
        accept={strategyMap[fileType].newMimeType as Accept}
        onDropAccepted={onDropAccepted}
      >
        {({ getRootProps, getInputProps }): JSX.Element => (
          <StyledDropzone
            {...getRootProps({
              className: 'dropzone',
              onDrop: (event) => event.stopPropagation(),
            })}
          >
            <input {...getInputProps()} />
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
          </StyledDropzone>
        )}
      </Dropzone>
    </LoaderWrapper>
  )
}

export default FileLoader
