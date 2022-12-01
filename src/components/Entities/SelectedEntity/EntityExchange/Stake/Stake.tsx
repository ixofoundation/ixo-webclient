import React, { useEffect, useState } from 'react'
import { thousandSeparator } from 'utils/formatters'
import * as keplr from 'lib/keplr/keplr'
import * as Toast from 'utils/toast'
import { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/types'
import Button from 'components/Dashboard/Button'
import Table from 'components/Dashboard/Table'
import { StatsLabel } from './Stake.styles'
import {
  changeStakeCellEntity,
  getInflation,
  getTotalStaked,
  getTotalSupply,
  getValidators,
  setSelectedValidator,
} from 'redux/selectedEntityExchange/entityExchange.actions'
import { broadCastMessage } from 'lib/keysafe/keysafe'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import WalletSelectModal from 'components/ControlPanel/Actions/WalletSelectModal'
import StakingModal from 'components/ControlPanel/Actions/StakingModal'
import { selectAPR } from 'redux/selectedEntityExchange/entityExchange.selectors'
import BigNumber from 'bignumber.js'
// interface ValidatorDataType {
//   userDid: string
//   validatorAddress: string
//   validatorLogo: string
//   validatorName: {
//     text: string
//     link: string
//   }
//   validatorMission: string
//   validatorVotingPower: string
//   validatorCommission: string
//   delegation: string
// }

const columns = [
  {
    Header: 'VALIDATOR',
    accessor: 'logo',
  },
  {
    Header: 'NAME',
    accessor: 'name',
    align: 'left',
  },
  {
    Header: 'MISSION',
    accessor: 'mission',
    align: 'left',
  },
  {
    Header: 'VOTING POWER',
    accessor: 'votingPower',
  },
  {
    Header: 'COMMISSION',
    accessor: 'commission',
  },
  {
    Header: 'MY DELEGATION (+REWARDS)',
    accessor: 'delegation',
  },
]

const Stake: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)
  const { validators, Inflation, selectedValidator } = useSelector((state: RootState) => state.selectedEntityExchange)
  const APR = useSelector(selectAPR)

  const [totalRewards, setTotalRewards] = useState<number>(0)
  const [stakeModalOpen, setStakeModalOpen] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(true)
  const [walletType, setWalletType] = useState<string | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  const [modalTitle, setModalTitle] = useState('My Stake')

  const handleClaimRewards = async (): Promise<void> => {
    const msgs: any[] = []
    const fee = {
      amount: [{ amount: String(10000), denom: 'uixo' }],
      gas: String(400000),
    }
    const memo = ''

    if (walletType === 'keysafe') {
      validators
        .filter((validator) => validator.reward)
        .forEach((validator) => {
          msgs.push({
            type: 'cosmos-sdk/MsgWithdrawDelegationReward',
            value: {
              delegator_address: selectedAddress,
              validator_address: validator.address,
            },
          })
        })

      broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, msgs, memo, fee, () => {
        dispatch(getValidators(selectedAddress!) as any)
      })
    } else if (walletType === 'keplr') {
      const [accounts, offlineSigner] = await keplr.connectAccount()
      const address = accounts[0].address
      const client = await keplr.initStargateClient(offlineSigner)

      validators
        .filter((validator) => validator.reward)
        .forEach((validator) => {
          msgs.push({
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            value: MsgWithdrawDelegatorReward.fromPartial({
              delegatorAddress: selectedAddress!,
              validatorAddress: validator.address,
            }),
          })
        })

      const payload = {
        msgs,
        chain_id: process.env.REACT_APP_CHAIN_ID,
        fee,
        memo,
      }

      try {
        const result = await keplr.sendTransaction(client, address, payload)
        if (result) {
          Toast.successToast(`Transaction Successful`)
        } else {
          // eslint-disable-next-line
          throw 'transaction failed'
        }
      } catch (e) {
        Toast.errorToast(`Transaction Failed`)
      }
      dispatch(getValidators(selectedAddress!) as any)
    }
  }

  const handleWalletSelect = (walletType: string, accountAddress: string): void => {
    setWalletType(walletType)
    setSelectedAddress(accountAddress)
    setWalletModalOpen(false)
  }

  const handleCloseStakeModal = (): void => {
    setStakeModalOpen(false)
    dispatch(setSelectedValidator(null!))

    if (!selectedAddress) {
      return
    }
    dispatch(getValidators(selectedAddress) as any)
  }

  useEffect(() => {
    dispatch(getInflation() as any)
    dispatch(getTotalSupply() as any)
    dispatch(getTotalStaked() as any)
    dispatch(changeStakeCellEntity(null!) as any)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!selectedAddress) {
      return
    }
    dispatch(getValidators(selectedAddress) as any)
    // eslint-disable-next-line
  }, [selectedAddress])

  useEffect(() => {
    if (validators.length > 0) {
      const total = validators
        .map((validator) => validator.reward?.amount ?? '0')
        .reduce((total, entry) => String(new BigNumber(total).toNumber() + new BigNumber(entry).toNumber()))
      setTotalRewards(new BigNumber(total).toNumber())
    }
  }, [validators])

  useEffect(() => {
    if (selectedValidator) {
      setStakeModalOpen(true)
    }
  }, [selectedValidator])

  return (
    <div className='container-fluid'>
      {validators.length > 0 && (
        <>
          <div className='row pb-4 justify-content-end align-items-center'>
            <StatsLabel className='pr-5'>{`Inflation: ${(Inflation * 100).toFixed(0)}%`}</StatsLabel>
            <StatsLabel className='pr-5'>{`APR: ${APR.toFixed(1)}%`}</StatsLabel>
            <Button onClick={handleClaimRewards}>
              {`Claim Reward: ${thousandSeparator(totalRewards.toFixed(2), ',')} IXO`}
            </Button>
          </div>
          <div className='row'>
            <Table columns={columns} data={validators} />
          </div>
        </>
      )}

      <ModalWrapper
        isModalOpen={walletModalOpen}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setWalletModalOpen(false)}
      >
        <WalletSelectModal handleSelect={handleWalletSelect} availableWallets={['keysafe', 'keplr']} />
      </ModalWrapper>
      <ModalWrapper
        isModalOpen={stakeModalOpen}
        header={{
          title: modalTitle,
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={handleCloseStakeModal}
      >
        <StakingModal
          walletType={walletType!}
          accountAddress={selectedAddress!}
          defaultValidator={validators.find((validator) => validator.address === selectedValidator)}
          handleStakingMethodChange={setModalTitle}
        />
      </ModalWrapper>
    </div>
  )
}
export default Stake
