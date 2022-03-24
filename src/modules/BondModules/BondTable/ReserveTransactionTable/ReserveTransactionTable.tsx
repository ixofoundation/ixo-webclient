import React, { useMemo, useState } from 'react'
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
import WithdrawReserveModal from 'common/components/ControlPanel/Actions/WithdrawReserveModal'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { BondStateType } from 'modules/BondModules/bond/types'

interface Props {
  any?: any
}

const ReserveTransactionTable: React.FC<Props> = () => {
  const { allowReserveWithdrawals, controllerDid, state } = useSelector(
    (state: RootState) => state.activeBond,
  )
  const { userInfo } = useSelector((state: RootState) => state.account)
  const [withdrawReserveModalOpen, setWithdrawReserveModalOpen] = useState(
    false,
  )

  const isActiveWithdraw = useMemo((): boolean => {
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

  return (
    <TransactionTableWrapper>
      <TransactionTableHeader>
        <TransactionTableTitle>Use of Funds</TransactionTableTitle>
        <ActionsGroup>
          <StyledButton
            className={cx({ disable: !isActiveWithdraw })}
            onClick={(): void => setWithdrawReserveModalOpen(true)}
          >
            Withdraw
          </StyledButton>
        </ActionsGroup>
      </TransactionTableHeader>
      <TransactionTableBody></TransactionTableBody>

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
