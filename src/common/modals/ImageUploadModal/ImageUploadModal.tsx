import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { useDropzone } from 'react-dropzone'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ReactComponent as ImageIcon } from 'assets/images/icon-image.svg'
import {
  modalStyles,
  CloseButton,
  ModalBody,
  ModalWrapper,
  UploadBox,
  ModalRow,
  ModalButton,
  SelectImage,
  DisplayImage,
} from './ImageUploadModal.styles'
import { Box, theme, Typography } from 'modules/App/App.styles'
import { Input } from 'pages/CreateEntity/CreateAsset/components'
import { PDS_URL } from 'modules/Entities/types'
import PulseLoader from 'common/components/PulseLoader/PulseLoader'

const cellNodeEndpoint = PDS_URL

interface Props {
  open: boolean
  onClose: () => void
  value: string
  handleChange: (image: string) => void
}

const ImageUploadModal: React.FC<Props> = ({
  open,
  onClose,
  value,
  handleChange,
}): JSX.Element => {
  const [tempValue, setTempValue] = useState(value)
  const [canSubmit, setCanSubmit] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = (base64EncodedImage): void => {
    setLoading(true)
    blocksyncApi.project
      .createPublic(base64EncodedImage, cellNodeEndpoint)
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

  const { getRootProps, getInputProps, open: openDropZone } = useDropzone({
    noClick: true,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const [file] = acceptedFiles

      const reader = new FileReader()
      reader.onload = (e): void => {
        handleSave(e.target.result)
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
  }, [open])

  return (
    <Modal
      style={modalStyles}
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
    >
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <ModalWrapper>
        <ModalBody>
          {loading ? (
            <UploadBox>
              <Box style={{ width: 150, height: 150 }}>
                <PulseLoader
                  repeat={true}
                  borderColor={theme.ixoNewBlue}
                  style={{ width: 'inherit', height: 'inherit' }}
                >
                  <Typography
                    color={theme.ixoNewBlue}
                    fontWeight={600}
                    fontSize="24px"
                    lineHeight="28px"
                  >
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
                <Typography
                  color={theme.ixoNewBlue}
                  fontWeight={600}
                  fontSize="24px"
                  lineHeight="28px"
                >
                  Drop file or
                </Typography>
                <ModalButton onClick={openDropZone}>Select</ModalButton>
              </SelectImage>
            </UploadBox>
          ) : (
            <UploadBox {...getRootProps({ noDrag: true })}>
              <input {...getInputProps()} />
              <DisplayImage
                title="Click to replace"
                background={tempValue}
                onClick={openDropZone}
              />
            </UploadBox>
          )}

          <ModalRow>
            <Typography
              color={theme.ixoBlack}
              fontWeight={400}
              fontSize={'20px'}
              lineHeight={'28px'}
              style={{ whiteSpace: 'nowrap' }}
            >
              From the Web
            </Typography>
            <Input
              inputValue={tempValue}
              placeholder={'https://'}
              handleChange={(val): void => setTempValue(val)}
            />
          </ModalRow>

          <ModalRow style={{ justifyContent: 'center' }}>
            <ModalButton
              disabled={!canSubmit}
              onClick={(): void => {
                handleChange(tempValue)
                onClose()
              }}
            >
              Continue
            </ModalButton>
          </ModalRow>
        </ModalBody>
      </ModalWrapper>
    </Modal>
  )
}

export default ImageUploadModal
