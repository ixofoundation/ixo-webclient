import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'

import CloseIcon from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { Button } from 'screens/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { TEntityPaymentModel } from 'types/entities'
import { Typography } from 'components/Typography'

interface Props {
  payments: TEntityPaymentModel[]
  open: boolean
  onClose: () => void
  handleChange: (payments: TEntityPaymentModel[]) => void
}

const PaymentsSetupModal: React.FC<Props> = ({ payments, open, onClose, handleChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData[]>([])

  useEffect(() => {
    setFormData(payments ?? [])
  }, [payments])

  const handleAddPayment = (): void => setFormData((pre) => [...pre, {}])
  // const handleUpdatePayment = (index: number, payment: FormData): void =>
  //   setFormData((pre) => pre.map((origin, idx) => (index === idx ? payment : origin)))
  // const handleRemovePayment = (index: number): void => setFormData((pre) => pre.filter((_, idx) => idx !== index))

  const handleSubmit = (): void => {
    handleChange(
      formData.map((data) => ({
        type: data.type,
        paymentId: data.paymentId,
      })),
    )
    onClose()
  }
  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper style={{ width: 600 }}>
        <ModalTitle>Payments</ModalTitle>
        <ModalBody>
          {formData.map((payment, index) => (
            <ModalRow key={index}>
              {/* <PaymentCard
                type={payment?.type}
                paymentId={payment?.paymentId}
                handleUpdateContent={(formData): void => handleUpdatePayment(index, formData)}
                handleRemoveSection={(): void => handleRemovePayment(index)}
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
            <Typography color={'blue'} onClick={handleAddPayment}>
              + Add Payment
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

export default PaymentsSetupModal
