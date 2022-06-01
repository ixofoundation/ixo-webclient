import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { RootState } from 'common/redux/types'

import {
  TransactionTableHeader,
  TransactionTableWrapper,
  TransactionTableBody,
  TransactionTableTitle,
  ActionsGroup,
  StyledButton,
  StyledTableContainer,
  StyledPagination,
} from '../index.styles'
import Table from '../PriceTable'
import WithdrawReserveModal from 'common/components/ControlPanel/Actions/WithdrawReserveModal'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { BondStateType } from 'modules/BondModules/bond/types'

const ReserveTransactionTable: React.FC = () => {
  const { allowReserveWithdrawals, controllerDid, state, withdrawShareHistory } = useSelector(
    (state: RootState) => state.activeBond,
  )
  const { userInfo } = useSelector((state: RootState) => state.account)
  const [withdrawReserveModalOpen, setWithdrawReserveModalOpen] = useState(
    false,
  )
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Purpose',
        accessor: 'purpose',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    [],
  )

  const isActiveWithdraw = useMemo((): boolean => {
    if (!userInfo) {
      return false
    }
    if (!allowReserveWithdrawals) {
      return false
    }
    if (controllerDid !== userInfo.didDoc.did) {
      return false
    }
    if (state !== BondStateType.OPEN) {
      return false
    }

    return true
  }, [allowReserveWithdrawals, userInfo, controllerDid, state])

  // pagination
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage] = useState(5)
  const [selected, setSelected] = useState(0)

  const tableData = useMemo(() => {
    return withdrawShareHistory.map((history) => ({
      date: history.time,
      status: history.status,
      type: history.type,
      purpose: history.purpose,
      description: history.description,
      value: {
        value: history.amount,
        txHash: history.txHash, // TODO:
      },
      denom: history.denom
    }))
    // return [
    //   {
    //     date: Date.now(),
    //     status: 'succeed', //  succeed | failed
    //     type: 'Bank Deposit', // | `Bank Withdrawal`
    //     purpose: 'Disbursement', //  | `Refund`
    //     description: 'UBSOF: Payment for Services: Evaluation',
    //     value: {
    //       value: 100000,
    //       txHash: '0x111111111111',
    //     },
    //     denom: 'XUSD',
    //   },
    //   {
    //     date: Date.now(),
    //     status: 'failed', //  succeed | failed
    //     type: 'Bank Withdrawal',
    //     purpose: 'Refund',
    //     description: 'UBSOF: Payment for Services: Evaluation',
    //     value: {
    //       value: 25000,
    //       txHash: '0x111111111111',
    //     },
    //     denom: 'XUSD',
    //   },
    // ]
  }, [withdrawShareHistory])

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

  return (
    <TransactionTableWrapper>
      <TransactionTableHeader>
        <TransactionTableTitle>Withdrawals</TransactionTableTitle>
        <ActionsGroup>
          <StyledButton
            className={cx({ disable: !isActiveWithdraw })}
            onClick={(): void => setWithdrawReserveModalOpen(true)}
          >
            Withdraw
          </StyledButton>
        </ActionsGroup>
      </TransactionTableHeader>
      <TransactionTableBody>
        <StyledTableContainer dark={true}>
          <Table columns={tableColumns} data={currentItems} />
        </StyledTableContainer>
        <StyledPagination dark={true} className="d-flex justify-content-center">
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
      </TransactionTableBody>

      <ModalWrapper
        isModalOpen={withdrawReserveModalOpen}
        header={{
          title: 'Withdraw',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWithdrawReserveModalOpen(false)}
      >
        <WithdrawReserveModal />
      </ModalWrapper>
    </TransactionTableWrapper>
  )
}

export default ReserveTransactionTable
