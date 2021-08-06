import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import BigNumber from 'bignumber.js'
import IndicateArrow from 'assets/icons/IndicateArrow'
import { getBalanceNumber } from 'common/utils/currency.utils'
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

import {
  SectionTitleContainer,
  ButtonWrapper,
  SectionTitle,
} from '../EntityEconomy.styles'

import Chart from './components/Chart/Chart'
import Table from './components/Table'

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
    Header: 'Price (EUR)',
    accessor: 'price',
  },
  {
    Header: 'Value (EUR)',
    accessor: 'value',
  },
]

const EconomyOverview: React.FunctionComponent = () => {
  const [totalTokens, setTotalTokens] = useState(-1)
  const [accountAddress, setAccountAddress] = useState('')
  const [transactions, setTransactions] = useState([])
  const [inflation, setInflation] = useState(0)
  const [tokensStaked, setTokensStaked] = useState(-1)

  const { projectDID } = useParams<{ projectDID: string }>()

  const getProjectAccounts = (): Promise<string> => {
    return Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${projectDID}`,
    ).then((response) => {
      setAccountAddress(response.data[projectDID])
      return response.data[projectDID]
    })
  }

  const getTokensStaked = (address: string): void => {
    if (address) {
      Axios.get(
        `${process.env.REACT_APP_GAIA_URL}/staking/delegators/${address}/delegations`,
      ).then((response) => {
        const entries = response.data.result
        if (entries.length) {
          const total = entries
            .map((entry) => new BigNumber(entry.balance.amount))
            .reduce((total: BigNumber, entry: BigNumber) => total.plus(entry))
          setTokensStaked(getBalanceNumber(total))
          return
        }

        setTokensStaked(0)
      })
    }
  }

  const getTotalTokenSupply = (): void => {
    Axios.get(process.env.REACT_APP_GAIA_URL + '/supply/total/uixo', {
      transformResponse: [
        (response: string): any => {
          return JSON.parse(response).result
        },
      ],
    }).then((response) => {
      setTotalTokens(getBalanceNumber(new BigNumber(response.data)))
    })
  }

  const getInflation = (): void => {
    Axios.get(process.env.REACT_APP_GAIA_URL + '/minting/inflation').then(
      (response) => {
        setInflation(response.data.result)
      },
    )
  }

  const getTransactions = (): void => {
    Axios.get(process.env.REACT_APP_GAIA_URL + '/txs?message.action=send').then(
      (response) => {
        setTransactions(response.data.txs)
      },
    )
  }

  useEffect(() => {
    const accountAddress = getProjectAccounts()
    setTimeout(getTotalTokenSupply, 2000)
    setTimeout(getInflation, 2000)
    accountAddress.then((value) => {
      getTransactions()
      getTokensStaked(value)
    })
    // eslint-disable-next-line
  }, [])

  const displayTotalTokens =
    totalTokens === -1 ? '-' : thousandSeparator(totalTokens.toFixed(2))

  const displayTokensStaked =
    tokensStaked === -1 ? '-' : thousandSeparator(tokensStaked.toFixed(2))

  const tableData = transactions.map((transaction) => {
    const txValue = transaction.tx.value.msg[0].value
    const date = new Date(transaction.timestamp)
    const buySell = txValue.from_address === accountAddress
    const quantity = getBalanceNumber(new BigNumber(txValue.amount[0].amount))
    const price = 1
    const value = quantity * price

    return {
      date,
      buySell,
      quantity,
      price,
      value,
    }
  })

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
            <Figure>€ 1.00</Figure>
            <IndicateArrow fill="#85AD5C" width={11} height={10} />
            <FigurePercent>0%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>$ 1.00</FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Token Supply</FigureLabel>
          <FigureContainer>
            <Figure>{displayTotalTokens}</Figure>
            <IndicateArrow fill="#85AD5C" width={11} height={10} />
            <FigurePercent>{Number(inflation).toFixed(2)}%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>
            {Number(inflation).toFixed(2)}% Annual Inflation
          </FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Tokens Staked</FigureLabel>
          <FigureContainer>
            <Figure>{displayTokensStaked}</Figure>
            <IndicateArrow fill="#85AD5C" width={11} height={10} />
            <FigurePercent>2.8%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>Bonded in Proof of Stake</FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Token Yield</FigureLabel>
          <FigureContainer>
            <Figure>3.2%</Figure>
            <IndicateArrow fill="#85AD5C" width={11} height={10} />
            <FigurePercent>2.8%</FigurePercent>
          </FigureContainer>
          <FigureSubtle>Moving Avge 12 months</FigureSubtle>
        </FigureCard>
        <FigureCard>
          <FigureLabel>Token Holders</FigureLabel>
          <FigureContainer>
            <Figure>1,230</Figure>
            <IndicateArrow fill="#85AD5C" width={11} height={10} />
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
