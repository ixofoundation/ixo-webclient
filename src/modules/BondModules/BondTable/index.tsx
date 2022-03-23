import React, { useMemo, Fragment } from 'react'
import cx from 'classnames'
import {
  TableContainer,
  StyledHeader,
  StyledButton,
  ButtonsContainer,
} from './PriceTable/index.style'
import ReactPaginate from 'react-paginate'
import Table from './PriceTable'
import StakeTransactionTable from './StakeTransactionTable'
import CapitalTransactionTable from './CapitalTransactionTable'
import { useSelector } from 'react-redux'
import { selectTransactionProps } from '../bond/bond.selectors'
import { useState } from 'react'
import { useEffect } from 'react'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
// import BuyModal from 'common/components/ControlPanel/Actions/BuyModal'
// import SellModal from 'common/components/ControlPanel/Actions/SellModal'
import { RootState } from 'common/redux/types'
import BuyModal from 'common/components/ControlPanel/Actions/BuyModal'
import { Pagination } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container.styles'
import { formatCurrency } from 'modules/Account/Account.utils'
import { selectUserAddress } from 'modules/Account/Account.selectors'
import styled from 'styled-components'
import { ReserveTransactionTable } from './ReserveTransactionTable'

export const TableStyledHeader = styled(StyledHeader)<{ dark: boolean }>`
  color: ${(props): string => (props.dark ? 'white' : 'black')};
`

export const StyledTableContainer = styled(TableContainer)<{ dark: boolean }>`
  background: ${(props): string =>
    props.dark
      ? 'linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);'
      : 'linear-gradient(rgb(255, 255, 255) 0%, rgb(240, 243, 250) 100%);'};
  border: ${(props): string =>
    props.dark ? '1px solid #0c3549' : '1px solid #49bfe0'};

  & div[role='row'] {
    background: ${(props): string =>
      props.dark
        ? 'linear-gradient(356.78deg, #002d42 2.22%, #012639 96.94%);'
        : 'linear-gradient(rgb(255, 255, 255) 0%, rgb(240, 243, 250) 100%);'};
    border: ${(props): string =>
      props.dark ? '1px solid #0c3549' : '1px solid #49bfe0'};
  }

  & div[role='cell'] span {
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & div[role='cell'][type] {
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }

  & div[role='cell'] div div {
    color: white;
  }

  & div[role='row'] div[type='[object Object]']:last-child div {
    background: ${(props): string => (props.dark ? '' : 'rgb(233, 237, 245)')};
    color: ${(props): string => (props.dark ? 'white' : '#373d3f')};
  }
`

export const StyledPagination = styled(Pagination)<{ dark: boolean }>`
  & a.page-link {
    color: ${(props): string => (props.dark ? '#83d9f2' : '#107591')};
  }
`

interface Props {
  selectedHeader: string
  isDark: boolean
  isStake: boolean
  activeBond: any
}

const alphaMockTableData = [
  {
    date: {
      date: Date.now(),
    },
    option: 'Positive',
    quantity: 28,
    price: 0.5,
    denom: 'alpha',
    value: {
      value: 1500,
      txHash: '0x1111',
    },
  },
  {
    date: {
      date: Date.now(),
    },
    option: 'Neutral',
    quantity: 28,
    price: 0.5,
    denom: 'alpha',
    value: {
      value: 1500,
      txHash: '0x1111',
    },
  },
  {
    date: {
      date: Date.now(),
    },
    option: 'Negative',
    quantity: 28,
    price: 0.5,
    denom: 'alpha',
    value: {
      value: 1500,
      txHash: '0x1111',
    },
  },
]

