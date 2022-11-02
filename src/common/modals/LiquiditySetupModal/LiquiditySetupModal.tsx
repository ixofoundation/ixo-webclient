import React, { useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import {
  ModalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
  ModalRow,
  ModalTitle,
} from '../styles'
import { Button } from 'pages/CreateEntity/components'
import { FormData } from 'common/components/JsonForm/types'
import { TEntityLiquidityModel } from 'types'
import LiquidityCard from 'modules/Entities/CreateEntity/CreateEntityAdvanced/components/LiquidityCard/LiquidityCard'
import { theme, Typography } from 'modules/App/App.styles'

interface Props {
  liquidity: TEntityLiquidityModel[]
  open: boolean
  onClose: () => void
  handleChange: (liquidity: TEntityLiquidityModel[]) => void
}

const LiquiditySetupModal: React.FC<Props> = ({
  liquidity,
  open,
  onClose,
  handleChange,
}): JSX.Element => {
  const [formData, setFormData] = useState<FormData[]>(liquidity ?? [])

  const handleAddLiquidity = (): void => setFormData((pre) => [...pre, {}])
  const handleUpdateLiquidity = (index: number, liquidity: FormData): void =>
    setFormData((pre) =>
      pre.map((origin, idx) => (index === idx ? liquidity : origin)),
    )
  const handleRemoveLiquidity = (index: number): void =>
    setFormData((pre) => pre.filter((_, idx) => idx !== index))

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
    <Modal
      style={ModalStyles}
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Liquidity</ModalTitle>
        <ModalBody>
          {formData.map((liquidity, index) => (
            <ModalRow key={index}>
              <LiquidityCard
                source={liquidity?.source}
                liquidityId={liquidity?.liquidityId}
                handleUpdateContent={(formData): void =>
                  handleUpdateLiquidity(index, formData)
                }
                handleRemoveSection={(): void => handleRemoveLiquidity(index)}
                handleSubmitted={(): void => {
                  // this.props.handleValidated(stake.id)
                }}
                handleError={(): void => {
                  // this.props.handleValidationError(stake.id, errors)
                }}
              />
            </ModalRow>
          ))}
          <ModalRow>
            <Typography
              color={theme.ixoNewBlue}
              style={{ cursor: 'pointer' }}
              onClick={handleAddLiquidity}
            >
              + Add Liquidity
            </Typography>
          </ModalRow>
          <ModalRow>
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
