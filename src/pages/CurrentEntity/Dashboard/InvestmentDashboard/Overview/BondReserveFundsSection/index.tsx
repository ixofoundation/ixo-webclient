import { FlexBox } from 'components/App/App.styles'
import BondWithdrawReserveModal from 'components/Modals/BondWithdrawReserveModal'
import { useGetBondDid } from 'graphql/bonds'
import { useAccount } from 'hooks/account'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { BondStateType } from 'redux/bond/bond.types'

interface Props {
  bondDid: string
}

const BondReserveFundsSection: React.FC<Props> = ({ bondDid }) => {
  const { did } = useAccount()
  const { data: bondDetail } = useGetBondDid(bondDid)

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)

  const isActiveWithdrawReserve = useMemo((): boolean => {
    try {
      if (!did) {
        return false
      }
      if (!bondDetail.allowReserveWithdrawals) {
        return false
      }
      if (!bondDetail.controllerDid.includes(did.slice(8))) {
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

  const onWithdrawClick = () => {
    setWithdrawModalOpen(true)
  }
  const onShareClick = () => {
    //
  }

  return (
    <FlexBox>
      {isActiveWithdrawReserve ? (
        <Button variant='secondary' onClick={onWithdrawClick}>
          Withdraw
        </Button>
      ) : (
        <Button variant='secondary' onClick={onShareClick}>
          Share
        </Button>
      )}
      <BondWithdrawReserveModal open={withdrawModalOpen} setOpen={setWithdrawModalOpen} bondDid={bondDid} />
    </FlexBox>
  )
}

export default BondReserveFundsSection
