import React, { FunctionComponent, useState } from 'react'
import {
  Resources,
  ResourceContainer,
  Resource,
  IconWrapper,
  Title,
  Description,
} from './LinkedResourcesCard.styles'
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
import ResourceDetailModal from './ResourceDetailModal'
import { PageContentLinkedResources } from 'common/api/blocksync-api/types/page-content'
import { LinkedResourceType } from 'modules/Entities/CreateEntity/CreateEntityPageContent/types'

interface Props {
  linkedResources: PageContentLinkedResources[]
}

const LinkedResourcesCard: FunctionComponent<Props> = ({ linkedResources }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalIcon, setModalIcon] = useState({ color: '', icon: null })

  const handleResourceClick = (color, icon) => {
    setModalIcon({
      color,
      icon,
    })
    setIsModalOpened(true)
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

  return (
    <>
      <h2>Linked Resources</h2>
      <Resources>
        {linkedResources.map(
          (
            linkedResource: PageContentLinkedResources,
            index: number,
          ): JSX.Element => {
            const [color, icon] = generateResourceColorAndIcon(
              linkedResource.type,
            )
            return (
              <ResourceContainer key={index}>
                <Resource
                  onClick={(): void => handleResourceClick(color, icon)}
                >
                  <IconWrapper color={color}>{icon}</IconWrapper>
                  <div>
                    <Title>{linkedResource.name}</Title>
                    <Description>{linkedResource.description}</Description>
                  </div>
                </Resource>
              </ResourceContainer>
            )
          },
        )}
        {/* <ResourceContainer>
          <Resource
            onClick={(): void => handleResourceClick('#E4BC3D', <Image />)}
          >
            <IconWrapper color="#E4BC3D">
              <Image />
            </IconWrapper>
            <div>
              <Title>This is an image</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer>
        <ResourceContainer>
          <Resource
            onClick={(): void => handleResourceClick('#405681', <Text />)}
          >
            <IconWrapper color="#405681">
              <Text />
            </IconWrapper>
            <div>
              <Title>This is a text file</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer>
        <ResourceContainer>
          <Resource
            onClick={(): void => handleResourceClick('#85AD5C', <Credential />)}
          >
            <IconWrapper color="#85AD5C">
              <Credential />
            </IconWrapper>
            <div>
              <Title>This is a credential</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer>
        <ResourceContainer>
          <Resource
            onClick={(): void => handleResourceClick('#E2223B', <Impact />)}
          >
            <IconWrapper color="#E2223B">
              <Impact />
            </IconWrapper>
            <div>
              <Title>Impact proof</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer>
        <ResourceContainer>
          <Resource
            onClick={(): void =>
              handleResourceClick('#7C2740', <Authorisation />)
            }
          >
            <IconWrapper color="#7C2740">
              <Authorisation />
            </IconWrapper>
            <div>
              <Title>Authorisation</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer>
        <ResourceContainer>
          <Resource
            onClick={(): void => handleResourceClick('#AD245C', <Asset />)}
          >
            <IconWrapper color="#AD245C">
              <Asset />
            </IconWrapper>
            <div>
              <Title>Data asset</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer>
        <ResourceContainer>
          <Resource
            onClick={(): void => handleResourceClick('#ED9526', <Algorithm />)}
          >
            <IconWrapper color="#ED9526">
              <Algorithm />
            </IconWrapper>
            <div>
              <Title>Algorithm</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer>
        <ResourceContainer>
          <Resource
            onClick={(): void =>
              handleResourceClick('#39C3E6', <SmartContract />)
            }
          >
            <IconWrapper color="#39C3E6">
              <SmartContract />
            </IconWrapper>
            <div>
              <Title>Smart Contract</Title>
              <Description>2D432</Description>
            </div>
          </Resource>
        </ResourceContainer> */}
      </Resources>

      <ResourceDetailModal
        isOpened={isModalOpened}
        handleToggleModal={(): void => setIsModalOpened(!isModalOpened)}
        icon={modalIcon.icon}
        iconBgColor={modalIcon.color}
      />
    </>
  )
}

export default LinkedResourcesCard
