import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'


import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button } from 'screens/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { TEntityLiquidityModel } from 'types/entities'
import { Typography } from 'components/Typography'

interface Props {
  liquidity: TEntityLiquidityModel[]
  open: boolean
  onClose: () => void
  handleChange: (liquidity: TEntityLiquidityModel[]) => void
}

const LiquiditySetupModal: React.FC<Props> = ({ liquidity, open, onClose, handleChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData[]>([])

  useEffect(() => {
    setFormData(liquidity ?? [])
  }, [liquidity])

  const handleAddLiquidity = (): void => setFormData((pre) => [...pre, {}])
  // const handleUpdateLiquidity = (index: number, liquidity: FormData): void =>
  //   setFormData((pre) => pre.map((origin, idx) => (index === idx ? liquidity : origin)))
  // const handleRemoveLiquidity = (index: number): void => setFormData((pre) => pre.filter((_, idx) => idx !== index))

  const handleSubmit = (): void => {
    handleChange(
      formData.map((data) => ({
        source: data.source,
        liquidityId: data.liquidityId,
      })),
    )
    onClose()
  }
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <img src="/assets/images/icon-close.svg"  />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Liquidity</ModalTitle>
        <ModalBody>
          {formData.map((liquidity, index) => (
            <ModalRow key={index}>
              {/* <LiquidityCard
                source={liquidity?.source}
                liquidityId={liquidity?.liquidityId}
                handleUpdateContent={(formData): void => handleUpdateLiquidity(index, formData)}
                handleRemoveSection={(): void => handleRemoveLiquidity(index)}
                handleSubmitted={(): void => {
                  // this.props.handleValidated(stake.id)
                }}
                handleError={(): void => {
                  // this.props.handleValidationError(stake.id, errors)
                }}
              /> */}
            </ModalRow>
          ))}
          <ModalRow style={{ justifyContent: 'center' }}>
            <Typography color='blue' style={{ cursor: 'pointer' }} onClick={handleAddLiquidity}>
              + Add Liquidity
            </Typography>
          </ModalRow>
          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button disabled={!formData} onClick={handleSubmit}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default LiquiditySetupModal
