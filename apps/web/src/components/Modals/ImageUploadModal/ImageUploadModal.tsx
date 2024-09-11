import React, { useEffect, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import * as Modal from 'react-modal'
import { useDropzone } from 'react-dropzone'




import { UploadBox, SelectImage, DisplayImage } from './ImageUploadModal.styles'
import { ModalStyles, CloseButton, ModalBody, ModalRow, ModalWrapper, ModalInput } from 'components/Modals/styles'
import { Box } from 'components/App/App.styles'
import PulseLoader from 'components/Spinner/PulseLoader/PulseLoader'
import { default as ImageCropModal } from '../ImageCropModal/ImageCropModal'
import { Button } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import * as Toast from 'utils/toast'
import { useTheme } from 'styled-components'
import { useCreateEntity } from 'hooks/createEntity'

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
  const theme: any = useTheme()
  const [imgSrc, setImgSrc] = useState(undefined)
  const [imgContentType, setImgContentType] = useState('')
  const [tempValue, setTempValue] = useState(value)
  const [canSubmit, setCanSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const { uploadPublicDoc } = useCreateEntity()

  const handleSave = (base64EncodedImage: any): void => {
    if (!base64EncodedImage) {
      return
    }
    setLoading(true)
    setTempValue('')
    setCanSubmit(false)

    console.log('base64EncodedImage', base64EncodedImage.split(',')[1])
    console.log('imgContentType', imgContentType)

    uploadPublicDoc(base64EncodedImage.split(',')[1], imgContentType)
      .then((response: any) => {
        if (response?.key) {
          if (response?.url) {
            setTempValue(response.url)
          } else {
            setTempValue(process.env.NEXT_PUBLIC_PDS_URL + '/' + response.key)
          }
        }
      })
      .catch(() => {
        Toast.errorToast(null, `Server went down or Image is too large.`)
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
        const base64String = e.target.result
        setImgSrc(base64String)

        // Extract MIME type from the Base64 string
        const mimeType = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1]
        setImgContentType(mimeType)

        setCropModalOpen(true)
      }
      reader.readAsDataURL(file)
    },
  })

  useEffect(() => {
    setTempValue(value)
    setCanSubmit(false)
    setLoading(false)
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
          <img src="/assets/images/icon-close.svg"  />
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
                    <img src="/assets/images/icon-image-fill.svg"  />
                    <Typography color='blue' weight='semi-bold' size='2xl'>
                      Drop file or
                    </Typography>
                    <Button size='md' onClick={openDropZone}>
                      Upload
                    </Button>
                  </SelectImage>
                </UploadBox>
              ) : (
                <UploadBox {...getRootProps()}>
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
