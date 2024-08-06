import Image from 'next/image'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import BigNumber from 'bignumber.js'
import { Typography } from 'components/Typography'
import { useGetBondDid } from 'graphql/bonds'
import { useMapBondDetail } from 'hooks/bond'
import { Avatar } from 'screens/CurrentEntity/Components'
import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { Flex, useMantineTheme } from '@mantine/core'
import { TEntityModel } from 'types/entities'
import { IconInvestment } from 'components/IconPaths'

const formatCurrency = (value: number) =>
  Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value)

const InvestmentCard: React.FC<TEntityModel & { to?: string }> = (entity) => {
  const theme = useMantineTheme()
  const config = useAppSelector(selectEntityConfig)
  const design = config.UI?.explorer?.design

  const id = entity.id
  const image = entity.profile?.image || ''
  const logo = entity.profile?.logo || ''
  const title = entity.profile?.name || ''
  const bondDid = Array.isArray(entity.linkedEntity)
    ? entity.linkedEntity?.find((v) => v.type === 'bond')?.id
    : (Object.values(entity.linkedEntity) as LinkedEntity[])?.find((v) => v.type === 'bond')?.id
  const { data: bondDetail } = useGetBondDid(bondDid)
  const { state, currentReserve, currentReserveUsd, initialRaised, initialRaisedUsd } = useMapBondDetail(bondDetail)
  const fundedPercentage = useMemo(
    () => new BigNumber(currentReserve).dividedBy(initialRaised).toNumber(),
    [currentReserve, initialRaised],
  )

  return (
    <NavLink to={{ pathname: entity.to || `/entity/${id}/overview` }} style={{ textDecoration: 'none' }}>
      <Flex
        direction='column'
        style={{
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          color: theme.colors.blue[5],
          overflow: 'hidden',
          cursor: 'pointer',
          borderRadius: '12px',
          transition: '.2s box-shadow',
          '&:hover': {
            boxShadow: '0px 10px 25px 0px rgba(0, 0, 0, 0.15)',
          },
          border: design?.card?.border,
          ...(design?.card?.boxShadow && { boxShadow: design?.card?.boxShadow }),
          ...(design?.card?.border && { border: design?.card?.border }),
        }}
        bg='white'
        h='100%'
      >
        <Flex
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            width: '100%',
            height: '200px',
            position: 'relative',
          }}
        >
          <Flex pos='absolute' top='16px' left='16px' align='center' gap={1}>
            <Image src={IconInvestment} alt='Investment' width={5} height={5} color={theme.colors.blue[5]} />
            <Flex px={2} py={1} bg={'#20798C'} style={{ borderRadius: '100px' }}>
              <Typography color='white' size='sm'>
                Alphabond
              </Typography>
            </Flex>
          </Flex>
        </Flex>

        <Flex bg={'#ECECEC'} w='100%' h='8px'>
          <Flex bg={'#4C9F38'} w={`${fundedPercentage}%`} h='8px' />
        </Flex>

        <Flex p={4.5} direction='column' gap={4} w='100%'>
          <Flex w='100%'>
            <Typography size='sm' transform='uppercase'></Typography>
          </Flex>

          <Flex w='100%' align='center' justify='space-between'>
            <Typography size='xl' weight='semi-bold' $overflowLines={2}>
              {title}
            </Typography>
            <Avatar url={logo} size={32} borderWidth={0} />
          </Flex>

          <Flex w='100%' h='1px' bg='#EFEFEF' />

          {bondDid && (
            <Flex w='100%' direction='column' gap={2}>
              <Typography size='xl' weight='semi-bold'>
                {formatCurrency(currentReserveUsd)} raised
              </Typography>

              <Typography color='green' size='md'>
                {fundedPercentage}% funded
              </Typography>

              <Flex w='100%' justify='space-between' align='center'>
                <Flex color='#949494' bg='#EFEFEF' style={{ borderRadius: '12px' }} px={2} py={1}>
                  <Typography size='sm' weight='semi-bold'>
                    {formatCurrency(initialRaisedUsd)} target
                  </Typography>
                </Flex>

                <Flex color='#949494' bg='#EFEFEF' style={{ borderRadius: '12px' }} px={2} py={1}>
                  <Typography size='sm' weight='semi-bold'>
                    {state}
                  </Typography>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </NavLink>
  )
}

export default InvestmentCard
