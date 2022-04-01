import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Resources,
  ResourceContainer,
  Resource,
  IconWrapper,
  Title,
  Description,
} from './LinkedResourcesSection.styles'
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
import { LinkedResourceType } from 'modules/Entities/types'
import { RootState } from 'common/redux/types'

const LinkedResourcesSection: FunctionComponent = () => {
  const { linkedResources } = useSelector(
    (state: RootState) => state.selectedEntity,
  )
  const [prevModalOpen, setPrevModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState({
    [`@type`]: LinkedResourceType.UNDEFINED,
    name: '',
    description: '',
    path: '',
    color: '',
    icon: null,
  })

  const handleResourceClick = (
    color: string,
    icon: JSX.Element,
    linkedResource,
  ): void => {
    setSelectedResource({
      color,
      icon,
      ...linkedResource,
    })
    setPrevModalOpen(true)
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

  return linkedResources ? (
    <>
      <h2>Linked Resources</h2>
      <Resources>
        {linkedResources.map(
          (linkedResource, index: number): JSX.Element => {
            const [color, icon] = generateResourceColorAndIcon(
              linkedResource[`@type`],
            )
            return (
              <ResourceContainer key={index}>
                <Resource
                  onClick={(): void =>
                    handleResourceClick(color, icon, linkedResource)
                  }
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
      </Resources>

      <ResourceDetailModal
        isOpened={prevModalOpen}
        handleToggleModal={(): void => setPrevModalOpen(!prevModalOpen)}
        resource={selectedResource}
      />
    </>
  ) : (
    <></>
  )
}

export default LinkedResourcesSection
