import React, { useMemo, useState } from 'react'
import * as Modal from 'react-modal'

import { customQueries, utils } from '@ixo/impactxclient-sdk'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Checkbox, Flex } from '@mantine/core'
import { Box, FlexBox } from 'components/CoreEntry/App.styles'
import { FormData } from 'components/JsonForm/types'
import { CloseButton, ModalStyles } from 'components/Modals/styles'
import PulseLoader from 'components/Spinner/PulseLoader/PulseLoader'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { chainNetwork } from 'hooks/configs'
import { useDropzone } from 'react-dropzone'
import { Button, InputWithLabel } from 'screens/CreateEntity/Components'
import { useTheme } from 'styled-components'
import { getLinkedResourceTypeFromPrefix } from 'utils/common'
import { errorToast } from 'utils/toast'

interface Props {
  linkedResource: LinkedResource
  open: boolean
  onClose: () => void
  onChange?: (linkedResource: LinkedResource) => void
}

const LinkedResourceSetupModal: React.FC<Props> = ({
  linkedResource: _linkedResource,
  open,
  onClose,
  onChange,
}): JSX.Element => {
  const linkedResource = {
    ..._linkedResource,
    display: _linkedResource?.display ?? _linkedResource?.type?.startsWith('display:'),
    type: getLinkedResourceTypeFromPrefix(_linkedResource.type),
  }
  const theme: any = useTheme()
  const [formData, setFormData] = useState<FormData>(linkedResource!)
  const [uploading, setUploading] = useState(false)

  const disabled = useMemo(
    () => !formData?.serviceEndpoint || !formData?.mediaType || !formData?.description,
    [formData],
  )

  const linkResourceType = linkedResource?.type

  const {
    getRootProps,
    getInputProps,
    open: openDropZone,
  } = useDropzone({
    noClick: true,
    accept: EntityLinkedResourceConfig[linkResourceType]?.accept,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const [file] = acceptedFiles

      const reader = new FileReader()
      reader.onload = (e: any): void => {
        const fileSrc = e.target.result
        const mediaType = fileSrc.split(',')[0].split(';')[0].split(':').pop()
        const base64 = fileSrc.split(',').pop()

        setUploading(true)

        customQueries.cellnode
          .uploadWeb3Doc(utils.common.generateId(12), `application/${mediaType}`, base64, undefined, chainNetwork)
          .then((response) => {
            if (response.url && response.cid) {
              handleFormDataChange('serviceEndpoint', response.url)
              handleFormDataChange('mediaType', mediaType)
              handleFormDataChange('proof', response.cid)
              setUploading(false)
            } else {
              throw new Error('Something went wrong!')
            }
          })
          .catch((e) => {
            if (e.response && e.response.status === 413) {
              // Handle the specific 413 error case
              errorToast('File too large')
              setUploading(false)
            } else {
              errorToast('Error uploading')
              setUploading(false)
            }
          })
      }
      reader.readAsDataURL(file)
    },
  })

  const handleFormDataChange = (key: string, value: string | boolean): void => {
    onChange && setFormData((pre) => ({ ...pre, [key]: value }))
  }

  const handleContinue = (): void => {
    onChange && onChange({ ...(linkedResource ?? {}), ...formData })
    onClose()
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
        <img src='/assets/images/icon-close.svg' />
      </CloseButton>

      <FlexBox $direction='column' $gap={4} width='100%'>
        <FlexBox>
          <Typography size='2xl'>Linked Resource</Typography>
        </FlexBox>

        <FlexBox width='100%' $gap={12} $alignItems='stretch'>
          <FlexBox $direction='column' $gap={4}>
            <FlexBox
              width='400px'
              height='400px'
              background={theme.ixoGrey100}
              $borderRadius='8px'
              $direction='column'
              $justifyContent='center'
              $alignItems='center'
              overflow='hidden'
              $gap={4}
              {...getRootProps()}
            >
              {uploading ? (
                <Box width='150px' height='150px'>
                  <PulseLoader
                    repeat={true}
                    borderColor={theme.ixoNewBlue}
                    style={{ width: 'inherit', height: 'inherit' }}
                  >
                    <Typography color='blue' weight='semi-bold' size='2xl'>
                      Uploading...
                    </Typography>
                  </PulseLoader>
                </Box>
              ) : !formData?.serviceEndpoint ? (
                <>
                  <input {...getInputProps()} />
                  <Typography color='blue' weight='semi-bold' size={'2xl'}>
                    Drop a file or
                  </Typography>
                  <Button onClick={onChange && openDropZone}>Upload</Button>
                  <Typography size='sm' weight='medium' color='grey700'>
                    Media file, max size 1MB
                  </Typography>
                </>
              ) : (
                <FlexBox
                  width='100%'
                  height='100%'
                  $justifyContent='center'
                  $alignItems='center'
                  cursor='pointer'
                  onClick={onChange && openDropZone}
                  title='Click to replace'
                >
                  <Typography color='blue' weight='bold' size='2xl'>
                    {EntityLinkedResourceConfig[linkResourceType]?.text || linkResourceType}
                  </Typography>
                </FlexBox>
              )}
            </FlexBox>
            <FlexBox $gap={4} $alignItems='center' width='100%'>
              <Typography size='xl'>Web:</Typography>
              <InputWithLabel
                height='48px'
                placeholder='https://'
                inputValue={formData?.serviceEndpoint}
                handleChange={(val): void => handleFormDataChange('serviceEndpoint', val)}
                disabled={uploading}
                style={{ fontWeight: 500 }}
              />
            </FlexBox>
          </FlexBox>

          <FlexBox $direction='column' $gap={4} width='100%' height='100%'>
            {/* Resource ID */}
            <InputWithLabel
              name='linked_resource_id'
              height='48px'
              label='ID'
              inputValue={formData?.id}
              handleChange={(value) => handleFormDataChange('id', value)}
              style={{ fontWeight: 500 }}
            />

            {/* Type of Resource */}
            <Flex gap={8} w='100%' align={'center'}>
              <InputWithLabel
                name='linked_resource_type'
                height='48px'
                width='100%'
                label='Type of Resource'
                inputValue={formData?.type}
                disabled
                style={{ fontWeight: 500 }}
              />
              <Checkbox
                checked={formData?.display}
                onChange={(event) => handleFormDataChange('display', event.currentTarget.checked)}
                label='Display'
                size='lg'
                radius={'sm'}
              />
            </Flex>

            {/* Media Type */}
            <InputWithLabel
              name='linked_resource_media_type'
              label='Media Type'
              inputValue={formData?.mediaType}
              style={{ fontWeight: 500 }}
            />

            {/* Description */}
            <InputWithLabel
              name='linked_resource_description'
              height='48px'
              label='Name'
              inputValue={formData?.description}
              handleChange={(value) => handleFormDataChange('description', value)}
              style={{ fontWeight: 500 }}
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

export default LinkedResourceSetupModal
