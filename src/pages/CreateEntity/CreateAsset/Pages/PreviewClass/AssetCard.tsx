import React from 'react'
import { Box, theme, Typography } from 'components/App/App.styles'
import { AssetCardBody, AssetCardBodyRow, AssetCardHeader, AssetCardWrapper, AssetLogo } from './AssetCard.styles'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { CardTag, CardTags } from 'components/Entities/EntitiesExplorer/Components/EntityCard/EntityCard.styles'
import { EAssetType } from 'types/protocol'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  noIdx: number
  image: string
  icon: string
  tokenName: string
  name: string
  type: EAssetType
  denom: string
  maxSupply: number
  price: number
}

const AssetCard: React.FC<Props> = ({
  noIdx,
  image,
  icon,
  tokenName,
  name,
  type,
  denom,
  maxSupply,
  price,
  ...rest
}): JSX.Element => {
  return (
    <AssetCardWrapper {...rest}>
      <AssetCardHeader background={image} />

      <AssetCardBody>
        <AssetCardBodyRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <CardTags style={{ gap: 5 }}>
            <CardTag tagColor={theme.ixoDarkRed}>{denom}</CardTag>
            <CardTag tagColor={theme.ixoNewOrange}>{type}</CardTag>
          </CardTags>
          <AssetLogo src={icon} alt='' />
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', height: 70 }}>
          <Typography color='#01283B' fontWeight={700} fontSize='23px' lineHeight='24px' style={{ marginBottom: 4 }}>
            {tokenName}
          </Typography>
          <Typography color='#828E94' fontWeight={400} fontSize='14px' lineHeight='16px'>
            {name}
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', gap: 4 }}>
          <ProgressBar
            total={100}
            approved={0}
            rejected={0}
            activeBarColor={'linear-gradient(270deg, #6FCF97 50%, #036784 100%)'}
            height={9}
          />
          <Box className='d-flex'>
            <Typography fontWeight={400} color={theme.ixoBlack}>
              Headline metric
            </Typography>
          </Box>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ alignItems: 'baseline' }}>
          <Typography color='#01283B' fontWeight={600} fontSize='23px' lineHeight='27px'>
            #{noIdx}&nbsp;
          </Typography>
          <Typography color='#828E94' fontWeight={500} fontSize='14px' lineHeight='16px'>
            of {parseFloat(String(maxSupply)).toLocaleString()}
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ justifyContent: 'space-between' }}>
          <Typography color='#828E94' fontWeight={400} fontSize='14px' lineHeight='16px'>
            {new Date().toLocaleDateString()}
          </Typography>
          <Typography color='#01283B' fontWeight={400} fontSize='14px' lineHeight='16px'>
            {parseFloat(String(price)).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Typography>
        </AssetCardBodyRow>
      </AssetCardBody>
    </AssetCardWrapper>
  )
}

export default AssetCard
