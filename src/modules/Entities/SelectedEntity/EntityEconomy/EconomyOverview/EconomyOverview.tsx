import React, { useEffect, useState, useMemo } from 'react'
import Axios from 'axios'
import BigNumber from 'bignumber.js'
import IndicateArrow from 'assets/icons/IndicateArrow'
import { getBalanceNumber, nFormatter } from 'common/utils/currency.utils'
import { thousandSeparator } from 'common/utils/formatters'
import { useParams } from 'react-router-dom'

import {
  Container,
  FigureCardsContainer,
  FigureCard,
  FigureLabel,
  FigureContainer,
  Figure,
  FigurePercent,
  FigureSubtle,
  ChartContainer,
} from './EconomyOverview.styles'

import { SectionTitleContainer, ButtonWrapper, SectionTitle } from '../EntityEconomy.styles'

import Chart from './components/Chart/Chart'
import Table from './components/Table'
import { useDispatch, useSelector } from 'react-redux'
import {
  getTotalStaked,
  getTotalSupply,
  getInflation,
} from 'modules/Entities/SelectedEntity/EntityExchange/EntityExchange.actions'
import { selectTokenBonded, selectTokenSupply, selectInflation } from '../../EntityExchange/EntityExchange.selectors'
import { minimalDenomToDenom } from 'modules/Account/Account.utils'

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Buy/Sell',
    accessor: 'buySell',
  },
  {
    Header: 'Quantity (IXO)',
    accessor: 'quantity',
  },
  {
    Header: 'Price (USD)',
    accessor: 'price',
  },
  {
    Header: 'Value (USD)',
    accessor: 'value',
  },
]

const EconomyOverview: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const [accountAddress, setAccountAddress] = useState('')
  const [transactions, setTransactions] = useState([])

  const usdRate = 1
  const tokenSupply = useSelector(selectTokenSupply)
  const tokenStaked = useSelector(selectTokenBonded)
  const inflation = useSelector(selectInflation)

  const { projectDID } = useParams<{ projectDID: string }>()

  const getProjectAccounts = (): Promise<string> => {
    return Axios.get(`${process.env.REACT_APP_GAIA_URL}/projectAccounts/${projectDID}`).then((response) => {
      setAccountAddress(response.data[projectDID])
      return response.data[projectDID]
    })
  }

  const getTransactions = (): void => {
    Axios.get(process.env.REACT_APP_GAIA_URL + '/txs?message.action=send').then((response) => {
      setTransactions(response.data.txs)
    })
  }

  useEffect(() => {
    dispatch(getTotalSupply() as any)
    dispatch(getTotalStaked() as any)
    dispatch(getInflation() as any)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const accountAddress = getProjectAccounts()
    accountAddress.then(() => {
      getTransactions()
    })
    // eslint-disable-next-line
  }, [])

  const tableData = useMemo(() => {
    return transactions.map((transaction: any) => {
      const txValue = transaction.tx.value.msg[0].value
      const date = new Date(transaction.timestamp)
      const buySell = txValue.from_address === accountAddress
      const quantity = getBalanceNumber(new BigNumber(txValue.amount[0].amount))
      const price = usdRate.toFixed(2)
      const value = new BigNumber(quantity).times(new BigNumber(usdRate)).toString()

      return {
        date,
        buySell,
        quantity,
        price,
        value,
      }
    })
    // eslint-disable-next-line
  }, [transactions, usdRate])

  const chartData = tableData.map((record) => {
    return {
      x: record.date,
      y: record.buySell ? record.quantity : -record.quantity,
    }
  })

  return (
    <Container>
      <FigureCardsContainer>
        <FigureCard>
          <FigureLabel>Token Price</FigureLabel>
          <FigureContainer>
            <Figure>$ {usdRate.toFixed(2)}</Figure>
            <IndicateArrow fill='#85AD5C' width={11} height={10} />
            <FigurePercent>0%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>$ 1.00</FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Token Supply</FigureLabel>
          <FigureContainer>
            <Figure>{thousandSeparator(minimalDenomToDenom('uixo', tokenSupply).toFixed(2))}</Figure>
            <IndicateArrow fill='#85AD5C' width={11} height={10} />
            <FigurePercent>{Number(inflation).toFixed(2)}%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>{Number(inflation).toFixed(2)}% Annual Inflation</FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Tokens Staked</FigureLabel>
          <FigureContainer>
            <Figure>{nFormatter(tokenStaked, 2)}</Figure>
            <IndicateArrow fill='#85AD5C' width={11} height={10} />
            <FigurePercent>2.8%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>Bonded in Proof of Stake</FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Token Yield</FigureLabel>
          <FigureContainer>
            <Figure>3.2%</Figure>
            <IndicateArrow fill='#85AD5C' width={11} height={10} />
            <FigurePercent>2.8%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>Moving Avge 12 months</FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Token Holders</FigureLabel>
          <FigureContainer>
            <Figure>1,230</Figure>
            <IndicateArrow fill='#85AD5C' width={11} height={10} />
            <FigurePercent>2.8%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>Unique Accounts</FigureSubtle>
        </FigureCard>
      </FigureCardsContainer>
      <ChartContainer>
        <Chart data={chartData} />
      </ChartContainer>
      <SectionTitleContainer>
        <SectionTitle>IXO Token Transactions</SectionTitle>
        <ButtonWrapper>
          <button>Buy</button>
          <button>Swap</button>
        </ButtonWrapper>
      </SectionTitleContainer>
      <Table columns={columns} data={tableData} />
    </Container>
  )
}

export default EconomyOverview
