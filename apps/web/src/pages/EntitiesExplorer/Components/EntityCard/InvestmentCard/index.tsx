import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Avatar } from 'pages/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { TEntityModel } from 'types/entities'
import { ReactComponent as InvestmentIcon } from 'assets/images/icon-investment.svg'
import { useGetBondDid } from 'graphql/bonds'
import { useMapBondDetail } from 'hooks/bond'
import BigNumber from 'bignumber.js'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

const InvestmentCard: React.FC<TEntityModel & { to?: string }> = (entity) => {
  const theme: any = useTheme()

  const id = entity.id
  const image = entity.profile?.image || ''
  const logo = entity.profile?.logo || ''
  const title = entity.profile?.name || ''
  const bondDid = Array.isArray(entity.linkedEntity) ? entity.linkedEntity?.find((v) => v.type === 'bond')?.id : (Object.values(entity.linkedEntity) as LinkedEntity[])?.find((v) => v.type === 'bond')?.id
  const { data: bondDetail } = useGetBondDid(bondDid)
  const { state, currentReserve, currentReserveUsd, initialRaised, initialRaisedUsd } = useMapBondDetail(bondDetail)
  const fundedPercentage = useMemo(
    () => new BigNumber(currentReserve).dividedBy(initialRaised).toNumber(),
    [currentReserve, initialRaised],
  )

  return (
    <NavLink to={{ pathname: entity.to || `/entity/${id}/overview` }} style={{ textDecoration: 'none' }}>
      <FlexBox
        $direction='column'
        $borderRadius='12px'
        background='white'
        $boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25);'
        color={theme.ixoBlack}
        overflow='hidden'
        cursor='pointer'
        transition='.2s box-shadow'
        hover={{ $boxShadow: '0px 10px 25px 0px rgba(0, 0, 0, 0.15)' }}
      >
        <FlexBox background={`url(${image})`} $backgroundSize='cover' width='100%' height='200px' position='relative'>
          <FlexBox position='absolute' top='16px' left='16px' $alignItems='center' $gap={1}>
            <SvgBox $borderRadius='100%' p={1} $svgWidth={4} $svgHeight={4} background={'#20798C'} color={'white'}>
              <InvestmentIcon />
            </SvgBox>
            <FlexBox $borderRadius='100px' px={2} py={1} background={'#20798C'}>
              <Typography color='white' size='sm'>
                Alphabond
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox background={'#ECECEC'} width='100%' height='8px'>
          <FlexBox background={'#4C9F38'} width={`${fundedPercentage}%`} height='8px' />
        </FlexBox>

        <FlexBox p={4.5} $direction='column' $gap={4} width='100%'>
          <FlexBox width='100%'>
            <Typography size='sm' transform='uppercase'>
            </Typography>
          </FlexBox>

          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <Typography size='xl' weight='semi-bold' $overflowLines={2}>
              {title}
            </Typography>
            <Avatar url={logo} size={32} borderWidth={0} />
          </FlexBox>

          <FlexBox width='100%' height='1px' background='#EFEFEF' />

          {bondDid && <FlexBox width='100%' $direction='column' $gap={2}>
            <Typography size='xl' weight='semi-bold'>
              {Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(currentReserveUsd)} raised
            </Typography>

            <Typography color='green' size='md'>
              {fundedPercentage}% funded
            </Typography>

            <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
              <FlexBox color='#949494' background='#EFEFEF' $borderRadius='12px' px={2} py={1}>
                <Typography size='sm' weight='semi-bold'>
                  {Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(initialRaisedUsd)} target
                </Typography>
              </FlexBox>

              <FlexBox color='#949494' background='#EFEFEF' $borderRadius='12px' px={2} py={1}>
                <Typography size='sm' weight='semi-bold'>
                  {state}
                </Typography>
              </FlexBox>
            </FlexBox>
          </FlexBox>}
        </FlexBox>
      </FlexBox>
    </NavLink>
  )
}

export default InvestmentCard
