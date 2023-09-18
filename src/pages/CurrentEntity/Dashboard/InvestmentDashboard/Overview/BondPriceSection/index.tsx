import { FlexBox } from 'components/App/App.styles'
import BondBuyModal from 'components/Modals/BondBuyModal'
import { Button } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'

interface Props {
  bondDid: string
}
const BondPriceSection: React.FC<Props> = ({ bondDid }) => {
  const [buyModalOpen, setBuyModalOpen] = useState(false)

  const onBuyClick = () => {
    setBuyModalOpen(true)
  }

  return (
    <FlexBox>
      <Button variant='secondary' onClick={onBuyClick}>
        Buy
      </Button>
      <BondBuyModal bondDid={bondDid} open={buyModalOpen} setOpen={setBuyModalOpen} />
    </FlexBox>
  )
}

export default BondPriceSection
