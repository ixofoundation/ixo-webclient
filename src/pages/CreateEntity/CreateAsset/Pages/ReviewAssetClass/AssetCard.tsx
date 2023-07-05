import React from 'react'
import { Box } from 'components/App/App.styles'
import { AssetCardBody, AssetCardBodyRow, AssetCardHeader, AssetCardWrapper, AssetLogo } from './AssetCard.styles'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { CardTag, CardTags } from 'components/Entities/EntitiesExplorer/Components/EntityCard/EntityCard.styles'
import { EAssetType } from 'types/protocol'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  noIdx: number
  image: string
  logo: string
  tokenName: string
  name: string
  type: EAssetType | undefined
  denom: string
  maxSupply: number
  price: number
}

const AssetCard: React.FC<Props> = ({
  noIdx,
  image,
  logo,
  tokenName,
  name,
  type,
  denom,
  maxSupply,
  price,
  ...rest
}): JSX.Element => {
  const theme: any = useTheme()
  return (
    <AssetCardWrapper {...rest}>
      <AssetCardHeader background={image} />

      <AssetCardBody>
        <AssetCardBodyRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <CardTags style={{ gap: 5 }}>
            <CardTag tagColor={theme.ixoDarkRed}>{denom}</CardTag>
            <CardTag tagColor={theme.ixoDarkOrange}>{type}</CardTag>
          </CardTags>
          <AssetLogo src={logo} alt='' />
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', height: 70 }}>
          <Typography weight='bold' size='2xl' style={{ marginBottom: 4 }}>
            {tokenName}
          </Typography>
          <Typography color='grey700' size='md'>
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
            <Typography>Headline metric</Typography>
          </Box>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ alignItems: 'baseline' }}>
          <Typography weight='semi-bold' size='2xl'>
            #{noIdx}&nbsp;
          </Typography>
          {maxSupply && (
            <Typography color='grey700' size='md' weight='medium'>
              of {parseFloat(String(maxSupply)).toLocaleString()}
            </Typography>
          )}
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ justifyContent: 'space-between' }}>
          <Typography color='grey700' size='md'>
            {new Date().toLocaleDateString()}
          </Typography>
          <Typography size='md'>
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
