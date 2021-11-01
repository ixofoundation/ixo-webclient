import React, { useMemo, useEffect, Dispatch, useState } from 'react'
import styled from 'styled-components'
import { connect, useDispatch, useSelector } from 'react-redux'
import {
  SectionTitleContainer,
  SectionTitle,
  Chart,
  Table,
  Button,
  Tiles,
} from 'common/components/Dashboard'
import { RootState } from 'common/redux/types'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { UserInfo } from 'modules/Account/types'
import Axios from 'axios'
import { get } from 'lodash'
import { getBalanceNumber } from 'common/utils/currency.utils'
import BigNumber from 'bignumber.js'
import { thousandSeparator } from 'common/utils/formatters'
import { getTransactionsByBondDID } from 'modules/BondModules/bond/bond.actions'
import { selectTransactionProps } from 'modules/BondModules/bond/bond.selectors'

export const Container = styled.div`
  padding: 20px 40px;
  background: #f0f3f9;
  font-family: Roboto Condensed;
  font-weight: normal;
  padding-bottom: 100px;
`

export const ChartContainer = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f3f6fc 97.29%);
  box-shadow: 0px 4px 25px #e1e5ec;
  border-radius: 4px;
  padding: 35px;
`

const Icon = styled.div<{ bgColor: string }>`
  width: 2.5rem;
  height: 1.8rem;
  background: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
`

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'STAKING',
    accessor: 'buySell',
  },
  {
    Header: 'QUANTITY (IXO)',
    accessor: 'quantity',
  },
  {
    Header: 'IXO PER SHARE',
    accessor: 'price',
  },
  {
    Header: 'VALUE (EUR)',
    accessor: 'value',
  },
]

const tableData = [
  {
    date: new Date(2020, 1, 1),
    buySell: true,
    quantity: 50,
    price: 1000,
    value: 25000,
  },
  {
    date: new Date(2020, 1, 1),
    buySell: true,
    quantity: 50,
    price: 1000,
    value: 25000,
  },
]

interface Props {
  match: any
  bondDid: string
  userAddress: string
  userInfo: UserInfo
}

const VotingBond: React.FunctionComponent<Props> = ({
  match,
  bondDid,
  userAddress,
  userInfo,
}) => {
  const dispatch = useDispatch()
  const chartData: any = useSelector(selectTransactionProps) ?? []
  const [price, setPrice] = useState(0)
  const [share, setShare] = useState(0)
  const [myYield, setYield] = useState(0)
  const [votingPower, setVotingPower] = useState(0)
  const [reserve, setReserve] = useState(0)

  const totalBondSupply = 100000
  const outcomePayment = 20000

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/current_price`,
      {
        transformResponse: [
          (response: string): any => {
            const parsedResponse = JSON.parse(response)
            const result = get(parsedResponse, 'result', ['error'])[0]
            setPrice(getBalanceNumber(new BigNumber(parseFloat(result.amount))))
          },
        ],
      },
    )

    Axios.get(
      process.env.REACT_APP_GAIA_URL + '/bank/balances/' + userAddress,
    ).then((response) => {
      const token = response.data.result.find(
        (tokens) => tokens.denom === 'uixo',
      )

      if (token) {
        setShare(getBalanceNumber(new BigNumber(token.amount)))
        setYield(
          getBalanceNumber(
            new BigNumber(token.amount)
              .dividedBy(totalBondSupply)
              .multipliedBy(outcomePayment)
          ),
        )
      }
    })

    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/current_reserve`,
      {
        transformResponse: [
          (response: string): any => {
            const parsedResponse = JSON.parse(response)
            const result = get(parsedResponse, 'result', ['error'])[0]
            setReserve(
              getBalanceNumber(new BigNumber(parseFloat(result.amount))),
            )
          },
        ],
      },
    )

    dispatch(getTransactionsByBondDID(bondDid))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const sum = chartData
        .filter((transaction) => transaction.buySell)
        .map((transaction) => transaction.amount)
        .reduce((total, entry) => total + entry)
      setVotingPower(getBalanceNumber(new BigNumber(sum)))
    }
  }, [chartData])

  const tiles = useMemo(() => {
    return [
      {
        title: 'IXO to Vote',
        subtle: 'Per Reward Share',
        value: price.toFixed(2),
        to: '#',
        icon: <Icon bgColor="#39C3E6">IXO</Icon>,
      },
      {
        title: 'My Share',
        subtle: `${(share / totalBondSupply).toFixed(0)}% of Reward`,
        value: share.toFixed(2),
        icon: <Icon bgColor="#39C3E6">BOND</Icon>,
      },
      {
        title: 'My Yield',
        subtle: `${new BigNumber(myYield)
          .dividedBy(outcomePayment)
          .toFixed(2)} IXO Per Share`,
        value: thousandSeparator(myYield.toFixed(2)),
        icon: <Icon bgColor="#85AD5C">IXO</Icon>,
      },
      {
        title: 'My Votes',
        subtle: `${new BigNumber(votingPower)
          .dividedBy(totalBondSupply)
          .toNumber()
          .toFixed(0)}% of Target`,
        value: thousandSeparator(votingPower.toFixed(0)),

        icon: <Icon bgColor="#39C3E6">IXO</Icon>,
      },
      {
        title: 'All Votes',
        subtle: `${new BigNumber(reserve)
          .dividedBy(totalBondSupply)
          .toNumber()
          .toFixed(0)}% of Target Outcome`,
        value: thousandSeparator(reserve.toFixed(0)),
        icon: <Icon bgColor="#39C3E6">IXO</Icon>,
      },
    ]
  }, [price, share])

  return (
    <div>
      <Tiles tiles={tiles} />
      <ChartContainer>
        <Chart data={chartData} />
      </ChartContainer>
      <SectionTitleContainer>
        <SectionTitle>Voting Activity</SectionTitle>
        <Button>Stake to VOTE</Button>
      </SectionTitleContainer>
      <Table columns={columns} data={tableData} />
    </div>
  )
}

const mapStateToProps = (state: RootState): any => ({
  bondDid: entitySelectors.selectEntityBondDid(state),
  userAddress: accountSelectors.selectUserAddress(state),
  userInfo: accountSelectors.selectUserInfo(state),
})
const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VotingBond)
