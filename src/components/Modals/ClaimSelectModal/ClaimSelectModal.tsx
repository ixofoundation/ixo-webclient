import React, { useState } from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { FlexBox } from 'components/App/App.styles'
import { Button } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import ClaimTemplateCard from '../ClaimSetupModal1/ClaimTemplateCard'
import { TEntityClaimTemplateModel } from 'types/protocol'

const dummyClaimTemplate = {
  title: 'Test Claim Title',
  description:
    'Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada.',
  creator: 'Gregory',
  createdAt: '22-Sept-2022',
}

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (template: TEntityClaimTemplateModel) => void
}

const ClaimSelectModal: React.FC<Props> = ({ open, onClose, onSelect }): JSX.Element => {
  const [template, setTemplate] = useState<TEntityClaimTemplateModel>()
  const templates = new Array(9).fill(0)

  const handleCreate = (): void => {
    // TODO: redirect to create claim
  }
  const handleContinue = (): void => {
    template && onSelect(template)
    onClose()
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={8}>
        <FlexBox justifyContent='space-between' alignItems='center'>
          <Typography size='2xl'>Select a Verifiable Claim Protocol</Typography>
        </FlexBox>
        <FlexBox className='overflow-auto py-2' style={{ height: 520 }}>
          <FlexBox direction='column' gap={6}>
            {_.chunk(templates, 3).map((row, rowIdx) => (
              <FlexBox key={rowIdx} gap={6}>
                {row.map((_, index) => (
                  <ClaimTemplateCard
                    key={index}
                    template={{ ...dummyClaimTemplate, id: 'claim-select' + rowIdx + index }}
                    selected={'claim-select' + rowIdx + index === template?.id}
                    onClick={(): void => setTemplate({ ...dummyClaimTemplate, id: 'claim-select' + rowIdx + index })}
                  />
                ))}
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox className='w-100' justifyContent='flex-end' gap={5}>
          <Button variant='secondary' onClick={handleCreate}>
            Create New
          </Button>
          <Button disabled={!template} onClick={handleContinue}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default ClaimSelectModal
