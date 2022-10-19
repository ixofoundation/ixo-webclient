import React from 'react'
import {
  AssetCollectionOverviewRow,
  AssetCollectionOverviewCol,
  AssetCollectionOverviewImage,
  AssetCollectionOverviewContext,
  AssetCollectionOverviewMetrics,
  AssetCollectionOverviewAttributes,
  AssetCollectionOverviewText,
  AssetCollectionOverviewAssistant,
} from './AssetCollectionOverview.styles'

import image from 'assets/images/assets/CookStove.png'
import { thousandSeparator } from 'common/utils/formatters'
import { displayTokenAmount } from 'common/utils/currency.utils'
import { AssistantButton } from 'common/components/AssistantButton'

interface Props {
  title?: string
}

const AssetCollectionOverview: React.FC<Props> = (): JSX.Element => {
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
    <AssetCollectionOverviewImage>
      <img src={image} alt="" />
    </AssetCollectionOverviewImage>
  )
  const renderContext = (): JSX.Element => (
    <AssetCollectionOverviewContext className="d-flex flex-column">
      <AssetCollectionOverviewText
        color="#01283B"
        fontSize="24px"
        lineHeight="28px"
        fontWeight={700}
      >
        {title}
      </AssetCollectionOverviewText>
      <AssetCollectionOverviewText className="mb-1">{collection}</AssetCollectionOverviewText>
      <AssetCollectionOverviewText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={600}
        className="mb-1"
      >
        Context
      </AssetCollectionOverviewText>
      <AssetCollectionOverviewText className="mb-2">{context}</AssetCollectionOverviewText>

      <AssetCollectionOverviewText>Creator: {creator}</AssetCollectionOverviewText>
      <AssetCollectionOverviewText>Minted: {minted}</AssetCollectionOverviewText>
    </AssetCollectionOverviewContext>
  )
  const renderMetrics = (): JSX.Element => (
    <AssetCollectionOverviewMetrics className="d-flex flex-column mt-5">
      <AssetCollectionOverviewText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={600}
        className="mb-1"
      >
        Metrics
      </AssetCollectionOverviewText>
      <ul>
        <li>
          <AssetCollectionOverviewText color="#49BFE0" fontWeight={600}>
            {thousandSeparator(maxSupply, ',')}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText> Max Supply</AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText color="#5AB946" fontWeight={600}>
            {thousandSeparator(owned, ',')}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText> Owned</AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText fontWeight={600}>
            ${displayTokenAmount(highestPrice, 2)} / $
            {displayTokenAmount(lowestPrice, 2)}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText> Highest-Lowest Price</AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText color="#2F6CA1" fontWeight={600}>
            {thousandSeparator(carbonCredits, ',')}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText> Carbon Credits</AssetCollectionOverviewText>
        </li>
      </ul>
    </AssetCollectionOverviewMetrics>
  )
  const renderAttributes = (): JSX.Element => (
    <AssetCollectionOverviewAttributes className="d-flex flex-column mt-5">
      <AssetCollectionOverviewText
        fontSize="16px"
        lineHeight="19px"
        color="#01283B"
        fontWeight={600}
        className="mb-1"
      >
        Attributes
      </AssetCollectionOverviewText>
      <ul>
        <li>
          <AssetCollectionOverviewText>Location: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText fontWeight={600}>
            {location}
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>Make: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText color={'#FFAE4F'} fontWeight={600}>
            {make}
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>Model: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText fontWeight={600}>{model}</AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>Efficiency: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText color={'#49BFE0'} fontWeight={600}>
            {efficiency}%
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>Monthly Revenue: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText color={'#49BFE0'} fontWeight={600}>
            ${displayTokenAmount(monthlyRevenue, 2)}
          </AssetCollectionOverviewText>
        </li>
      </ul>
    </AssetCollectionOverviewAttributes>
  )

  return (
    <AssetCollectionOverviewRow className="row position-relative mb-4">
      <AssetCollectionOverviewCol className="col-3">
        {renderImage()}
      </AssetCollectionOverviewCol>
      <AssetCollectionOverviewCol className="col-3">
        {renderContext()}
      </AssetCollectionOverviewCol>
      <AssetCollectionOverviewCol className="col-3">
        {renderMetrics()}
      </AssetCollectionOverviewCol>
      <AssetCollectionOverviewCol className="col-3">
        {renderAttributes()}
      </AssetCollectionOverviewCol>

      <AssetCollectionOverviewAssistant className="position-absolute">
        <AssistantButton />
      </AssetCollectionOverviewAssistant>
    </AssetCollectionOverviewRow>
  )
}

export default AssetCollectionOverview
