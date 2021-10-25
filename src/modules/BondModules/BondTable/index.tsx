import React, { useMemo, Fragment } from 'react'
import {
  TableContainer,
  StyledHeader,
  StyledButton,
  ButtonsContainer
} from './PriceTable/index.style'
import * as base58 from 'bs58'
import Axios from 'axios'
import Table from './PriceTable'
import StakeTransactionTable from './StakeTransactionTable'
import CapitalTransactionTable from './CapitalTransactionTable'
import { useSelector } from 'react-redux'
import { selectTransactionProps } from '../bond/bond.selectors'
import { useState } from 'react'
import { useEffect } from 'react'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import BuyModal from 'common/components/ControlPanel/Actions/BuyModal'
import SellModal from 'common/components/ControlPanel/Actions/SellModal'
import * as Toast from 'common/utils/Toast'
import { RootState } from 'common/redux/types'
import { getUIXOAmount } from 'common/utils/currency.utils'
import keysafe from 'common/keysafe/keysafe'
import { sortObject } from 'common/utils/transformationUtils'

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
    }
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
    }
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
    }
  },
]

export const BondTable: React.SFC<Props> = ({ selectedHeader }) => {
  const [tableData, setTableData] = useState([]);
  const [alphaTableData, setAlphaTableData] = useState([]);
  const transactions: any = useSelector(selectTransactionProps)
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);

  const {
    userInfo: {
      didDoc: {
        did: userDid,
        pubKey
      }
    },
    accountNumber: userAccountNumber,
    sequence: userSequence,
  } = useSelector((state: RootState) => state.account)
  const { bondDid, symbol } = useSelector((state: RootState) => state.activeBond);

  useEffect(() => {
    setAlphaTableData(alphaMockTableData)
  }, [])

  useEffect(() => {
    if (transactions?.length) {
      setTableData(transactions.map(transaction => {
        return {
          date: {
            status: transaction.status,
            date: new Date(transaction.timestamp),
          },
          buySell: transaction.buySell,
          quantity: transaction.quantity,
          price: 12,
          denom: symbol,
          value: {
            value: transaction.price,
            txhash: transaction.txhash,
          }
        }
      }))
    } else {
      setTableData([]);
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
  const handleBuy = (amount: number): void => {
    const payload = {
      msgs: [
        {
          type: 'bonds/MsgBuy',
          value: {
            buyer_did: userDid,
            amount: {
              amount: getUIXOAmount(String(amount)),
              denom: 'uixo',
            },
            max_prices: [{ amount: String('1000000'), denom: 'uixo' }],
            bond_did: bondDid,
          },
        },
      ],
      chain_id: process.env.REACT_APP_CHAIN_ID,
      fee: {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      },
      memo: '',
      account_number: String(userAccountNumber),
      sequence: String(userSequence),
    }
    const pubKey_ = base58.decode(pubKey).toString('base64')

    keysafe.requestSigning(
      JSON.stringify(sortObject(payload)),
      (error: any, signature: any) => {
        Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
          tx: {
            msg: payload.msgs,
            fee: payload.fee,
            signatures: [
              {
                account_number: payload.account_number,
                sequence: payload.sequence,
                signature: signature.signatureValue,
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: pubKey_,
                },
              },
            ],
            memo: '',
          },
          mode: 'sync',
        }).then((response) => {
          if (response.data.txhash) {
            Toast.successToast(`Transaction Successful`)
            if (response.data.code === 4) {
              Toast.errorToast(`Transaction Failed`)
              return
            }
            setBuyModalOpen(false)
            return
          }

          Toast.errorToast(`Transaction Failed`)
        })
      },
      'base64',
    )
  }

  const handleSell = (amount: number): void => {
    const payload = {
      msgs: [
        {
          type: 'bonds/MsgSell',
          value: {
            seller_did: userDid,
            amount: {
              amount: getUIXOAmount(String(amount)),
              denom: 'uixo',
            },
            bond_did: bondDid,
          },
        },
      ],
      chain_id: process.env.REACT_APP_CHAIN_ID,
      fee: {
        amount: [{ amount: String(5000), denom: 'uixo' }],
        gas: String(200000),
      },
      memo: '',
      account_number: String(userAccountNumber),
      sequence: String(userSequence),
    }
    const pubKey_ = base58.decode(pubKey).toString('base64')

    keysafe.requestSigning(
      JSON.stringify(sortObject(payload)),
      (error: any, signature: any) => {
        Axios.post(`${process.env.REACT_APP_GAIA_URL}/txs`, {
          tx: {
            msg: payload.msgs,
            fee: payload.fee,
            signatures: [
              {
                account_number: payload.account_number,
                sequence: payload.sequence,
                signature: signature.signatureValue,
                pub_key: {
                  type: 'tendermint/PubKeyEd25519',
                  value: pubKey_,
                },
              },
            ],
            memo: '',
          },
          mode: 'sync',
        }).then((response) => {
          if (response.data.txhash) {
            Toast.successToast(`Transaction Successful`)
            if (response.data.code === 4) {
              Toast.errorToast(`Transaction Failed`)
              return
            }
            setBuyModalOpen(false)
            return
          }

          Toast.errorToast(`Transaction Failed`)
        })
      },
      'base64',
    )
  }
  return (
    <Fragment>
      {
        selectedHeader === 'price' && (
          <Fragment>
            <StyledHeader>
              {symbol.toUpperCase()} Transactions
              <ButtonsContainer>
                <StyledButton onClick={(): void => setBuyModalOpen(true)}>Buy</StyledButton>
                <StyledButton onClick={(): void => setSellModalOpen(true)}>Sell</StyledButton>
              </ButtonsContainer>
            </StyledHeader>
            <TableContainer>
              <Table columns={columns} data={tableData} />
            </TableContainer>
            
            <ModalWrapper
              isModalOpen={buyModalOpen}
              handleToggleModal={(): void => setBuyModalOpen(false)}
            >
              <BuyModal handleBuy={handleBuy} />
            </ModalWrapper>
            <ModalWrapper
              isModalOpen={sellModalOpen}
              handleToggleModal={(): void => setSellModalOpen(false)}
            >
              <SellModal handleSell={handleSell} />
            </ModalWrapper>
          </Fragment>
        )
      }
      {
        selectedHeader === 'stake' && (
          <StakeTransactionTable />
        )
      }
      {
        selectedHeader === 'raised' && (
          <CapitalTransactionTable />
        )
      }
      {
        selectedHeader === 'reverse' && (
          <CapitalTransactionTable />
        )
      }
      {
        selectedHeader === 'alpha' && (
          <Fragment>
            <StyledHeader>
              Stakeholder Positions
            </StyledHeader>
            <TableContainer>
              <Table columns={alphaColumns} data={alphaTableData} />
            </TableContainer>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default BondTable
