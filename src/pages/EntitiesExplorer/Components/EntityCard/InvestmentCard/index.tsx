import { FlexBox } from 'components/App/App.styles'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { Typography } from 'components/Typography'
import { useGetBondDid } from 'graphql/bonds'
import moment from 'moment'
import { Avatar } from 'pages/CurrentEntity/Components'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { TEntityModel } from 'types/entities'

const InvestmentCard: React.FC<TEntityModel & { to?: string }> = (entity) => {
  const theme: any = useTheme()

  const id = entity.id
  const image = entity.profile?.image || ''
  const logo = entity.profile?.logo || ''
  const title = entity.profile?.name || ''
  const createdAt = entity.metadata?.created as unknown as string
  const numOfInvestors = 0
  const bondDid = entity.linkedEntity.find((v) => v.type === 'bond')?.id

  const { data: bondDetail } = useGetBondDid(bondDid!)

  console.log({ bondDetail })

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
        <FlexBox background={`url(${image})`} backgroundSize='cover' width='100%' height='180px' />
        <FlexBox p={4.5} direction='column' gap={4} width='100%'>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between' gap={2}>
            <FlexBox alignItems='center' gap={2}>
              <FlexBox borderRadius='4px' overflow='hidden' boxShadow='0px 3px 15px 0px rgba(0, 0, 0, 0.15)'>
                <FlexBox background='white' py={1} px={2}>
                  <Typography size='xs' color='black'>
                    Investment
                  </Typography>
                </FlexBox>
                <FlexBox background='#7C2740' py={1} px={2}>
                  <Typography size='xs' weight='bold' color='white'>
                    Alphabond
                  </Typography>
                </FlexBox>
              </FlexBox>

              <FlexBox borderRadius='4px' overflow='hidden' boxShadow='0px 3px 15px 0px rgba(0, 0, 0, 0.15)'>
                <FlexBox background='white' py={1} px={2}>
                  <Typography size='xs' color='black'>
                    Investors
                  </Typography>
                </FlexBox>
                <FlexBox background='black' py={1} px={2} minWidth='32px' justifyContent='center'>
                  <Typography size='xs' weight='bold' color='white'>
                    {numOfInvestors}
                  </Typography>
                </FlexBox>
              </FlexBox>
            </FlexBox>

            <Avatar url={logo} size={32} borderWidth={0} />
          </FlexBox>

          <FlexBox height='60px'>
            <Typography size='2xl' weight='medium' overflowLines={2}>
              {title}
            </Typography>
          </FlexBox>

          <FlexBox width='100%' direction='column' gap={2}>
            <ProgressBar total={100} pending={0} approved={35} rejected={0} disputed={0} height={8} />
            <FlexBox gap={1}>
              <Typography color='blue' size='sm' weight='bold'>
                35%
              </Typography>
              <Typography color='black' size='sm'>
                Funded
              </Typography>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' direction='column' gap={2}>
            <Typography size='3xl' weight='medium'>
              {Intl.NumberFormat(undefined, { currency: 'USD' }).format(1230000)}
            </Typography>
            <Typography size='base'>Raised of $2 million target</Typography>
            <Typography size='sm'>Closes • {moment(createdAt).format('DD/MM/YYYY')}</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </NavLink>
  )
}

export default InvestmentCard
