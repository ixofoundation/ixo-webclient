import React, { useEffect, useState } from 'react'
import { Box, FlexBox, theme } from 'components/App/App.styles'
import { AssetCardBody, AssetCardBodyRow, AssetCardHeader, AssetCardHeaderDotBG, AssetLogo } from './AssetCard.styles'
import { CardTag, CardTags } from '../EntityCard/EntityCard.styles'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { TEntityModel } from 'api/blocksync/types/entities'
import { apiEntityToEntity } from 'utils/entities'
import { Typography } from 'components/Typography'

interface Props {
  entity: any
  selected?: boolean
  isSelecting?: boolean
}

const AssetCard: React.FC<Props> = ({ entity: _entity, selected = false, isSelecting = false }): JSX.Element => {
  const [entity, setEntity] = useState<TEntityModel>()

  const image = entity?.profile?.image
  const logo = entity?.profile?.logo
  const type = entity?.token?.type
  const tokenName = entity?.token?.tokenName
  const name = entity?.token?.name
  const maxSupply = entity?.token?.properties.maxSupply
  const createdAt = entity?.metadata?.created as never as string

  useEffect(() => {
    if (_entity) {
      setEntity(_entity)
      apiEntityToEntity({ entity: _entity }, (key, value) => {
        setEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    }
  }, [_entity])

  return (
    <FlexBox direction='column' width='100%'>
      <AssetCardHeader background={image!}>
        <AssetCardHeaderDotBG />
      </AssetCardHeader>

      <AssetCardBody>
        <AssetCardBodyRow style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <CardTags style={{ gap: 5 }}>
            <CardTag tagColor={theme.ixoDarkRed}>{type}</CardTag>
          </CardTags>
          <AssetLogo src={logo} alt='' />
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', height: 70 }}>
          <Typography color='dark-blue' weight='bold' size='2xl' style={{ marginBottom: 4 }}>
            {tokenName}
          </Typography>
          <Typography color='color-2' weight='normal' size='md'>
            {name}
          </Typography>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ flexDirection: 'column', gap: 4 }}>
          <ProgressBar
            total={100}
            approved={33}
            rejected={0}
            activeBarColor={'linear-gradient(270deg, #6FCF97 50%, #036784 100%)'}
            height={9}
          />
          <Box className='d-flex'>
            <Typography weight='bold' color={'blue'}>
              124.12&nbsp;
            </Typography>
            <Typography weight='bold' color='black'>
              CARBON&nbsp;
            </Typography>
            <Typography weight='normal' color='black'>
              claimed ~&nbsp;
            </Typography>
            <Typography weight='bold' color='black'>
              1,23k&nbsp;
            </Typography>
            <Typography weight='normal' color='black'>
              produced
            </Typography>
          </Box>
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ alignItems: 'baseline' }}>
          <Typography color='dark-blue' weight='semi-bold' size='2xl'>
            #1
          </Typography>
          {maxSupply && (
            <Typography color='color-2' weight='medium' size='md'>
              of {Number(maxSupply).toLocaleString()}
            </Typography>
          )}
        </AssetCardBodyRow>

        <AssetCardBodyRow style={{ justifyContent: 'space-between' }}>
          <Typography color='color-2' weight='normal' size='md'>
            {new Date(createdAt).toLocaleDateString()}
          </Typography>
          <Typography color='dark-blue' weight='normal' size='md'>
            $ 230.00
          </Typography>
        </AssetCardBodyRow>
      </AssetCardBody>
    </FlexBox>
  )
}

export default AssetCard
