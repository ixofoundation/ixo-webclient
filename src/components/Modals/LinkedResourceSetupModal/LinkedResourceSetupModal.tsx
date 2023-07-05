import React, { useMemo, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { useDropzone } from 'react-dropzone'
import blocksyncApi from 'api/blocksync/blocksync'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { Button, InputWithLabel, TextArea } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { TEntityLinkedResourceModel, EntityLinkedResourceConfig } from 'types/protocol'
import { deviceWidth } from 'constants/device'
import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import PulseLoader from 'components/PulseLoader/PulseLoader'
import { PDS_URL } from 'types/entities'
import { toTitleCase } from 'utils/formatters'
import { errorToast } from 'utils/toast'
import { useTheme } from 'styled-components'

const cellNodeEndpoint = PDS_URL

interface Props {
  linkedResource: TEntityLinkedResourceModel
  open: boolean
  onClose: () => void
  onChange?: (linkedResource: TEntityLinkedResourceModel) => void
}

const LinkedResourceSetupModal: React.FC<Props> = ({ linkedResource, open, onClose, onChange }): JSX.Element => {
  const theme: any = useTheme()
  const [formData, setFormData] = useState<FormData>(linkedResource)
  const [uploading, setUploading] = useState(false)

  const disabled = useMemo(() => !formData.serviceEndpoint || !formData.mediaType || !formData.description, [formData])

  const {
    getRootProps,
    getInputProps,
    open: openDropZone,
  } = useDropzone({
    noClick: true,
    accept: EntityLinkedResourceConfig[linkedResource.type].accept,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const [file] = acceptedFiles

      const reader = new FileReader()
      reader.onload = (e: any): void => {
        const fileSrc = e.target.result
        const mediaType = fileSrc.split(',')[0].split(';')[0].split(':').pop()

        console.log({ fileSrc, mediaType })

        setUploading(true)

        blocksyncApi.project
          .createPublic(fileSrc, cellNodeEndpoint!)
          .then((response: any) => {
            if (response?.result?.key) {
              const url = new URL(`/public/${response.result.key}`, cellNodeEndpoint)
              handleFormDataChange('serviceEndpoint', url.href)
              handleFormDataChange('mediaType', mediaType)
              setUploading(false)
            } else {
              throw response?.result
            }
          })
          .catch((e) => {
            console.error(e)
            errorToast('Error uploading', e)
            setUploading(false)
          })
      }
      reader.readAsDataURL(file)
    },
  })

  const handleFormDataChange = (key: string, value: string): void => {
    setFormData((pre) => ({ ...pre, [key]: value }))
  }

  const handleContinue = (): void => {
    onChange && onChange({ ...linkedResource, ...formData })
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
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={4} width='100%'>
        <FlexBox>
          <Typography size='2xl'>Linked Resource</Typography>
        </FlexBox>

        <FlexBox width='100%' gap={12} alignItems='stretch'>
          <FlexBox direction='column' gap={4}>
            <FlexBox
              width='400px'
              height='400px'
              background={theme.ixoGrey100}
              borderRadius='8px'
              direction='column'
              justifyContent='center'
              alignItems='center'
              overflow='hidden'
              gap={4}
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
              ) : !formData.serviceEndpoint ? (
                <>
                  <input {...getInputProps()} />
                  <Typography color='blue' weight='semi-bold' size={'2xl'}>
                    Drop a file or
                  </Typography>
                  <Button onClick={openDropZone}>Upload</Button>
                  <Typography size='sm' weight='medium' color='grey700'>
                    Media file, max size 5MB
                  </Typography>
                </>
              ) : (
                <FlexBox
                  width='100%'
                  height='100%'
                  justifyContent='center'
                  alignItems='center'
                  cursor='pointer'
                  onClick={openDropZone}
                  title='Click to replace'
                >
                  {/* <iframe
                    src={formData.serviceEndpoint}
                    title='media'
                    width={'100%'}
                    height={'100%'}
                    frameBorder='0'
                    style={{ pointerEvents: 'none' }}
                  /> */}
                  <Typography color='blue' weight='bold' size='2xl'>
                    {EntityLinkedResourceConfig[linkedResource.type].text || linkedResource.type}
                  </Typography>
                </FlexBox>
              )}
            </FlexBox>
            <FlexBox gap={4} alignItems='center' width='100%'>
              <Typography size='xl'>Web:</Typography>
              <InputWithLabel
                height='48px'
                placeholder='https://'
                inputValue={formData.serviceEndpoint}
                handleChange={(val): void => handleFormDataChange('serviceEndpoint', val)}
                disabled={uploading}
                style={{ fontWeight: 500 }}
              />
            </FlexBox>
          </FlexBox>

          <FlexBox direction='column' gap={4} width='100%' height='100%'>
            {/* Type of Resource */}
            <InputWithLabel
              name='linked_resource_type'
              height='48px'
              label='Type of Resource'
              inputValue={toTitleCase(formData.type)}
              style={{ fontWeight: 500 }}
            />

            {/* Media Type */}
            <InputWithLabel
              name='linked_resource_media_type'
              height='48px'
              label='Media Type'
              inputValue={formData.mediaType}
              style={{ fontWeight: 500 }}
            />

            {/* Description */}
            <TextArea
              name='linked_resource_description'
              height='150px'
              label='Description'
              inputValue={formData.description}
              handleChange={(value) => handleFormDataChange('description', value)}
              style={{ fontWeight: 500 }}
            />
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' justifyContent='flex-end' alignItems='center' gap={4}>
          <Button onClick={handleContinue} disabled={disabled}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default LinkedResourceSetupModal
