import React from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import { ModalWrapper, Button } from 'common/components/Wrappers/ModalWrapper'
import Share from 'assets/icons/Share'
import { Available, Verified } from 'assets/icons/LinkedResources'
import { LinkedResourceType } from 'modules/Entities/CreateEntity/CreateEntityPageContent/types'

const Container = styled.div`
  padding-bottom: 0.5rem;
  position: relative;
`

const ContentContainer = styled.div`
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
  border-radius: 0.25rem;
  padding: 1.25rem 1rem;
  display: flex;
  width: 48rem;
  font-weight: 400;
`

const PreviewPlaceholder = styled.div`
  background: #a3a3a3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 20rem;
  width: 15rem;
`

const DetailContainer = styled.div`
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
`
const IconWrapper = styled.div<{ color: string }>`
  border-radius: 3px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }): string => color};
  svg {
    width: 10px;
  }
`

const FileInfo = styled.div`
  display: flex;
  align-items: center;
`

const FileName = styled.div`
  font-weight: 500;
  font-size: 21px;
  color: #fff;
  margin-left: 1.125rem;
`

const CreationDetail = styled.div`
  font-size: 13px;
  color: #ffffff;
  margin-top: 0.25rem;
`

const Hash = styled.div`
  color: #436779;
  font-size: 13px;
`

const Description = styled.div`
  font-size: 16px;
  color: #fff;
  margin-top: 0.5rem;
`

const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;

  button {
    width: 100px;
    margin-right: 1rem;

    svg {
      margin-right: 0.375rem;
    }
  }
`

const Badge = styled.div`
  background: #143f54;
  border-radius: 4px;
  width: 5rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #fff;
  margin-right: 0.5rem;

  svg {
    margin-right: 0.25rem;
  }
`
const Badges = styled.div`
  display: flex;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`

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
          <PreviewPlaceholder>File Preview</PreviewPlaceholder>
          <DetailContainer>
            <FileInfo>
              <IconWrapper color={resource.color}>{resource.icon}</IconWrapper>

              <FileName>{resource.name}</FileName>
            </FileInfo>
            <CreationDetail>By Name Surname • Sept 3, 2022</CreationDetail>
            <Hash>Hd39asddqw...</Hash>
            <Description>{resource.description}</Description>
            <Buttons>
              <Button>Download</Button>
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
