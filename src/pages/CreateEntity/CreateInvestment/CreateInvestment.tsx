import { CreateBondModal } from 'components/Modals'
import React from 'react'

const CreateInvestment: React.FC = (): JSX.Element => {
  return (
    <>
      <CreateBondModal
        open={true}
        onClose={(): void => {
          //
        }}
      />
    </>
  )
}

export default CreateInvestment
