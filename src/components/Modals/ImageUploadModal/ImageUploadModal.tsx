import React, { useEffect, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import * as Modal from 'react-modal'
import { useDropzone } from 'react-dropzone'
import blocksyncApi from 'api/blocksync/blocksync'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ReactComponent as ImageIcon } from 'assets/images/icon-image-fill.svg'
import { UploadBox, SelectImage, DisplayImage } from './ImageUploadModal.styles'
import { ModalStyles, CloseButton, ModalBody, ModalRow, ModalWrapper, ModalInput } from 'components/Modals/styles'
import { Box, theme } from 'components/App/App.styles'
import { PDS_URL } from 'types/entities'
import PulseLoader from 'components/PulseLoader/PulseLoader'
import { default as ImageCropModal } from '../ImageCropModal/ImageCropModal'
import { Button } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import * as Toast from 'utils/toast'

const cellNodeEndpoint = PDS_URL

interface Props {
  open: boolean
  onClose: () => void
  value: string
  aspect?: number
  circularCrop?: boolean
  handleChange: (image: string) => void
}

const ImageUploadModal: React.FC<Props> = ({
  open,
  onClose,
  value,
  aspect,
  circularCrop,
  handleChange,
}): JSX.Element => {
  const [imgSrc, setImgSrc] = useState(undefined)
  const [tempValue, setTempValue] = useState(value)
  const [canSubmit, setCanSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cropModalOpen, setCropModalOpen] = useState(false)

  const handleSave = (base64EncodedImage: any): void => {
    if (!base64EncodedImage) {
      return
    }
    setLoading(true)
    setTempValue('')
    setCanSubmit(false)
    blocksyncApi.project
      .createPublic(base64EncodedImage, cellNodeEndpoint!)
      .then((response: any) => {
        console.log('ImageUploadModal', response)
        if (response?.result?.key) {
          const url = new URL(`/public/${response.result.key}`, cellNodeEndpoint)
          setTempValue(url.href)
        } else {
          throw new Error('Error uploading')
        }
      })
      .catch(() => {
        Toast.errorToast(`Server went down or Image is too large.`)
        setLoading(false)
      })
  }

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
    if (!open) {
      setTempValue(value)
      setCanSubmit(false)
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [open])

  useEffect(() => {
    if (tempValue) {
      const image = new Image()
      image.src = tempValue
      image.onload = (): void => {
        setCanSubmit(true)
        setLoading(false)
      }
      image.onerror = (): void => {
        setCanSubmit(false)
        setLoading(false)
      }
    }
  }, [tempValue])

  return (
    <>
      {/* @ts-ignore */}
      <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>

        <ModalWrapper>
          <ModalBody>
            <ModalRow>
              {loading ? (
                <UploadBox>
                  <Box style={{ width: 150, height: 150 }}>
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
                </UploadBox>
              ) : !tempValue ? (
                <UploadBox {...getRootProps()}>
                  <SelectImage>
                    <input {...getInputProps()} />
                    <ImageIcon />
                    <Typography color='blue' weight='semi-bold' size='2xl'>
                      Drop file or
                    </Typography>
                    <Button size='md' onClick={openDropZone}>
                      Upload
                    </Button>
                  </SelectImage>
                </UploadBox>
              ) : (
                <UploadBox {...getRootProps({ noDrag: true })}>
                  <input {...getInputProps()} />
                  <DisplayImage title='Click to replace' background={tempValue} onClick={openDropZone} />
                </UploadBox>
              )}
            </ModalRow>

            <ModalRow>
              <Typography size='xl' style={{ whiteSpace: 'nowrap' }}>
                Web Source
              </Typography>
              <ModalInput
                name='image_upload_source'
                inputValue={tempValue}
                placeholder={'https://'}
                height='48px'
                handleChange={(val): void => setTempValue(val)}
                disabled={loading}
              />
            </ModalRow>

            <ModalRow style={{ justifyContent: 'flex-end' }}>
              <Button
                size='md'
                disabled={!canSubmit}
                onClick={(): void => {
                  handleChange(tempValue)
                  onClose()
                }}
              >
                Continue
              </Button>
            </ModalRow>
          </ModalBody>
        </ModalWrapper>
      </Modal>
      <ImageCropModal
        open={cropModalOpen}
        onClose={(): void => setCropModalOpen(false)}
        imgSrc={imgSrc!}
        aspect={aspect}
        circularCrop={circularCrop}
        handleChange={(val): void => handleSave(val)}
      />
    </>
  )
}

export default ImageUploadModal
