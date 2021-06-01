import React, { useMemo } from 'react'
import styled from 'styled-components'
import { withRouter, Route } from 'react-router-dom'
import {
  SectionTitleContainer,
  SectionTitle,
  Chart,
  Table,
  Button,
  Tiles,
} from 'common/components/Dashboard'

export const Container = styled.div`
  padding: 20px 40px;
  background: #f0f3f9;
  font-family: Roboto Condensed;
  font-weight: normal;
  padding-bottom: 100px;
`

export const ChartContainer = styled.div`
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
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
}

const VotingBond: React.FunctionComponent<Props> = ({ match }) => {
  const tiles = useMemo(() => {
    return [
      {
        title: 'IXO to Vote',
        subtle: 'Per Reward Share',
        value: '1.03',
        to: match.url,
        icon: <Icon bgColor="#39C3E6">IXO</Icon>,
      },
      {
        title: 'My Share',
        subtle: '3% of Reward',
        value: '430',
        to: `${match.url}/share`,
        icon: <Icon bgColor="#39C3E6">BOND</Icon>,
      },
      {
        title: 'My Yield',
        subtle: '1.05 IXO Per Share',
        value: '20 (18%)',
        to: `${match.url}/yield`,
        icon: <Icon bgColor="#85AD5C">IXO</Icon>,
      },
      {
        title: 'My Votes',
        subtle: '5% of Target',
        value: '20000',
        to: `${match.url}/my`,
        icon: <Icon bgColor="#39C3E6">IXO</Icon>,
      },
      {
        title: 'All Votes',
        subtle: '58% of Target Outcome',
        value: '183000',
        to: `${match.url}/all`,
        icon: <Icon bgColor="#39C3E6">IXO</Icon>,
      },
    ]
  }, [])

  return (
    <div>
      <Tiles tiles={tiles} />
      <Route path={`${match.url}`} exact>
        <>
          <ChartContainer>
            <Chart data={[]} />
          </ChartContainer>
          <SectionTitleContainer>
            <SectionTitle>Voting Activity</SectionTitle>
            <Button>Stake to VOTE</Button>
          </SectionTitleContainer>
          <Table columns={columns} data={tableData} />
        </>
      </Route>
    </div>
  )
}

export default withRouter(VotingBond)
