import { TokenAssetInfo } from '@ixo/impactxclient-sdk/types/custom_queries/currency.types'
import { FlexBox, GridContainer, GridItem, SvgBox } from 'components/CoreEntry/App.styles'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Typography } from 'components/Typography'
import CurrencyFormat from 'react-currency-format'
import BigNumber from 'bignumber.js'
import { useNavigate, useParams } from 'react-router-dom'
import { Area, AreaChart, YAxis, ResponsiveContainer } from 'recharts'
import { Button } from 'screens/CreateEntity/Components'
import Avatar from './Avatar'
import { GroupStakingModal, GroupUnstakingModal, GroupClaimModal } from 'components/Modals'
import { useAccount } from 'hooks/account'
import { contracts } from '@ixo/impactxclient-sdk'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { plus } from 'utils/currency'
import { claimAvailable } from 'utils/tokenClaim'
import { useTheme } from 'styled-components'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const data = [
  {
    name: 'Page A',
    uv: 0,
  },
  {
    name: 'Page B',
    uv: 0,
  },
  {
    name: 'Page C',
    uv: 0,
  },
  {
    name: 'Page D',
    uv: 0,
  },
  {
    name: 'Page E',
    uv: 0,
  },
  {
    name: 'Page F',
    uv: 0,
  },
  {
    name: 'Page G',
    uv: 0,
  },
]

interface Props {
  show?: boolean
  className?: string
  coinDenom: string
  network: string
  coinImageUrl?: string
  lastPriceUsd?: number
  priceChangePercent?: TokenAssetInfo['priceChangePercent']
  userAddress: string
}

