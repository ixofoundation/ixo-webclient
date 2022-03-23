import React, { useState } from 'react'
import cx from 'classnames'
import { useSelector } from 'react-redux'

import { RootState } from 'common/redux/types'

import {
  TransactionTableHeader,
  TransactionTableWrapper,
  TransactionTableBody,
  TransactionTableTitle,
  ActionsGroup,
  StyledButton,
} from '../index.styles'

interface Props {
  any?: any
}

const ReserveTransactionTable: React.FC<Props> = () => {
  const { allowReserveWithdrawals } = useSelector(
    (state: RootState) => state.activeBond,
  )
  const [, setWithdrawReserveModalOpen] = useState(false)

  return (
    <TransactionTableWrapper>
      <TransactionTableHeader>
        <TransactionTableTitle>Use of Funds</TransactionTableTitle>
        <ActionsGroup>
          <StyledButton
            className={cx({ disable: !allowReserveWithdrawals })}
            onClick={(): void => setWithdrawReserveModalOpen(true)}
          >
            Withdraw
          </StyledButton>
        </ActionsGroup>
      </TransactionTableHeader>
      <TransactionTableBody></TransactionTableBody>
    </TransactionTableWrapper>
  )
}

export default ReserveTransactionTable
