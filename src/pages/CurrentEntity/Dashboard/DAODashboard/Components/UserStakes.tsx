import BigNumber from 'bignumber.js'
import { FlexBox, theme } from 'components/App/App.styles'
import { Table } from 'components/Table'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import styled from 'styled-components'
import { contracts } from '@ixo/impactxclient-sdk'
import { useHistory } from 'react-router-dom'
import { useCurrentDaoGroup } from 'hooks/currentDao'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { useAccount } from 'hooks/account'
import { Avatar } from 'pages/CurrentEntity/Components'
import { GroupStakingModal } from 'components/Modals'
import PieChart from 'components/Widgets/PieChart/PieChart'

const TableWrapper = styled.div`
  color: white;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 8px;
    border-collapse: separate;

    th,
    td {
      height: inherit;
    }

    tbody > tr {
      border-radius: 8px;
      outline-style: solid;
      outline-width: 1px;
      outline-color: transparent;
      transition: all 0.2s;

      & > td:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      & > td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      &:hover {
        outline-color: ${(props) => props.theme.ixoNewBlue};
      }
    }
  }
`

const renderTableHeader = (name: string, justifyContent = 'flex-start') => (
  <FlexBox
    p={4}
    justifyContent={
      justifyContent as
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
        | 'stretch'
    }
  >
    <Typography color='light-grey-blue' transform='uppercase' weight='bold' size='md'>
      {name}
    </Typography>
  </FlexBox>
)

const columns = [
  {
    Header: renderTableHeader('Token'),
    accessor: 'name',
    renderCell: (cell: any) => {
      const coinDenom = cell.row.original?.coinDenom
      const network = cell.row.original?.network
      const coinImageUrl = cell.row.original?.coinImageUrl

      return (
        <FlexBox alignItems='center' gap={2} p={4}>
          <Avatar size={38} url={coinImageUrl} />
          <FlexBox direction='column'>
            <Typography size='lg' transform='uppercase'>
              {coinDenom}
            </Typography>
            <Typography size='md'>{network}</Typography>
          </FlexBox>
        </FlexBox>
      )
    },
  },
  {
    Header: renderTableHeader('Amount', 'flex-end'),
    accessor: 'balance',
    renderCell: (cell: any) => {
      const balance = cell.value
      const lastPriceUsd = cell.row.original?.lastPriceUsd ?? 0
      const balanceUsd = new BigNumber(balance).times(lastPriceUsd).toString()
      return (
        <FlexBox direction='column' alignItems='end' p={4}>
          <Typography size='lg'>
            <CurrencyFormat
              displayType={'text'}
              value={new BigNumber(balance).toString()}
              thousandSeparator
              decimalScale={2}
            />
          </Typography>
          <Typography size='md' color='dark-blue'>
            <CurrencyFormat prefix='$' displayType={'text'} value={balanceUsd} thousandSeparator decimalScale={2} />
          </Typography>
        </FlexBox>
      )
    },
  },
]

interface Props {
  show?: boolean
  coreAddress: string
  userAddress?: string
}

const UserStakes: React.FC<Props> = ({ show, coreAddress, userAddress }) => {
  const history = useHistory()
  const { cwClient, address } = useAccount()
  const { daoGroup, votingModuleAddress } = useCurrentDaoGroup(coreAddress)
  const [data, setData] = useState<any[]>([])
  const [groupStakingModalOpen, setGroupStakingModalOpen] = useState(false)

  const isParticipating = useMemo(() => {
    return daoGroup?.votingModule.members.some(({ addr }) => addr === (userAddress || address))
  }, [daoGroup?.votingModule.members, address, userAddress])

  const userVotingPower = useMemo(() => {
    const totalWeight = daoGroup.votingModule.totalWeight
    const userWeight =
      daoGroup.votingModule.members.find((member) => member.addr === (userAddress || address))?.weight ?? 0

    const userVotingPower = userWeight / totalWeight
    return userVotingPower
  }, [userAddress, address, daoGroup])

  /**
   * @get
   *  Token Balance
   *  Token Info
   * @set
   *  Table data
   */
  const update = useCallback(async (): Promise<void> => {
    const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
      cwClient,
      votingModuleAddress,
    )

    const stakingContract = await daoVotingCw20StakedClient.stakingContract()
    const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract)
    const { value: microStakedValue } = await cw20StakeClient.stakedValue({ address: userAddress || address })

    const tokenContract = await daoVotingCw20StakedClient.tokenContract()
    const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
    const tokenInfo = await cw20BaseClient.tokenInfo()
    const marketingInfo = await cw20BaseClient.marketingInfo()
    const stakedValue = convertMicroDenomToDenomWithDecimals(microStakedValue, tokenInfo.decimals).toString()

    setData([
      {
        coinDenom: tokenInfo.symbol,
        network: 'IXO',
        balance: stakedValue,
        coinImageUrl: marketingInfo?.logo !== 'embedded' && marketingInfo.logo?.url,
        lastPriceUsd: undefined,
        priceChangePercent: undefined,
      },
    ])
  }, [address, userAddress, cwClient, votingModuleAddress])

  useEffect(() => {
    update()
    return () => {
      setData([])
    }
  }, [update, show])

  const handleRowClick = (state: any) => () => {
    const { original } = state
    // original = { coinDenom, network, coinImageUrl, lastPriceUsd, balance, priceChangePercent }
    history.push({
      pathname: history.location.pathname,
      search: `?token=${original.coinDenom}`,
      state: original,
    })
  }

  return show ? (
    <>
      {isParticipating && data.length > 0 ? (
        <FlexBox width='100%' direction='column' gap={3}>
          <PieChart
            data={[
              { name: 'Rest Voting Power', value: 1 - userVotingPower, color: theme.ixoDarkBlue },
              { name: 'My Voting Power', value: userVotingPower, color: theme.ixoNewBlue },
            ]}
            descriptor={
              <FlexBox direction='column' alignItems='center'>
                <Typography variant='secondary' size='3xl' weight='bold'>
                  {new Intl.NumberFormat('en-us', {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(userVotingPower)}
                </Typography>
                <Typography size='sm'>voting power</Typography>
              </FlexBox>
            }
          />
          <TableWrapper>
            <Table
              columns={columns}
              data={data}
              getRowProps={(state) => ({
                style: { height: 70, cursor: 'pointer' },
                onClick: handleRowClick(state),
              })}
              getCellProps={() => ({ style: { background: '#023044' } })}
            />
          </TableWrapper>
        </FlexBox>
      ) : (
        <Typography variant='secondary' size='2xl' color='dark-blue'>
          No staking tokens.
        </Typography>
      )}
      {!userAddress && (
        <Button
          variant='secondary'
          onClick={() => setGroupStakingModalOpen(true)}
          size='flex'
          height={40}
          textSize='base'
          textTransform='capitalize'
          textWeight='medium'
        >
          Add Stake
        </Button>
      )}
      {groupStakingModalOpen && (
        <GroupStakingModal
          open={groupStakingModalOpen}
          setOpen={setGroupStakingModalOpen}
          daoGroup={daoGroup}
          onSuccess={update}
        />
      )}
    </>
  ) : null
}

export default UserStakes