const AssetDetailCard: React.FC<Props> = ({
  show,
  coinDenom,
  network,
  coinImageUrl,
  lastPriceUsd,
  priceChangePercent,
  userAddress,
  ...rest
}) => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const { cwClient, address } = useAccount()
  const { updateDAOGroup } = useCurrentEntity()
  const { getQuery } = useQuery()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { daoGroups = {} } = useAppSelector(getEntityById(entityId))
  const selectedGroup = getQuery('selectedGroup')
  const selectedDAOGroup = daoGroups[selectedGroup]
  const { votingModuleAddress } = useCurrentEntityDAOGroup(selectedDAOGroup?.coreAddress || '', daoGroups)
  const [groupStakingModalOpen, setGroupStakingModalOpen] = useState(false)
  const [groupUnstakingModalOpen, setGroupUnstakingModalOpen] = useState(false)
  const [groupClaimModalOpen, setGroupClaimModalOpen] = useState(false)
  const [balance, setBalance] = useState('0')
  const [stakedBalance, setStakedBalance] = useState('0')
  const [unstakingBalance, setUnstakingBalance] = useState('0')
  const [claimableBalance, setClaimableBalance] = useState('0')
  const balanceUsd: string = useMemo(
    () => new BigNumber(balance).times(lastPriceUsd ?? 0).toString(),
    [balance, lastPriceUsd],
  )
  const priceChangePercentInOneDay: string = useMemo(
    () => (priceChangePercent && priceChangePercent['1D']) ?? '0',
    [priceChangePercent],
  )
  const balanceUsdChangeInOneDay: string = useMemo(
    () => new BigNumber(balanceUsd).dividedBy(100).times(new BigNumber(priceChangePercentInOneDay)).toString(),
    [balanceUsd, priceChangePercentInOneDay],
  )

  /**
   * @get
   *  Token Balance
   *  Token Info
   * @set
   *  Table data
   */
  const getInfo = useCallback(async (): Promise<void> => {
    const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
      cwClient,
      votingModuleAddress,
    )

    const stakingContract = await daoVotingCw20StakedClient.stakingContract()
    const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
    const { value: microStakedValue } = await cw20StakeClient.stakedValue({ address: userAddress || address })
    const { claims } = await cw20StakeClient.claims({ address: userAddress || address })
    const microUnstakingValue = claims
      .filter((claim) => !claimAvailable(claim, 0)) //  TODO: TBD blockHeight
      .reduce((acc, cur) => plus(acc, cur.amount), '0')
    const microClaimableValue = claims
      .filter((claim) => claimAvailable(claim, 0)) //  TODO: TBD blockHeight
      .reduce((acc, cur) => plus(acc, cur.amount), '0')

    const tokenContract = await daoVotingCw20StakedClient.tokenContract()
    const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
    const tokenInfo = await cw20BaseClient.tokenInfo()
    const { balance: microBalance } = await cw20BaseClient.balance({ address: userAddress || address })

    const stakedValue = convertMicroDenomToDenomWithDecimals(microStakedValue, tokenInfo.decimals).toString()
    const unstakingValue = convertMicroDenomToDenomWithDecimals(microUnstakingValue, tokenInfo.decimals).toString()
    const claimableValue = convertMicroDenomToDenomWithDecimals(microClaimableValue, tokenInfo.decimals).toString()
    const balance = convertMicroDenomToDenomWithDecimals(microBalance, tokenInfo.decimals).toString()

    setStakedBalance(stakedValue)
    setUnstakingBalance(unstakingValue)
    setClaimableBalance(claimableValue)
    setBalance(balance)
  }, [address, userAddress, cwClient, votingModuleAddress])

  useEffect(() => {
    getInfo()
    return () => {
      setStakedBalance('0')
      setUnstakingBalance('0')
      setClaimableBalance('0')
      setBalance('0')
    }
  }, [getInfo, show])

  // const handleAddTokenToKeplr = async () => {
  //   const keplr = await (await import('@keplr-wallet/stores')).getKeplrFromWindow()
  //   if (keplr && tokenAddress) {
  //     await keplr.suggestToken(CHAIN_ID!, tokenAddress)
  //   }
  // }

  const handleUpdate = () => {
    selectedDAOGroup?.coreAddress && updateDAOGroup(selectedDAOGroup?.coreAddress)
    getInfo()
  }

  return show ? (
    <FlexBox
      $direction='column'
      width={'100%'}
      height='100%'
      background={theme.ixoGradientDark2}
      $borderRadius={'4px'}
      p={5}
      border={'1px solid #083347'}
      $gap={6}
      {...rest}
    >
      {/* Card Header */}
      <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
        <FlexBox width='50%' $justifyContent='space-between' $alignItems='center'>
          {/* coinImageUrl */}
          <FlexBox $alignItems='center' $gap={2}>
            <Avatar size={38} url={coinImageUrl} />
            <FlexBox $direction='column'>
              <Typography size='lg' transform='uppercase'>
                {coinDenom}
              </Typography>
              <Typography size='md'>{network}</Typography>
            </FlexBox>
          </FlexBox>
          {/* coinBalance */}
          <FlexBox $direction='column' $alignItems='end'>
            {/* coinBalance */}
            <FlexBox $alignItems='center' $gap={4}>
              <Typography size='lg'>
                <CurrencyFormat
                  displayType={'text'}
                  value={new BigNumber(balance).toString()}
                  thousandSeparator
                  decimalScale={2}
                />
              </Typography>
              <Typography
                size='md'
                color={Number(priceChangePercentInOneDay) >= 0 ? 'green' : 'red'}
                style={{ width: 80 }}
              >
                {priceChangePercentInOneDay}%
              </Typography>
            </FlexBox>
            {/* coinBalance in USD */}
            <FlexBox $alignItems='center' $gap={4}>
              <Typography size='md' color='dark-blue'>
                <CurrencyFormat prefix='$' displayType={'text'} value={balanceUsd} thousandSeparator decimalScale={2} />
              </Typography>
              <Typography
                size='md'
                color={Number(priceChangePercentInOneDay) >= 0 ? 'green' : 'red'}
                style={{ width: 80 }}
              >
                <CurrencyFormat
                  prefix='$'
                  displayType={'text'}
                  value={balanceUsdChangeInOneDay}
                  thousandSeparator
                  decimalScale={2}
                />
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <SvgBox color='white' cursor='pointer' onClick={() => navigate(-1)}>
          <img src='/assets/images/icon-arrow-left.svg' />
        </SvgBox>
      </FlexBox>
      {/* Card Body */}
      <GridContainer
        $gridTemplateAreas={`"a b"`}
        $gridTemplateColumns={'1fr 1fr'}
        $gridTemplateRows={'repeat(1, minmax(330px, auto))'}
        $gridGap={12}
        width='100%'
      >
        {/* Area chart */}
        <GridItem $gridArea='a' $alignSelf='center' height={'175px'}>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data}>
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={theme.ixoNewBlue} stopOpacity={0.4} />
                  <stop offset='95%' stopColor={theme.ixoNewBlue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis
                stroke={theme.ixoWhite}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Area dataKey='uv' stroke={theme.ixoNewBlue} fillOpacity={1} fill='url(#colorUv)' strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </GridItem>
        {/* Staking stats */}
        <GridItem $gridArea='b' $alignSelf='center'>
          <FlexBox width='100%' $direction='column' $alignItems='end' $gap={12}>
            {/* Balances */}
            <FlexBox width='100%' $direction='column' $gap={2}>
              {/* available */}
              <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
                <Typography size='lg'>available</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom?.toUpperCase()}`}
                    displayType={'text'}
                    value={balance}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
              {/* staked */}
              <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
                <Typography size='lg'>staked</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom?.toUpperCase()}`}
                    displayType={'text'}
                    value={stakedBalance}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
              {/* unstaking */}
              <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
                <Typography size='lg'>unstaking</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom?.toUpperCase()}`}
                    displayType={'text'}
                    value={unstakingBalance}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
              {/* claimable */}
              <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
                <Typography size='lg'>claimable</Typography>
                <Typography size='lg'>
                  <CurrencyFormat
                    suffix={` ${coinDenom?.toUpperCase()}`}
                    displayType={'text'}
                    value={claimableBalance}
                    thousandSeparator
                    decimalScale={2}
                  />
                </Typography>
              </FlexBox>
            </FlexBox>
            {/* Manage action */}
            <FlexBox $gap={3} width='100%' $justifyContent='flex-end'>
              {/* <Button
                variant='secondary'
                size='flex'
                height={40}
                textSize='base'
                textTransform='capitalize'
                textWeight='medium'
                onClick={handleAddTokenToKeplr}
              >
                Add token to Keplr
              </Button> */}
              <Button
                variant='secondary'
                size='flex'
                height={40}
                textSize='base'
                textTransform='capitalize'
                textWeight='medium'
                onClick={() => setGroupClaimModalOpen(true)}
              >
                Claim Rewards
              </Button>
              <Button
                variant='secondary'
                size='flex'
                height={40}
                textSize='base'
                textTransform='capitalize'
                textWeight='medium'
                onClick={() => setGroupStakingModalOpen(true)}
              >
                Stake
              </Button>
              <Button
                variant='secondary'
                size='flex'
                height={40}
                textSize='base'
                textTransform='capitalize'
                textWeight='medium'
                onClick={() => setGroupUnstakingModalOpen(true)}
              >
                Unstake
              </Button>
            </FlexBox>
          </FlexBox>
        </GridItem>
      </GridContainer>

      {groupStakingModalOpen && selectedDAOGroup && (
        <GroupStakingModal
          open={groupStakingModalOpen}
          setOpen={setGroupStakingModalOpen}
          daoGroup={selectedDAOGroup}
          onSuccess={handleUpdate}
        />
      )}
      {groupUnstakingModalOpen && selectedDAOGroup && (
        <GroupUnstakingModal
          open={groupUnstakingModalOpen}
          setOpen={setGroupUnstakingModalOpen}
          daoGroup={selectedDAOGroup}
          onSuccess={handleUpdate}
        />
      )}
      {groupClaimModalOpen && selectedDAOGroup && (
        <GroupClaimModal
          open={groupClaimModalOpen}
          setOpen={setGroupClaimModalOpen}
          daoGroup={selectedDAOGroup}
          onSuccess={handleUpdate}
        />
      )}
    </FlexBox>
  ) : null
}

export default AssetDetailCard