export const BondTable: React.SFC<Props> = ({
  selectedHeader,
  isDark,
  isStake,
  activeBond,
}) => {
  const [tableData, setTableData] = useState([])
  const [alphaTableData, setAlphaTableData] = useState([])
  const transactions: any = useSelector(selectTransactionProps)
  const accountAddress = useSelector(selectUserAddress)

  const [buyModalOpen, setBuyModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('Buy')

  // pagination
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage] = useState(5)
  const [selected, setSelected] = useState(0)

  const { symbol, reserveDenom, allowSells } = useSelector(
    (state: RootState) => state.activeBond,
  )

  const handlePageClick = (event): void => {
    setSelected(event.selected)
    const newOffset = (event.selected * itemsPerPage) % tableData.length
    setItemOffset(newOffset)
  }

  useEffect(() => {
    // Fetch items from another resources.
    if (tableData.length > 0) {
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(tableData.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(tableData.length / itemsPerPage))
    }
  }, [itemOffset, itemsPerPage, tableData])

  useEffect(() => {
    setAlphaTableData(alphaMockTableData)
  }, [])

  useEffect(() => {
    if (transactions?.length) {
      setTableData(
        transactions
          .map((transaction) => {
            return {
              date: {
                status: transaction.status,
                date: new Date(transaction.timestamp),
              },
              buySell: transaction.buySell,
              quantity: transaction.quantity,
              price:
                symbol !== 'xusd'
                  ? formatCurrency({
                      amount: transaction.price,
                      denom: reserveDenom,
                    }).amount.toFixed(2)
                  : Number(transaction.price).toFixed(2),
              denom: formatCurrency({
                amount: transaction.price,
                denom: reserveDenom,
              }).denom,
              // price: getBalanceNumber(new BigNumber(transaction.price)).toFixed(
              //   2,
              // ),
              // denom: reserveDenom === 'uixo' ? 'ixo' : reserveDenom,
              value: {
                value:
                  symbol !== 'xusd'
                    ? formatCurrency({
                        amount: transaction.quantity * transaction.price,
                        denom: reserveDenom,
                      }).amount.toFixed(2)
                    : (transaction.quantity * transaction.price).toFixed(2),
                // value: (
                //   transaction.quantity *
                //   getBalanceNumber(new BigNumber(getPrevPrice(index)))
                // ).toFixed(2),
                txhash: transaction.txhash,
              },
            }
          })
          .reverse(),
      )
    } else {
      setTableData([])
    }
    // eslint-disable-next-line
  }, [transactions])

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Buy/Sell',
        accessor: 'buySell',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    [],
  )

  const [priceColumns, setPriceColumns] = useState([])
  useEffect(() => {
    setPriceColumns([
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'STAKING',
        accessor: 'buySell',
      },
      {
        Header: `QUANTITY (${activeBond?.symbol?.toUpperCase()})`,
        accessor: 'quantity',
      },
      {
        Header: `${activeBond?.symbol?.toUpperCase()} PER SHARE`,
        accessor: 'price',
      },
      {
        Header: `VALUE (${(activeBond?.reserveDenom === 'uixo'
          ? 'ixo'
          : activeBond?.reserveDenom
        )?.toUpperCase()})`,
        accessor: 'value',
      },
    ])
  }, [activeBond])

  const alphaColumns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Option',
        accessor: 'option',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Alpha',
        accessor: 'price',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    [],
  )

  // const onPlaceAnOrder = (): void => {
  //   dispatch(toggleAssistant({
  //     fixed: true,
  //     intent: `/bond_order{"userID":"","entityID":"",trigger":"proto_sign","agentRole":"","creator":"","conversation_id":""}`,
  //   }))
  // }

  return (
    <Fragment>
      {selectedHeader === 'price' && (
        <Fragment>
          {!isStake && (
            <TableStyledHeader dark={isDark}>
              {symbol.toUpperCase()} Transactions
              <ButtonsContainer>
                <StyledButton onClick={(): void => setBuyModalOpen(true)}>
                  Buy
                </StyledButton>
                <StyledButton
                  className={cx({ disable: !allowSells })}
                  onClick={(): void => setBuyModalOpen(true)}
                >
                  Sell
                </StyledButton>
              </ButtonsContainer>
            </TableStyledHeader>
          )}

          <StyledTableContainer dark={isDark}>
            <Table columns={columns} data={currentItems} />
          </StyledTableContainer>
          <StyledPagination
            dark={isDark}
            className="d-flex justify-content-center"
          >
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              forcePage={selected}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </StyledPagination>
        </Fragment>
      )}
      {selectedHeader === 'voting-price' && (
        <Fragment>
          {!isStake && (
            <TableStyledHeader dark={isDark}>
              {symbol.toUpperCase()} Transactions
              <ButtonsContainer>
                <StyledButton onClick={(): void => setBuyModalOpen(true)}>
                  Buy
                </StyledButton>
                <StyledButton
                  className={cx({ disable: !allowSells })}
                  onClick={(): void => setBuyModalOpen(true)}
                >
                  Sell
                </StyledButton>
              </ButtonsContainer>
            </TableStyledHeader>
          )}

          <StyledTableContainer dark={isDark}>
            <Table columns={priceColumns} data={currentItems} />
          </StyledTableContainer>
          <StyledPagination
            dark={isDark}
            className="d-flex justify-content-center"
          >
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              forcePage={selected}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </StyledPagination>
        </Fragment>
      )}
      {selectedHeader === 'stake' && <StakeTransactionTable isDark={isDark} />}
      {selectedHeader === 'raised' && <CapitalTransactionTable />}
      {selectedHeader === 'reserve' && <ReserveTransactionTable />}
      {selectedHeader === 'alpha' && (
        <Fragment>
          <StyledHeader>Stakeholder Positions</StyledHeader>
          <TableContainer>
            <Table columns={alphaColumns} data={alphaTableData} />
          </TableContainer>
        </Fragment>
      )}
      <ModalWrapper
        isModalOpen={buyModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setBuyModalOpen(false)}
      >
        <BuyModal
          walletType={'keysafe'}
          accountAddress={accountAddress}
          handleMethodChange={setModalTitle}
        />
      </ModalWrapper>
    </Fragment>
  )
}

export default BondTable
