import { Button } from 'pages/CreateEntity/components'
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Point } from 'react-easy-crop/types'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import getCroppedImg from './helpers'
import {
  ImageBox,
  modalStyles,
  ModalWrapper,
  CloseButton,
} from './ImageCropModal.styles'

interface Props {
  open: boolean
  onClose: () => void
  imgSrc: string
  handleChange: (img) => void

  aspect?: number
  circularCrop?: boolean
}

const ImageCropModal: React.FC<Props> = ({
  open,
  onClose,
  imgSrc,
  handleChange,
  aspect,
  circularCrop = false,
}): JSX.Element => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = async (): Promise<void> => {
    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation,
        undefined,
        circularCrop,
      )
      handleChange(croppedImage)
    } catch (e) {
      console.error(e)
      return undefined
    }
    onClose()
  }

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
      {imgSrc && open && (
        <ModalWrapper>
          <ImageBox>
            <Cropper
              image={imgSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              minZoom={1}
              maxZoom={10}
              aspect={aspect}
              cropShape={circularCrop ? 'round' : 'rect'}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </ImageBox>
          <Button variant="primary" size="md" onClick={handleSave}>
            Save
          </Button>
        </ModalWrapper>
      )}
    </Modal>
  )
}

export default ImageCropModal
