import React, { ReactElement } from 'react'
import styled from 'styled-components'
interface Props {
  transactions?: any[]
}

interface StatusComponentProps {
  status: string
  accountsNumber: number
}

interface StatusWrapperProps {
  status: string
}

interface TransactionListProps {
  txList: TxItemProps[]
  status: string
}

interface TxItemProps {
  name: string
  did: string
  date: string
}

interface TxItemWrapperProps {
  status: string
}

const StatusWrapper = styled.div<StatusWrapperProps>`
  background: linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);
  border-radius: 4px;
  padding: 1rem 0;

  .number {
    font-style: normal;
    font-weight: normal;
    font-size: 45px;
    line-height: 53px;
    text-align: center;
    letter-spacing: 0.3px;

    /* grey / white */

    color: #ffffff;
  }

  .status {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: ${(props): string =>
      props.status === 'Pending'
        ? '#F89D28'
        : props.status === 'Approved'
        ? '#85AD5C'
        : '#E2223B'};
    position: relative;
    &:before {
      position: absolute;
      left: -20px;
      top: 2px;
      content: '';
      margin-right: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      background-color: ${(props): string =>
        props.status === 'Pending'
          ? '#F89D28'
          : props.status === 'Approved'
          ? '#85AD5C'
          : '#E2223B'};
    }
  }
`

const TxItem = styled.div<TxItemWrapperProps>`
  background: #023044;
  border-radius: 4px;
  padding: 1.5rem 2rem;
  position: relative;

  &:before {
    content: '';
    width: 8px;
    height: 30px;
    position: absolute;
    left: -4px;
    top: calc(50% - 15px);
    background-color: ${(props): string =>
      props.status === 'Pending'
        ? '#F89D28'
        : props.status === 'Approved'
        ? '#85AD5C'
        : '#E2223B'};
    border-radius: 4px;
  }

  .header {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }

  .did {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #83d9f2;
  }

  .date {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: right;
    color: #83d9f2;
    position: absolute;
    bottom: 0;
    right: 2rem;
    padding-bottom: 1rem;
  }
`

const TransactionListHeader = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  color: #ffffff;
  margin-bottom: 2rem;
`

const Divider = styled.div`
  border: 0.5px solid #143f54;
  margin: 2rem 0;
`

const StatusComponent = ({
  status,
  accountsNumber,
}: StatusComponentProps): any => (
  <StatusWrapper
    className="d-flex justify-content-around align-items-center flex-column"
    status={status}
  >
    <div className="number">{accountsNumber}</div>
    <div className="status">{status}</div>
  </StatusWrapper>
)

const TransactionList = ({ txList, status }: TransactionListProps): any => (
  <div className="d-flex flex-column">
    <TransactionListHeader>Payment Claims {status}</TransactionListHeader>
    {txList.map((tx: TxItemProps, index) => (
      <TxItem
        status={status}
        className="d-flex justify-content-around flex-column mb-3"
        key={index}
      >
        <div className="header">{tx.name}</div>
        <div className="did">{tx.did}</div>
        <span className="date">Saved {tx.date}</span>
      </TxItem>
    ))}
  </div>
)

export default function Payments({ transactions }: Props): ReactElement {
  const txList = [
    {
      name: 'Transaction Name',
      did: 'did:sov:RFWuuFmLvNd8uq9x5sUYku',
      date: '27 Mar ‘20',
    },
    {
      name: 'Transaction Name',
      did: 'did:sov:RFWuuFmLvNd8uq9x5sUYku',
      date: '27 Mar ‘20',
    },
    {
      name: 'Transaction Name',
      did: 'did:sov:RFWuuFmLvNd8uq9x5sUYku',
      date: '27 Mar ‘20',
    },
  ]
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="row mt-5">
            <div className="col-xs-12 col-sm-4">
              <StatusComponent status="Pending" accountsNumber={2} />
            </div>
            <div className="col-xs-12 col-sm-4">
              <StatusComponent status="Approved" accountsNumber={3} />
            </div>
            <div className="col-xs-12 col-sm-4">
              <StatusComponent status="Rejected" accountsNumber={3} />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <TransactionList txList={txList} status="Pending" />
    </div>
  )
}
