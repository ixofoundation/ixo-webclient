import React, { useMemo, useState } from 'react'
import * as Modal from 'react-modal'

import CloseIcon from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { Button, Dropdown } from 'screens/CreateEntity/Components'
import { deviceWidth } from 'constants/device'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { errorToast } from 'utils/toast'
import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { chainNetwork } from 'hooks/configs'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { ProposalActionConfigMap } from 'constants/entity'

interface Props {
  linkedResource: LinkedResource
  open: boolean
  onClose: () => void
  onChange?: (linkedResource: LinkedResource) => void
}

const ProposalActionModal: React.FC<Props> = ({ linkedResource, open, onClose, onChange }): JSX.Element => {
  const [type, setType] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const options = useMemo(
    () => Object.values(ProposalActionConfigMap).map((v) => ({ text: v.text, value: v.type })),
    [],
  )

  const disabled = useMemo(() => !type || uploading, [type, uploading])

  const handleContinue = async () => {
    if (!onChange) {
      return
    }
    setUploading(true)

    const buff = Buffer.from(JSON.stringify({ proposalAction: type }))
    customQueries.cellnode
      .uploadWeb3Doc(
        utils.common.generateId(12),
        `application/ld+json`,
        buff.toString('base64'),
        undefined,
        chainNetwork,
      )
      .then((response) => {
        if (response.url && response.cid) {
          onChange({
            ...(linkedResource ?? {}),
            ...{
              serviceEndpoint: response.url,
              mediaType: 'ld+json',
              proof: response.cid,
              description: ProposalActionConfigMap[type]?.desciption,
            },
          })
          setUploading(false)
          onClose()
        } else {
          throw new Error('Something went wrong!')
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 413) {
          // Handle the specific 413 error case
          errorToast('File too large')
        } else {
          errorToast('Error uploading')
        }
        setUploading(false)
      })
  }

  return (
    // @ts-ignore
    <Modal
      style={{ ...ModalStyles, content: { ...ModalStyles.content, width: deviceWidth.desktop } }}
      isOpen={open}
      onRequestClose={onClose}
      contentLabel='Modal'
      ariaHideApp={false}
    >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox $direction='column' $gap={4} width='100%'>
        <FlexBox>
          <Typography size='2xl'>Choose Proposal Action</Typography>
        </FlexBox>

        <FlexBox width='100%' $gap={12} $alignItems='stretch'>
          <FlexBox width='100%' $direction='column' $gap={4}>
            <Dropdown
              name={'proposal_action'}
              value={type}
              options={[{ text: 'Select a proposal action', value: '' }, ...options]}
              onChange={(e) => setType(e.target.value)}
              style={{ textAlign: 'center', height: 48 }}
            />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={4}>
          <Button onClick={handleContinue} disabled={disabled}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default ProposalActionModal
