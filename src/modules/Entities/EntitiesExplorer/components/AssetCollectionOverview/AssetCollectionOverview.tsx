import React, { useState } from 'react'
import cx from 'classnames'
import {
  AssetCollectionOverviewWrapper,
  AssetCollectionOverviewCol,
  AssetCollectionOverviewImage,
  AssetCollectionOverviewContext,
  AssetCollectionOverviewMetrics,
  AssetCollectionOverviewAttributes,
  AssetCollectionOverviewText,
  AssetCollectionOverviewTabs,
  DetailBox,
  DetailBoxText,
  DetailBoxLogo,
  AssetCollectionOverviewRow,
} from './AssetCollectionOverview.styles'

import { thousandSeparator } from 'common/utils/formatters'
import { displayTokenAmount } from 'common/utils/currency.utils'
import { TAssetCollection } from '../AssetCollections/types'
import { Box, Typography } from 'modules/App/App.styles'
import { Button } from 'common/components'
import { ReactComponent as IconArrowLeft } from 'assets/images/icon-arrow-left.svg'
import { AssetCollectionSdgs } from '../AssetCollections/AssetCollectionCard.styles'

interface Props {
  collection: TAssetCollection
  handleBack: () => void
}

const AssetCollectionOverview: React.FC<Props> = ({
  collection,
  handleBack,
}): JSX.Element => {
  const [tab, setTab] = useState('Context')

  const renderImage = (): JSX.Element => (
    <AssetCollectionOverviewImage background={collection.image}>
      <AssetCollectionSdgs>
        {collection.sdgs.map((detail, index) => (
          <img
            key={index}
            src={require(`assets/images/sdg/${detail}`)}
            width={20}
            height={20}
            alt=""
          />
        ))}
      </AssetCollectionSdgs>
    </AssetCollectionOverviewImage>
  )
  const renderContext = (): JSX.Element => (
    <AssetCollectionOverviewContext className="d-flex flex-column">
      <AssetCollectionOverviewText className="mb-2">
        {collection.description}
      </AssetCollectionOverviewText>

      <AssetCollectionOverviewText>
        Creator: {collection.creator}
      </AssetCollectionOverviewText>
      <AssetCollectionOverviewText>
        Minted: {collection.minted}
      </AssetCollectionOverviewText>
    </AssetCollectionOverviewContext>
  )
  const renderMetrics = (): JSX.Element => (
    <AssetCollectionOverviewMetrics className="d-flex flex-column">
      <ul>
        <li>
          <AssetCollectionOverviewText color="#49BFE0" fontWeight={600}>
            {thousandSeparator(collection.maxSupply, ',')}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText> Max Supply</AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText color="#5AB946" fontWeight={600}>
            {thousandSeparator(collection.owned, ',')}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText> Owned</AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText fontWeight={600}>
            ${displayTokenAmount(collection.highestPrice, 2)} / $
            {displayTokenAmount(collection.lowestPrice, 2)}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText>
            {' '}
            Highest-Lowest Price
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText color="#2F6CA1" fontWeight={600}>
            {thousandSeparator(collection.carbonCredits, ',')}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText>
            {' '}
            Carbon Credits
          </AssetCollectionOverviewText>
        </li>
      </ul>
    </AssetCollectionOverviewMetrics>
  )
  const renderAttributes = (): JSX.Element => (
    <AssetCollectionOverviewAttributes className="d-flex flex-column">
      <ul>
        <li>
          <AssetCollectionOverviewText>Location: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText fontWeight={600}>
            {collection.location}
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>Make: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText color={'#FFAE4F'} fontWeight={600}>
            {collection.make}
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>Model: </AssetCollectionOverviewText>
          <AssetCollectionOverviewText fontWeight={600}>
            {collection.model}
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>
            Efficiency:{' '}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText color={'#49BFE0'} fontWeight={600}>
            {collection.efficiency}%
          </AssetCollectionOverviewText>
        </li>
        <li>
          <AssetCollectionOverviewText>
            Monthly Revenue:{' '}
          </AssetCollectionOverviewText>
          <AssetCollectionOverviewText color={'#49BFE0'} fontWeight={600}>
            ${displayTokenAmount(collection.monthlyRevenue, 2)}
          </AssetCollectionOverviewText>
        </li>
      </ul>
    </AssetCollectionOverviewAttributes>
  )

  const renderCollectionDetail = (): JSX.Element => (
    <DetailBox>
      <DetailBoxText>
        <Typography
          fontWeight={700}
          fontSize="24px"
          lineHeight="28px"
          color="#000000"
        >
          {collection.title}
        </Typography>
        <Typography
          fontWeight={400}
          fontSize="13px"
          lineHeight="15px"
          color="#828E94"
        >
          {collection.subTitle}
        </Typography>
      </DetailBoxText>
      <DetailBoxLogo src={collection.logo} alt="" />
    </DetailBox>
  )

  const renderTabs = (): JSX.Element => (
    <AssetCollectionOverviewTabs className="mb-3">
      <Typography
        fontSize="16px"
        lineHeight="19px"
        fontWeight={600}
        className={cx({ isActive: tab === 'Context' })}
        onClick={(): void => setTab('Context')}
      >
        Context
      </Typography>
      <Typography
        fontSize="16px"
        lineHeight="19px"
        fontWeight={600}
        className={cx({ isActive: tab === 'Metrics' })}
        onClick={(): void => setTab('Metrics')}
      >
        Metrics
      </Typography>
      <Typography
        fontSize="16px"
        lineHeight="19px"
        fontWeight={600}
        className={cx({ isActive: tab === 'Attributes' })}
        onClick={(): void => setTab('Attributes')}
      >
        Attributes
      </Typography>
    </AssetCollectionOverviewTabs>
  )

  return (
    <AssetCollectionOverviewWrapper>
      <AssetCollectionOverviewRow className="row position-relative mb-4 d-flex justify-content-between">
        <AssetCollectionOverviewCol className="col-3">
          {renderCollectionDetail()}
        </AssetCollectionOverviewCol>
        <AssetCollectionOverviewCol className="col-3 d-flex justify-content-end">
          <Button variant="secondary" onClick={handleBack}>
            <IconArrowLeft />
            <Typography
              fontWeight={600}
              fontSize="16px"
              lineHeight="unset"
              color="#000"
            >
              Back
            </Typography>
          </Button>
        </AssetCollectionOverviewCol>
      </AssetCollectionOverviewRow>
      <AssetCollectionOverviewRow className="row position-relative mb-4">
        <AssetCollectionOverviewCol
          className="col-12 d-flex"
          style={{ gap: 20 }}
        >
          <Box className="d-flex">{renderImage()}</Box>
          <Box className="d-flex flex-column" style={{ maxWidth: 500 }}>
            {renderTabs()}
            {tab === 'Context' && renderContext()}
            {tab === 'Metrics' && renderMetrics()}
            {tab === 'Attributes' && renderAttributes()}
          </Box>
        </AssetCollectionOverviewCol>
      </AssetCollectionOverviewRow>
    </AssetCollectionOverviewWrapper>
  )
}

export default AssetCollectionOverview
