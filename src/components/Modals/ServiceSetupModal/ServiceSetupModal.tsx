import React, { useState, useEffect, useMemo } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalBody, ModalWrapper, ModalRow, ModalTitle } from 'components/Modals/styles'
import { TEntityServiceModel } from 'types/protocol'
import { Button } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import NodeCard from 'components/Entities/CreateEntity/CreateEntityAdvanced/Components/NodeCard/NodeCard'
import { Typography } from 'components/Typography'

interface Props {
  service: TEntityServiceModel[]
  open: boolean
  onClose: () => void
  onChange?: (services: TEntityServiceModel[]) => void
}
const refs: { [id: string]: React.RefObject<any> } = {}

const ServiceSetupModal: React.FC<Props> = ({ service, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData[]>([])
  const [error, setError] = useState<boolean>(true)

  const canSubmit = useMemo(
    () =>
      formData.length > 0 &&
      !formData.some(({ nodeId, type, serviceEndpoint }) => !nodeId || !type || !serviceEndpoint) &&
      !error,
    [formData, error],
  )

  useEffect(() => {
    if (service?.length > 0) {
      setFormData(
        service.map((data) => ({
          nodeId: data.id.replace('{id}#', ''),
          type: data.type,
          serviceEndpoint: data.serviceEndpoint,
        })),
      )
    }
  }, [service])

  const handleAddNode = (): void => {
    if (onChange) {
      setFormData((pre) => [...pre, {}])
      refs[formData.length] = React.createRef()
    }
  }
  const handleUpdateNode = (index: number, service: FormData): void =>
    onChange && setFormData((pre) => pre.map((origin, idx) => (index === idx ? service : origin)))
  const handleRemoveNode = (index: number): void =>
    onChange && setFormData((pre) => pre.filter((_, idx) => idx !== index))

  const handleUpdateServices = (): void => {
    onChange &&
      onChange(
        formData.map((data) => ({
          id: data.nodeId,
          type: data.type,
          serviceEndpoint: data.serviceEndpoint,
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
        <ModalTitle>Services</ModalTitle>
        <ModalBody>
          {formData.map((service, index) => {
            return (
              <ModalRow key={index}>
                <NodeCard
                  ref={refs[index]}
                  type={service?.type}
                  nodeId={service?.nodeId}
                  removable={formData.length > 1}
                  serviceEndpoint={service?.serviceEndpoint}
                  handleUpdateContent={(formData): void => handleUpdateNode(index, formData)}
                  handleRemoveSection={(): void => handleRemoveNode(index)}
                  handleSubmitted={(): void => {
                    console.log('service submitted')
                  }}
                  handleError={(fields: string[]): void => {
                    console.log(`service errors`, index, fields)
                    setError(fields.length > 0)
                  }}
                />
              </ModalRow>
            )
          })}
          {formData.length === 0 && (
            <ModalRow style={{ justifyContent: 'center' }}>
              <Typography className='cursor-pointer' color={'blue'} onClick={handleAddNode}>
                + Add Service
              </Typography>
            </ModalRow>
          )}
          <ModalRow style={{ justifyContent: 'flex-end' }}>
            <Button disabled={!canSubmit} onClick={handleUpdateServices}>
              Continue
            </Button>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default ServiceSetupModal
