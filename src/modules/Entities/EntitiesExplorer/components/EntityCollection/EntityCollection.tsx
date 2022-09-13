import React from 'react'
import {
  EntityCollectionRow,
  EntityCollectionCol,
  EntityCollectionImage,
  EntityCollectionContext,
  EntityCollectionMetrics,
  EntityCollectionAttributes,
  EntityCollectionText,
} from './EntityCollection.styles'

import image from 'assets/images/assets/CookStove.png'

interface Props {
  title?: string
}

const EntityCollection: React.FC<Props> = ({ title = '' }): JSX.Element => {
  const renderImage = (): JSX.Element => (
    <EntityCollectionImage>
      <img src={image} alt="" />
    </EntityCollectionImage>
  )
  const renderContext = (): JSX.Element => (
    <EntityCollectionContext className="d-flex flex-column">
      <EntityCollectionText
        color="#01283B"
        fontSize="24px"
        lineHeight="28px"
        fontWeight={700}
      >
        White Rhino
      </EntityCollectionText>
      <EntityCollectionText>Malawi Collection 2022</EntityCollectionText>
      <EntityCollectionText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={500}
      >
        Context
      </EntityCollectionText>
      <EntityCollectionText className="mb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </EntityCollectionText>

      <EntityCollectionText>
        Creator: SuperMoto Clean Cooking
      </EntityCollectionText>
      <EntityCollectionText>Minted: 31/09/2022</EntityCollectionText>
    </EntityCollectionContext>
  )
  const renderMetrics = (): JSX.Element => (
    <EntityCollectionMetrics className="d-flex flex-column">
      <EntityCollectionText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={500}
      >
        Metrics
      </EntityCollectionText>
      <ul>
        <li>
          <EntityCollectionText color="#49BFE0" fontWeight={600}>
            1,000
          </EntityCollectionText>
          <EntityCollectionText> Max Supply</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText color="#5AB946" fontWeight={600}>
            630
          </EntityCollectionText>
          <EntityCollectionText> Owned</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText fontWeight={600}>
            $240.00 / $120.00
          </EntityCollectionText>
          <EntityCollectionText> Highest-Lowest Price</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText color="#2F6CA1" fontWeight={600}>
            3,430
          </EntityCollectionText>
          <EntityCollectionText> Carbon Credits</EntityCollectionText>
        </li>
      </ul>
    </EntityCollectionMetrics>
  )
  const renderAttributes = (): JSX.Element => (
    <EntityCollectionAttributes className="d-flex flex-column">
      <EntityCollectionText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={500}
      >
        Attributes
      </EntityCollectionText>
      <ul>
        <li>
          <EntityCollectionText>Location: </EntityCollectionText>
          <EntityCollectionText fontWeight={600}>
            Malawi District Y
          </EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Make: </EntityCollectionText>
          <EntityCollectionText color={'#FFAE4F'} fontWeight={600}>
            SupaMoto
          </EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Model: </EntityCollectionText>
          <EntityCollectionText fontWeight={600}>BurnaBoy</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Efficiency: </EntityCollectionText>
          <EntityCollectionText color={'#49BFE0'} fontWeight={600}>
            85%
          </EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Monthly Revenue: </EntityCollectionText>
          <EntityCollectionText color={'#49BFE0'} fontWeight={600}>
            $8.90
          </EntityCollectionText>
        </li>
      </ul>
    </EntityCollectionAttributes>
  )

  return (
    <EntityCollectionRow className="row align-items-center mb-4">
      <EntityCollectionCol className="col-3">
        {renderImage()}
      </EntityCollectionCol>
      <EntityCollectionCol className="col-3">
        {renderContext()}
      </EntityCollectionCol>
      <EntityCollectionCol className="col-3">
        {renderMetrics()}
      </EntityCollectionCol>
      <EntityCollectionCol className="col-3">
        {renderAttributes()}
      </EntityCollectionCol>
    </EntityCollectionRow>
  )
}

export default EntityCollection
