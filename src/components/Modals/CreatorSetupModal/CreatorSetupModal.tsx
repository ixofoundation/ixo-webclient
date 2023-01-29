import React, { useEffect, useMemo, useState } from 'react'
import * as Modal from 'react-modal'
import blocksyncApi from 'api/blocksync/blocksync'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { TEntityCreatorModel } from 'types/protocol'
import { Box, FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button, Input, TextArea } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { useDropzone } from 'react-dropzone'
import ImageCropModal from '../ImageCropModal/ImageCropModal'
import { PDS_URL } from 'types/entities'
import PulseLoader from 'components/PulseLoader/PulseLoader'

const cellNodeEndpoint = PDS_URL

interface Props {
  title?: string
  creator: TEntityCreatorModel
  open: boolean
  onClose: () => void
  onChange?: (creator: TEntityCreatorModel) => void
}

const CreatorSetupModal: React.FC<Props> = ({ creator, title, open, onClose, onChange }): JSX.Element => {
  const [formData, setFormData] = useState<FormData | undefined>(undefined)
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgSrc, setImgSrc] = useState(undefined)
  const disabled = useMemo(
    () =>
      !formData?.id ||
      !formData?.logo ||
      !formData?.displayName ||
      !formData?.email ||
      !formData?.location ||
      !formData?.website ||
      !formData?.mission,
    [formData],
  )

  const {
    getRootProps,
    getInputProps,
    open: openDropZone,
  } = useDropzone({
    noClick: true,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const [file] = acceptedFiles

      const reader = new FileReader()
      reader.onload = (e: any): void => {
        setImgSrc(e.target.result)
        setCropModalOpen(true)
      }
      reader.readAsDataURL(file)
    },
  })

  useEffect(() => {
    setFormData(creator)
  }, [creator])

  useEffect(() => {
    if (formData?.logo) {
      const image = new Image()
      image.src = formData.logo
      image.onload = (): void => {
        setLoading(false)
      }
      image.onerror = (): void => {
        setLoading(false)
      }
    }
  }, [formData?.logo])

  const handleFormDataChange = (key: string, value: string): void => {
    setFormData((pre) => ({ ...pre, [key]: value }))
  }

  const handleContinue = (): void => {
    if (formData && onChange) {
      onChange({ ...formData, '@type': 'ixo:creator' } as TEntityCreatorModel)
      onClose()
    }
  }

  const handleSave = (base64EncodedImage: any): void => {
    if (!base64EncodedImage || !cellNodeEndpoint) {
      return
    }
    setLoading(true)
    blocksyncApi.project
      .createPublic(base64EncodedImage, cellNodeEndpoint!)
      .then((response: any) => {
        if (response.result) {
          const url = new URL(`/public/${response.result}`, cellNodeEndpoint)
          handleFormDataChange('logo', url.href)
        } else {
          throw new Error('Error uploading')
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {/* @ts-ignore */}
      <Modal
        style={{ ...ModalStyles, content: { ...ModalStyles.content, width: theme.breakpoints.xl } }}
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
            <Typography size='2xl'>{title}</Typography>
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
                {loading ? (
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
                ) : !formData?.logo ? (
                  <>
                    <input {...getInputProps()} />
                    <Typography color='blue' weight='semi-bold' size={'2xl'}>
                      Drop a file or
                    </Typography>
                    <Button onClick={openDropZone}>Upload</Button>
                    <Typography size='sm' weight='medium' color='grey700'>
                      Image file, max size 5MB
                    </Typography>
                  </>
                ) : (
                  <Box
                    width='100%'
                    height='100%'
                    background={`url(${formData.logo}) center no-repeat`}
                    backgroundSize='contain'
                    cursor='pointer'
                    onClick={openDropZone}
                    title='Click to replace'
                  />
                )}
              </FlexBox>
              <FlexBox gap={4} alignItems='center' width='100%'>
                <Typography size='xl'>Web:</Typography>
                <Input
                  height='48px'
                  placeholder='https://'
                  inputValue={formData?.logo}
                  handleChange={(val): void => handleFormDataChange('logo', val)}
                  disabled={loading}
                  style={{ fontWeight: 500 }}
                />
              </FlexBox>
            </FlexBox>

            <FlexBox direction='column' gap={4} width='100%' height='100%'>
              <FlexBox alignItems='center' width='100%'>
                <Box>
                  <Typography size='xl' style={{ width: 160 }}>
                    Display Name
                  </Typography>
                </Box>
                <Input
                  height='48px'
                  placeholder='Type a Name'
                  inputValue={formData?.displayName}
                  handleChange={(value) => handleFormDataChange('displayName', value)}
                  style={{ fontWeight: 500 }}
                />
              </FlexBox>
              <FlexBox alignItems='center' width='100%'>
                <Box>
                  <Typography size='xl' style={{ width: 160 }}>
                    Public Email
                  </Typography>
                </Box>
                <Input
                  height='48px'
                  placeholder='@'
                  inputValue={formData?.email}
                  handleChange={(value) => handleFormDataChange('email', value)}
                  style={{ fontWeight: 500 }}
                />
              </FlexBox>
              <FlexBox alignItems='center' width='100%'>
                <Box>
                  <Typography size='xl' style={{ width: 160 }}>
                    Country
                  </Typography>
                </Box>
                {/* TODO: dropdown */}
                <Input
                  height='48px'
                  placeholder='Select a Country'
                  inputValue={formData?.location}
                  handleChange={(value) => handleFormDataChange('location', value)}
                  style={{ fontWeight: 500 }}
                />
              </FlexBox>
              <FlexBox alignItems='center' width='100%'>
                <Box>
                  <Typography size='xl' style={{ width: 160 }}>
                    Identifier
                  </Typography>
                </Box>
                <Input
                  height='48px'
                  placeholder='Paste a DID'
                  inputValue={formData?.id}
                  handleChange={(value) => handleFormDataChange('id', value)}
                  style={{ fontWeight: 500 }}
                />
              </FlexBox>
              <FlexBox alignItems='center' width='100%'>
                <Box>
                  <Typography size='xl' style={{ width: 160 }}>
                    Website
                  </Typography>
                </Box>
                <Input
                  height='48px'
                  placeholder='https://'
                  inputValue={formData?.website}
                  handleChange={(value) => handleFormDataChange('website', value)}
                  style={{ fontWeight: 500 }}
                />
              </FlexBox>
              <FlexBox alignItems='center' width='100%'>
                <Box>
                  <Typography size='xl' style={{ width: 160 }}>
                    Mission
                  </Typography>
                </Box>
                <TextArea
                  height='150px'
                  placeholder='Type or Paste Text'
                  inputValue={formData?.mission}
                  handleChange={(value) => handleFormDataChange('mission', value)}
                  style={{ fontWeight: 500 }}
                />
              </FlexBox>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' justifyContent='flex-end' alignItems='center' gap={15}>
            <Button onClick={handleContinue} disabled={disabled}>
              Continue
            </Button>
          </FlexBox>
        </FlexBox>
      </Modal>
      <ImageCropModal
        open={cropModalOpen}
        onClose={(): void => setCropModalOpen(false)}
        imgSrc={imgSrc!}
        aspect={1}
        circularCrop={false}
        handleChange={(val): void => handleSave(val)}
      />
    </>
  )
}

export default CreatorSetupModal
