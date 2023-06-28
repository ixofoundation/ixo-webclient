import React, { Fragment, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { useAppSelector } from 'redux/hooks'
import ReactPaginate from 'react-paginate'
import {
  TransactionTableBody,
  ActionsGroup,
  StyledButton,
  StyledTableContainer,
  StyledPagination,
} from '../BondTable.styles'
import Table from '../PriceTable/CapitalTransactionTable'
import WithdrawReserveModal from 'components/ControlPanel/Actions/WithdrawReserveModal'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { BondStateType } from 'redux/bond/bond.types'
import { TableStyledHeader } from '../BondTable'
import { selectAccountBalances } from 'redux/account/account.selectors'
import { tokenBalance } from 'redux/account/account.utils'

interface Props {
  isDark: boolean
}

const ReserveTransactionTable: React.FC<Props> = ({ isDark }) => {
  const { allowReserveWithdrawals, controllerDid, state, withdrawHistory, bondDid, symbol } = useAppSelector(
    (state) => state.activeBond,
  )
  const { userInfo } = useAppSelector((state) => state.account)
  const balances = useAppSelector(selectAccountBalances)
  const [withdrawReserveModalOpen, setWithdrawReserveModalOpen] = useState(false)

  const balance = useMemo(() => tokenBalance(balances, symbol), [balances, symbol])
  const prefix = useMemo(() => {
    try {
      const words = controllerDid.split(':')
      words.pop()
      return words.join(':')
    } catch (e) {
      return undefined
    }
  }, [controllerDid])

  const userDid = useMemo(() => {
    try {
      if (prefix) {
        const words = userInfo.didDoc.did.split(':')
        const hash = words.pop()
        return `${prefix}:${hash}`
      }
      return userInfo.didDoc.did
    } catch (e) {
      return undefined
    }
  }, [userInfo, prefix])

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

  const isActiveWithdrawReserve = useMemo((): boolean => {
    try {
      if (!userInfo) {
        return false
      }
      if (!allowReserveWithdrawals) {
        return false
      }
      if (!controllerDid.includes(userInfo.didDoc.did.slice(8))) {
        return false
      }
      if (state !== BondStateType.OPEN) {
        return false
      }

      return true
    } catch (e) {
      return false
    }
  }, [allowReserveWithdrawals, userInfo, controllerDid, state])

  const isActiveWithdrawShare = useMemo((): boolean => {
    try {
      if (!userInfo) {
        return false
      }
      if (!balance.amount) {
        return false
      }
      if (state !== BondStateType.SETTLED) {
        return false
      }

      return true
    } catch (e) {
      return false
    }
  }, [userInfo, state, balance])

  const isActiveMakeOutcomePayout = useMemo((): boolean => {
    try {
      if (!userInfo) {
        return false
      }
      if (!controllerDid.includes(userInfo.didDoc.did.slice(8))) {
        return false
      }
      if (state !== BondStateType.OPEN) {
        return false
      }

      return true
    } catch (e) {
      return false
    }
  }, [userInfo, controllerDid, state])

  const handleWithdrawShare = async (): Promise<string> => {
    const msgs = [
      {
        type: 'bonds/MsgWithdrawShare',
        value: {
          recipient_did: userDid,
          bond_did: bondDid,
        },
      },
    ]
    console.log({ msgs })
    return ''
  }

  const handleUpdateBondStatusToSettle = async (): Promise<string> => {
    const msgs = [
      {
        type: 'bonds/MsgUpdateBondState',
        value: {
          editor_did: userDid,
          bond_did: bondDid,
          state: BondStateType.SETTLED,
        },
      },
    ]
    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(3000000),
    }
    console.log({ msgs, fee })
    return ''
  }

  const handleMakeOutcomePayment = async (): Promise<string> => {
    const msgs = [
      {
        type: 'bonds/MsgMakeOutcomePayment',
        value: {
          sender_did: userDid,
          bond_did: bondDid,
          amount: '68100', // TODO:
        },
      },
    ]
    console.log({ msgs })
    return ''
  }

  // pagination
  const [currentItems, setCurrentItems] = useState<any[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage] = useState(5)
  const [selected, setSelected] = useState(0)

  const tableData = useMemo(() => {
    return withdrawHistory.map((history) => ({
      date: history.time,
      status: history.status,
      type: history.type,
      purpose: history.purpose,
      description: history.description,
      value: {
        value: history.amount,
        txHash: history.txHash, // TODO:
      },
      denom: history.denom,
    }))
  }, [withdrawHistory])

  const handlePageClick = (event: any): void => {
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
    <Fragment>
      <TableStyledHeader dark={isDark}>
        Withdrawals
        <ActionsGroup>
          <StyledButton
            className={cx({ disable: !isActiveWithdrawReserve })}
            onClick={(): void => setWithdrawReserveModalOpen(true)}
          >
            Withdraw
          </StyledButton>
          <StyledButton className={cx({ 'd-none': !isActiveWithdrawShare })} onClick={handleWithdrawShare}>
            Share
          </StyledButton>
          <StyledButton
            className={cx({ 'd-none': !isActiveMakeOutcomePayout })}
            onClick={async (): Promise<void> => {
              {
                const success = await handleMakeOutcomePayment()
                if (!success) {
                  return
                }
              }
              {
                const success = await handleUpdateBondStatusToSettle()
                if (!success) {
                  return
                }
              }
            }}
          >
            Make Outcome Payment
          </StyledButton>
        </ActionsGroup>
      </TableStyledHeader>
      <TransactionTableBody>
        <StyledTableContainer dark={isDark}>
          <Table columns={tableColumns} data={currentItems} />
        </StyledTableContainer>
        <StyledPagination dark={isDark} className='d-flex justify-content-center'>
          <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            forcePage={selected}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel='Previous'
            renderOnZeroPageCount={null!}
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
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
    </Fragment>
  )
}

export default ReserveTransactionTable
