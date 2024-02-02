import BigNumber from 'bignumber.js'
import { FlexBox } from 'components/App/App.styles'
import BondWithdrawReserveModal from 'components/Modals/BondWithdrawReserveModal'
import { useGetBondDid } from 'graphql/bonds'
import { useAccount } from 'hooks/account'
import { MakeOutcomePayment, UpdateBondState, WithdrawShare } from 'lib/protocol'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { BondStateType } from 'redux/bond/bond.types'
import { errorToast, successToast } from 'utils/toast'
import ReserveWithdrawals from './ReserveWithdrawals'

interface Props {
  bondDid: string
}

const BondReserveFundsSection: React.FC<Props> = ({ bondDid }) => {
  const { did, signingClient, address, balances } = useAccount()
  const { data: bondDetail } = useGetBondDid(bondDid)
  const userTokenBalance = useMemo(
    () => balances.find((balance) => balance.denom === bondDetail.token)?.amount || '0',
    [balances, bondDetail],
  )

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const isActiveWithdrawReserve = useMemo((): boolean => {
    try {
      if (!did) {
        return false
      }
      if (!bondDetail.allowReserveWithdrawals) {
        return false
      }
      if (!bondDetail.controllerDid.includes(did)) {
        return false
      }
      if (bondDetail.state !== BondStateType.OPEN) {
        return false
      }

      return true
    } catch (e) {
      return false
    }
  }, [bondDetail, did])

  const isActiveWithdrawShare = useMemo((): boolean => {
    try {
      if (!did) {
        return false
      }
      if (!new BigNumber(userTokenBalance).isGreaterThan(0)) {
        return false
      }
      if (bondDetail.state !== BondStateType.SETTLED) {
        return false
      }

      return true
    } catch (e) {
      return false
    }
  }, [did, bondDetail, userTokenBalance])

  const isActiveMakeOutcomePayout = useMemo((): boolean => {
    try {
      if (!did) {
        return false
      }
      if (!bondDetail.controllerDid.includes(did)) {
        return false
      }
      if (bondDetail.state !== BondStateType.OPEN) {
        return false
      }

      return true
    } catch (e) {
      return false
    }
  }, [did, bondDetail])

  const onWithdrawClick = () => {
    setWithdrawModalOpen(true)
  }
  const onShareClick = async () => {
    try {
      setLoading(true)
      const res = await WithdrawShare(signingClient, { did, bondDid, address })
      if (res.code === 0) {
        successToast('Withdraw Share', 'Successfully signed!')
      } else {
        errorToast('Withdraw Share', res.rawLog)
      }
    } catch (e) {
      console.error('onShareClick', e)
    } finally {
      setLoading(false)
    }
  }
  const onMakeOutcomePaymentClick = async () => {
    try {
      setLoading(true)
      // TODO: outcome payment amount ?
      const makeOutcomePaymentRes = await MakeOutcomePayment(signingClient, { did, bondDid, address, amount: '1' })
      if (makeOutcomePaymentRes.code === 0) {
        successToast('Make Outcome Payment', 'Successfully signed!')

        const updateBondStateRes = await UpdateBondState(signingClient, {
          did,
          bondDid,
          address,
          state: BondStateType.SETTLED,
        })
        if (updateBondStateRes.code === 0) {
          successToast('Update Bond State', 'Successfully signed!')
        } else {
          errorToast('Update Bond State', updateBondStateRes.rawLog)
        }
      } else {
        errorToast('Make Outcome Payment', makeOutcomePaymentRes.rawLog)
      }
    } catch (e) {
      console.error('onMakeOutcomePaymentClick', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FlexBox $direction='column' width='100%' $gap={6}>
      <FlexBox width='100%' $gap={4}>
        {isActiveWithdrawReserve && (
          <Button variant='secondary' size='flex' onClick={onWithdrawClick} loading={loading}>
            Withdraw
          </Button>
        )}
        {isActiveWithdrawShare && (
          <Button variant='secondary' size='flex' onClick={onShareClick} loading={loading}>
            Share
          </Button>
        )}
        {isActiveMakeOutcomePayout && (
          <Button variant='secondary' size='flex' onClick={onMakeOutcomePaymentClick} loading={loading}>
            Make Outcome Payment
          </Button>
        )}
      </FlexBox>

      {/* {isActiveWithdrawReserve ? <ReserveWithdrawals bondDid={bondDid} /> : <ReserveWithdrawals bondDid={bondDid} />} */}
      <ReserveWithdrawals bondDid={bondDid} />

      {withdrawModalOpen && (
        <BondWithdrawReserveModal open={withdrawModalOpen} setOpen={setWithdrawModalOpen} bondDid={bondDid} />
      )}
    </FlexBox>
  )
}

export default BondReserveFundsSection
