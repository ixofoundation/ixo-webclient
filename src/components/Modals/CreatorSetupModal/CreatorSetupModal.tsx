import React, { useEffect, useMemo, useState } from 'react'
import * as Modal from 'react-modal'
import blocksyncApi from 'api/blocksync/blocksync'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { TEntityCreatorModel, PDS_URL } from 'types/entities'
import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button, CountryDropDown, InputWithLabel, TextArea } from 'pages/CreateEntity/Components'
import { FormData } from 'components/JsonForm/types'
import { useDropzone } from 'react-dropzone'
import ImageCropModal from '../ImageCropModal/ImageCropModal'
import PulseLoader from 'components/Spinner/PulseLoader/PulseLoader'
import { deviceWidth } from 'constants/device'
import { useTheme } from 'styled-components'

const cellNodeEndpoint = PDS_URL

interface Props {
  title?: string
  creator: TEntityCreatorModel
  open: boolean
  onClose: () => void
  onChange?: (creator: TEntityCreatorModel) => void
  onClone?: () => void
}

const CreatorSetupModal: React.FC<Props> = ({ creator, title, open, onClose, onChange, onClone }): JSX.Element => {
  const theme: any = useTheme()
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
    return () => {
      setFormData(undefined)
    }
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
    onChange && setFormData((pre) => ({ ...pre, [key]: value }))
  }

  const handleContinue = (): void => {
    if (formData && onChange) {
      onChange({ ...formData, '@type': 'ixo:creator' } as TEntityCreatorModel)
    }
    onClose()
  }

  const handleSave = (base64EncodedImage: any): void => {
    if (!base64EncodedImage || !cellNodeEndpoint) {
      return
    }
    setLoading(true)
    blocksyncApi.project
      .createPublic(base64EncodedImage, cellNodeEndpoint!)
      .then((response: any) => {
        if (response?.result?.key) {
          const url = new URL(`/public/${response.result.key}`, cellNodeEndpoint)
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
                <InputWithLabel
                  name='creator_logo'
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
              {/* Display Name */}
              <InputWithLabel
                name='creator_name'
                height='48px'
                label='Display Name'
                inputValue={formData?.displayName}
                handleChange={(value) => handleFormDataChange('displayName', value)}
                style={{ fontWeight: 500 }}
              />

              {/* Public Email */}
              <InputWithLabel
                name='creator_display_email'
                height='48px'
                label='Public Email'
                inputValue={formData?.email}
                handleChange={(value) => handleFormDataChange('email', value)}
                style={{ fontWeight: 500 }}
              />

              {/* Country */}
              <CountryDropDown
                value={formData?.location || ''}
                onChange={(value) => handleFormDataChange('location', value)}
                onBlur={(value) => handleFormDataChange('location', value)}
                onFocus={() => {
                  //
                }}
              />

              {/* Identifier */}
              <InputWithLabel
                name='creator_id'
                height='48px'
                label='Identifier'
                inputValue={formData?.id}
                handleChange={(value) => handleFormDataChange('id', value)}
                style={{ fontWeight: 500 }}
              />

              {/* Website */}
              <InputWithLabel
                name='creator_website'
                height='48px'
                label='Website'
                inputValue={formData?.website}
                handleChange={(value) => handleFormDataChange('website', value)}
                style={{ fontWeight: 500 }}
              />

              {/* Mission */}
              <TextArea
                name='creator_mission'
                height='150px'
                label='Mission'
                inputValue={formData?.mission}
                handleChange={(value) => handleFormDataChange('mission', value)}
                style={{ fontWeight: 500 }}
              />
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' justifyContent='flex-end' alignItems='center' gap={4}>
            {onClone && (
              <Button variant='secondary' onClick={onClone}>
                Clone
              </Button>
            )}
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
