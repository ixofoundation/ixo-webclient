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
import { thousandSeparator } from 'common/utils/formatters'
import { displayTokenAmount } from 'common/utils/currency.utils'

interface Props {
  title?: string
}

const EntityCollection: React.FC<Props> = (): JSX.Element => {
  const title = `White Rhino`
  const collection = `Malawi Collection 2022`
  const context = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.
  `
  const creator = `SuperMoto Clean Cooking`
  const minted = `31/09/2022`
  const maxSupply = 1000
  const owned = 630
  const highestPrice = 240
  const lowestPrice = 120
  const carbonCredits = 3430
  const location = `Malawi District Y`
  const make = `SupaMoto`
  const model = `BurnaBoy`
  const efficiency = 85
  const monthlyRevenue = 8.9

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
        {title}
      </EntityCollectionText>
      <EntityCollectionText className="mb-1">{collection}</EntityCollectionText>
      <EntityCollectionText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={600}
        className="mb-1"
      >
        Context
      </EntityCollectionText>
      <EntityCollectionText className="mb-2">{context}</EntityCollectionText>

      <EntityCollectionText>Creator: {creator}</EntityCollectionText>
      <EntityCollectionText>Minted: {minted}</EntityCollectionText>
    </EntityCollectionContext>
  )
  const renderMetrics = (): JSX.Element => (
    <EntityCollectionMetrics className="d-flex flex-column mt-5">
      <EntityCollectionText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={600}
        className="mb-1"
      >
        Metrics
      </EntityCollectionText>
      <ul>
        <li>
          <EntityCollectionText color="#49BFE0" fontWeight={600}>
            {thousandSeparator(maxSupply, ',')}
          </EntityCollectionText>
          <EntityCollectionText> Max Supply</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText color="#5AB946" fontWeight={600}>
            {thousandSeparator(owned, ',')}
          </EntityCollectionText>
          <EntityCollectionText> Owned</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText fontWeight={600}>
            ${displayTokenAmount(highestPrice, 2)} / $
            {displayTokenAmount(lowestPrice, 2)}
          </EntityCollectionText>
          <EntityCollectionText> Highest-Lowest Price</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText color="#2F6CA1" fontWeight={600}>
            {thousandSeparator(carbonCredits, ',')}
          </EntityCollectionText>
          <EntityCollectionText> Carbon Credits</EntityCollectionText>
        </li>
      </ul>
    </EntityCollectionMetrics>
  )
  const renderAttributes = (): JSX.Element => (
    <EntityCollectionAttributes className="d-flex flex-column mt-5">
      <EntityCollectionText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={600}
        className="mb-1"
      >
        Attributes
      </EntityCollectionText>
      <ul>
        <li>
          <EntityCollectionText>Location: </EntityCollectionText>
          <EntityCollectionText fontWeight={600}>
            {location}
          </EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Make: </EntityCollectionText>
          <EntityCollectionText color={'#FFAE4F'} fontWeight={600}>
            {make}
          </EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Model: </EntityCollectionText>
          <EntityCollectionText fontWeight={600}>{model}</EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Efficiency: </EntityCollectionText>
          <EntityCollectionText color={'#49BFE0'} fontWeight={600}>
            {efficiency}%
          </EntityCollectionText>
        </li>
        <li>
          <EntityCollectionText>Monthly Revenue: </EntityCollectionText>
          <EntityCollectionText color={'#49BFE0'} fontWeight={600}>
            ${displayTokenAmount(monthlyRevenue, 2)}
          </EntityCollectionText>
        </li>
      </ul>
    </EntityCollectionAttributes>
  )

  return (
    <EntityCollectionRow className="row mb-4">
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
