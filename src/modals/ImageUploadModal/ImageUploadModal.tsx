import React, { useEffect, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import * as Modal from 'react-modal'
import { useDropzone } from 'react-dropzone'
import blocksyncApi from 'api/blocksync/blocksync'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ReactComponent as ImageIcon } from 'assets/images/icon-image-fill.svg'
import { UploadBox, SelectImage, DisplayImage } from './ImageUploadModal.styles'
import { ModalStyles, CloseButton, ModalBody, ModalRow, ModalWrapper, ModalInput } from '../styles'
import { Box, theme, Typography } from 'common/components/App/App.styles'
import { PDS_URL } from 'modules/Entities/types'
import PulseLoader from 'common/components/PulseLoader/PulseLoader'
import { default as ImageCropModal } from '../ImageCropModal/ImageCropModal'
import { Button } from 'pages/CreateEntity/components'

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
    blocksyncApi.project
      .createPublic(base64EncodedImage, cellNodeEndpoint!)
      .then((response: any) => {
        const url = new URL(`/public/${response.result}`, cellNodeEndpoint)

        const image = new Image()
        image.src = url.href
        image.onload = (): void => {
          setTempValue(url.href)
          setCanSubmit(true)
          setLoading(false)
        }
      })
      .catch(() => {
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
                      <Typography color={theme.ixoNewBlue} fontWeight={600} fontSize='24px' lineHeight='28px'>
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
                    <Typography color={theme.ixoNewBlue} fontWeight={600} fontSize='24px' lineHeight='28px'>
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
              <Typography
                color={theme.ixoBlack}
                fontWeight={400}
                fontSize={'20px'}
                lineHeight={'28px'}
                style={{ whiteSpace: 'nowrap' }}
              >
                Web Source
              </Typography>
              <ModalInput
                inputValue={tempValue}
                placeholder={'https://'}
                handleChange={(val): void => setTempValue(val)}
                disabled={loading}
              />
            </ModalRow>

            <ModalRow>
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
