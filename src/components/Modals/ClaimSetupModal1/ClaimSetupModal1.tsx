import React, { useState, useMemo, useEffect } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton, ModalWrapper } from 'components/Modals/styles'
import { Button, DateRangePicker, InputWithLabel, Switch } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { TEntityClaimModel1, TEntityClaimTemplateModel } from 'types/protocol'
import { FlexBox } from 'components/App/App.styles'
import ClaimTemplateCard from './ClaimTemplateCard'
import ClaimSelectModal from '../ClaimSelectModal/ClaimSelectModal'
import { Typography } from 'components/Typography'

interface Props {
  claim: TEntityClaimModel1
  open: boolean
  onClose: () => void
  onChange: (claim: TEntityClaimModel1) => void
}

const ClaimSetupModal1: React.FC<Props> = ({ claim, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData>()
  const [claimSelectModalOpen, setClaimSelectModalOpen] = useState<boolean>(false)
  const canSubmit = useMemo(() => {
    return (
      formData?.template &&
      formData?.maxSubmissions &&
      formData?.submissionStartDate &&
      formData?.submissionEndDate &&
      formData?.approvalTarget
    )
  }, [formData])

  useEffect(() => {
    setFormData(claim)
  }, [claim])

  const handleFormChange = (key: string, value: any): void => {
    setFormData((pre) => ({
      ...pre,
      [key]: value,
    }))
  }
  const handleSubmit = (): void => {
    onChange(formData as TEntityClaimModel1)
    onClose()
  }

  return (
    <>
      {/* @ts-ignore */}
      <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <ModalWrapper style={{ width: 870 }}>
          <FlexBox marginBottom={4}>
            <Typography size='2xl'>Claim</Typography>
          </FlexBox>
          <FlexBox direction='column' marginBottom={10}>
            <FlexBox gap={12.5} className='w-100'>
              <FlexBox>
                <ClaimTemplateCard template={formData?.template} onClick={(): void => setClaimSelectModalOpen(true)} />
              </FlexBox>
              <FlexBox direction='column' gap={4} className='w-100'>
                <FlexBox className='w-100'>
                  <InputWithLabel inputValue={formData?.template?.title} label={'Claim Title'} disabled />
                </FlexBox>
                <FlexBox className='w-100'>
                  <InputWithLabel inputValue={formData?.template?.description} label={'Claim Description'} disabled />
                </FlexBox>
                <FlexBox gap={4} className='w-100'>
                  <InputWithLabel
                    inputValue={formData?.maxSubmissions}
                    label={'Max Submissions #'}
                    handleChange={(maxSubmissions: string): void => handleFormChange('maxSubmissions', maxSubmissions)}
                  />
                  <InputWithLabel
                    inputValue={formData?.approvalTarget}
                    label={'Approval Target %'}
                    handleChange={(approvalTarget: string): void => handleFormChange('approvalTarget', approvalTarget)}
                  />
                </FlexBox>
                <FlexBox className='w-100'>
                  <DateRangePicker
                    id='protocol'
                    startDate={formData?.submissionStartDate || ''}
                    endDate={formData?.submissionEndDate || ''}
                    withPortal
                    onChange={(submissionStartDate, submissionEndDate) => {
                      handleFormChange('submissionStartDate', submissionStartDate)
                      handleFormChange('submissionEndDate', submissionEndDate)
                    }}
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox className='w-100' justifyContent='flex-end' alignItems='center' gap={8}>
            <Switch
              onLabel='Encrypted'
              value={formData?.isEncrypted}
              onChange={(value: boolean) => handleFormChange('isEncrypted', value)}
            />
            <Switch
              onLabel='Headline Metric'
              value={formData?.isHeadlineMetric}
              onChange={(value: boolean) => !formData?.isHeadlineMetric && handleFormChange('isHeadlineMetric', value)}
            />
            <Button disabled={!canSubmit} onClick={handleSubmit}>
              Continue
            </Button>
          </FlexBox>
        </ModalWrapper>
      </Modal>
      <ClaimSelectModal
        open={claimSelectModalOpen}
        onSelect={(template: TEntityClaimTemplateModel): void => handleFormChange('template', template)}
        onClose={(): void => setClaimSelectModalOpen(false)}
      />
    </>
  )
}

export default ClaimSetupModal1
