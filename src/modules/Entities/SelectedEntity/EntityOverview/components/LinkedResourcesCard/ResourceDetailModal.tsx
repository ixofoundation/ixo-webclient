import React from 'react'
import Axios from 'axios'
import { Document, Page, pdfjs } from 'react-pdf'
import { ModalWrapper, Button } from 'common/components/Wrappers/ModalWrapper'
import Share from 'assets/icons/Share'
import { Available, Verified } from 'assets/icons/LinkedResources'
import { LinkedResourceType } from 'modules/Entities/CreateEntity/CreateEntityPageContent/types'
import DocumentView from 'common/components/Document/Document'
import {
  PdfViewerWrapper,
  Container,
  ContentContainer,
  FilePreviewWrapper,
  PreviewPlaceholder,
  DetailContainer,
  IconWrapper,
  FileInfo,
  FileName,
  Description,
  Buttons,
  Badge,
  Badges,
} from './ResourceDetialModal.styles'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface Props {
  isOpened: boolean
  resource: {
    type: LinkedResourceType
    name: string
    description: string
    path: string
    color: string
    icon: JSX.Element
  }
  handleToggleModal: () => void
}

const ResourceDetailModal: React.FunctionComponent<Props> = ({
  isOpened,
  resource,
  handleToggleModal,
}) => {
  const [available, setAvailable] = React.useState(false)

  React.useEffect(() => {
    Axios.get(resource.path)
      .then(() => {
        setAvailable(true)
      })
      .catch((error) => {
        console.error(error)
        setAvailable(false)
      })
  }, [resource.path])

  const renderFilePreview = (
    fileType: LinkedResourceType,
    path: string,
  ): JSX.Element => {
    switch (fileType) {
      case LinkedResourceType.IMAGE:
        return <img src={path} alt="" width={'100%'} />
      case LinkedResourceType.CODE:
        return (
          <DocumentView
            url={path}
            onError={(): void => {
              console.log('error')
            }}
          />
        )
      case LinkedResourceType.PDF:
        return (
          <PdfViewerWrapper href={path} target="_blank">
            <Document file={path}>
              <Page pageNumber={1} />
            </Document>
          </PdfViewerWrapper>
        )
      default:
        return <PreviewPlaceholder>File Preview</PreviewPlaceholder>
    }
  }

  const handleDownload = (): void => {
    fetch(resource.path).then((response) => {
      response.blob().then((blob) => {
        const { type } = blob
        const a: any = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        const extension = type.split('/')[1]
        a.download = `${resource.name}.${extension}`

        a.click()
      })
    })
  }

  return (
    <ModalWrapper isModalOpen={isOpened} handleToggleModal={handleToggleModal}>
      <Container>
        <Badges>
          <Badge>
            <Available fill={available ? '#85AD5C' : '#9F2415'} />
            {available ? 'Available' : 'Unavailable'}
          </Badge>
          <Badge style={{ opacity: 0.5 }}>
            <Verified />
            Verified
          </Badge>
        </Badges>
        <ContentContainer>
          <FilePreviewWrapper>
            {renderFilePreview(resource.type, resource.path)}
          </FilePreviewWrapper>

          <DetailContainer>
            <FileInfo>
              <IconWrapper color={resource.color}>{resource.icon}</IconWrapper>

              <FileName>{resource.name}</FileName>
            </FileInfo>
            {/* <CreationDetail>By Name Surname • Sept 3, 2022</CreationDetail>
            <Hash>Hd39asddqw...</Hash> */}
            <Description>{resource.description}</Description>
            <Buttons>
              <Button onClick={handleDownload}>Download</Button>

              <Button>
                <Share fill="#00d2ff" />
                Share
              </Button>
            </Buttons>
          </DetailContainer>
        </ContentContainer>
      </Container>
    </ModalWrapper>
  )
}

export default ResourceDetailModal
