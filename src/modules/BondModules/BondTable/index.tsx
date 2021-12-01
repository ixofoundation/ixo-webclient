import React, { useMemo, Fragment } from 'react'
import {
  TableContainer,
  StyledHeader,
  StyledButton,
  ButtonsContainer,
} from './PriceTable/index.style'
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
import { getBalanceNumber } from 'common/utils/currency.utils'
import BigNumber from 'bignumber.js'
import StakeToVoteModal from 'common/components/ControlPanel/Actions/StakeToVoteModal'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'

interface Props {
  selectedHeader: string
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

export const BondTable: React.SFC<Props> = ({ selectedHeader }) => {
  const [tableData, setTableData] = useState([])
  const [alphaTableData, setAlphaTableData] = useState([])
  const transactions: any = useSelector(selectTransactionProps)

  const [stakeToVoteModalOpen, setStakeToVoteModalOpen] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [availableWallets] = useState(['keysafe', 'keplr'])
  const [walletType, setWalletType] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [modalTitle, setModalTitle] = useState('')

  const { symbol, reserveDenom } = useSelector(
    (state: RootState) => state.activeBond,
  )

  const handleWalletSelect = (
    walletType: string,
    accountAddress: string,
  ): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)

    setStakeToVoteModalOpen(true)
    setModalTitle('Stake to Vote')
  }

  useEffect(() => {
    setAlphaTableData(alphaMockTableData)
  }, [])

  useEffect(() => {
    if (transactions?.length) {
      setTableData(
        transactions.map((transaction) => {
          return {
            date: {
              status: transaction.status,
              date: new Date(transaction.timestamp),
            },
            buySell: transaction.buySell,
            quantity: transaction.quantity,
            price: getBalanceNumber(new BigNumber(transaction.price)).toFixed(
              2,
            ),
            denom: reserveDenom === 'uixo' ? 'ixo' : reserveDenom,
            value: {
              value: transaction.value,
              txhash: transaction.txhash,
            },
          }
        }),
      )
    } else {
      setTableData([])
    }
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
          <StyledHeader>
            {symbol.toUpperCase()} Transactions
            <ButtonsContainer>
              <StyledButton onClick={(): void => setWalletModalOpen(true)}>
                Buy
              </StyledButton>
              <StyledButton
                className="disabled pe-none"
                onClick={(): void => setWalletModalOpen(true)}
              >
                Sell
              </StyledButton>
            </ButtonsContainer>
          </StyledHeader>
          <TableContainer>
            <Table columns={columns} data={tableData.slice(0, 5)} />
          </TableContainer>
        </Fragment>
      )}
      {selectedHeader === 'stake' && <StakeTransactionTable />}
      {selectedHeader === 'raised' && <CapitalTransactionTable />}
      {selectedHeader === 'reverse' && <CapitalTransactionTable />}
      {selectedHeader === 'alpha' && (
        <Fragment>
          <StyledHeader>Stakeholder Positions</StyledHeader>
          <TableContainer>
            <Table columns={alphaColumns} data={alphaTableData} />
          </TableContainer>
        </Fragment>
      )}
      <ModalWrapper
        isModalOpen={stakeToVoteModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setStakeToVoteModalOpen(false)}
      >
        <StakeToVoteModal
          walletType={walletType}
          accountAddress={selectedAddress}
          handleMethodChange={setModalTitle}
        />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal
          handleSelect={handleWalletSelect}
          availableWallets={availableWallets}
        />
      </ModalWrapper>
    </Fragment>
  )
}

export default BondTable
