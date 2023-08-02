import React, { useEffect, useState } from 'react'
import { Box, FlexBox } from 'components/App/App.styles'
import { AssetCardBody, AssetCardBodyRow, AssetCardHeader, AssetCardHeaderDotBG, AssetLogo } from './AssetCard.styles'
import { CardTag, CardTags } from '../EntityCard/EntityCard.styles'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { apiEntityToEntity } from 'utils/entities'
import { Typography } from 'components/Typography'
import { NavLink } from 'react-router-dom'
import { useAccount } from 'hooks/account'
import { useTheme } from 'styled-components'
import { TEntityModel } from 'types/entities'

interface Props {
  entity: any
  selected?: boolean
  isSelecting?: boolean
}

const AssetCard: React.FC<Props> = ({ entity: _entity, selected = false, isSelecting = false }): JSX.Element => {
  const theme: any = useTheme()
  const { cwClient } = useAccount()
  const [entity, setEntity] = useState<TEntityModel>()

  const id = entity?.id
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
      apiEntityToEntity({ entity: _entity, cwClient }, (key, value) => {
        setEntity((entity: any) => ({ ...entity, [key]: value }))
      })
    }
    return () => {
      setEntity(undefined)
    }
  }, [_entity, cwClient])

  return (
    <NavLink to={`/entity/${id}`} style={{ textDecoration: 'none' }}>
      <FlexBox direction='column' width='100%' overflow='hidden'>
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
            <Typography color='black' weight='bold' size='2xl' style={{ marginBottom: 4 }}>
              {tokenName}
            </Typography>
            <Typography color='color-2' weight='normal' size='md'>
              {name}
            </Typography>
          </AssetCardBodyRow>

          <AssetCardBodyRow style={{ flexDirection: 'column', gap: 4 }}>
            <ProgressBar total={100} approved={33} rejected={0} activeBarColor={theme.ixoLightGreen} height={9} />
            <Box className='d-flex'>
              <Typography size='sm' weight='bold' color='blue' transform='uppercase'>
                124.12&nbsp;Carbon&nbsp;
              </Typography>
              <Typography size='sm' weight='normal' color='black'>
                claimable&nbsp;/&nbsp;
              </Typography>
              <Typography size='sm' weight='bold' color='black'>
                2145&nbsp;
              </Typography>
              <Typography size='sm' weight='normal' color='black'>
                produced
              </Typography>
            </Box>
          </AssetCardBodyRow>

          <AssetCardBodyRow style={{ alignItems: 'baseline' }}>
            <Typography color='black' weight='semi-bold' size='2xl'>
              1
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
              $230.00
            </Typography>
          </AssetCardBodyRow>
        </AssetCardBody>
      </FlexBox>
    </NavLink>
  )
}

export default AssetCard
