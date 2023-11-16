import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { TEntityModel } from 'types/entities'

const ProtocolCard: React.FC<TEntityModel & { to?: string }> = (entity) => {
  const theme: any = useTheme()

  const id = entity.id
  const protocolType = entity.type.replace('protocol/', '')
  const type = entity.profile?.category || ''
  const title = entity.profile?.name || ''
  const description = entity.profile?.description || ''
  const createdAt = entity.metadata?.created as unknown as string

  return (
    <NavLink to={{ pathname: entity.to || `/entity/${id}/overview` }} style={{ textDecoration: 'none' }}>
      <FlexBox
        direction='column'
        borderRadius='8px'
        background='white'
        boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25);'
        color={theme.ixoBlack}
        overflow='hidden'
        cursor='pointer'
        transition='.2s box-shadow'
        hover={{ boxShadow: '0px 10px 25px 0px rgba(0, 0, 0, 0.15)' }}
      >
        <FlexBox background={theme.ixoGrey300} width='100%' height='180px' />
        <FlexBox p={4.5} direction='column' gap={2} width='100%'>
          <FlexBox gap={2}>
            <FlexBox justifyContent='space-between' borderRadius='8px' background={'#B651B2'} py={1} px={2}>
              <Typography size='md' weight='semi-bold' color='white' transform='capitalize'>
                {protocolType}
              </Typography>
            </FlexBox>
            {type && (
              <FlexBox justifyContent='space-between' borderRadius='8px' background={'#5197B6'} py={1} px={2}>
                <Typography size='md' weight='semi-bold' color='white'>
                  {type}
                </Typography>
              </FlexBox>
            )}
          </FlexBox>

          <FlexBox height='60px'>
            <Typography size='2xl' weight='medium' overflowLines={2}>
              {title}
            </Typography>
          </FlexBox>

          <FlexBox height='110px'>
            <Typography size='sm' overflowLines={6} style={{ lineHeight: '18px' }}>
              {description}
            </Typography>
          </FlexBox>

          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography color='color-2' size='md'>
              Creation Date:
            </Typography>
            <Typography color='black' size='md'>
              {moment(createdAt).format('DD MMM YYYY')}
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </NavLink>
  )
}

export default ProtocolCard
