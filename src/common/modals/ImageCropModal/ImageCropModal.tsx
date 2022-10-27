import React, { useState, useEffect } from 'react'
import { Crop, makeAspectCrop } from 'react-image-crop'
import * as Modal from 'react-modal'
import {
  modalStyles,
  ModalWrapper,
  StyledImageCrop,
} from './ImageCropModal.styles'

interface Props {
  open: boolean
  onClose: () => void
  imgSrc: string
  handleChange: (img) => void

  aspect?: number
  circularCrop?: boolean
  minWidth?: number
  minHeight?: number
}

const ImageCropModal: React.FC<Props> = ({
  open,
  onClose,
  imgSrc,
  handleChange,
  aspect,
  circularCrop = false,
  minWidth = 50,
  minHeight = 50,
}): JSX.Element => {
  const [crop, setCrop] = useState<Crop>(undefined)
  const [image, setImage] = useState(undefined)

  useEffect(() => {
    if (!open) {
      setCrop(undefined)
      setImage(undefined)
    }
  }, [open])

  const onImageLoaded = (image): void => {
    const { naturalWidth: width, naturalHeight: height } = image
    setImage(image)
    setCrop(
      makeAspectCrop(
        {
          ...crop,
          aspect,
        },
        width,
        height,
      ),
    )
  }

  const generateCroppedImg = (): string => {
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const canvas = document.createElement('canvas')
    canvas.width = crop.width
    canvas.height = crop.height

    const ctx = canvas.getContext('2d')

    if (circularCrop) {
      ctx.beginPath()
      ctx.arc(crop.width / 2, crop.height / 2, crop.width / 2, 0, 2 * Math.PI)
      ctx.clip()
      ctx.stroke()
      ctx.closePath()
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    )

    return canvas.toDataURL()
  }

  const handleSave = (): void => {
    handleChange(generateCroppedImg())
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
      {imgSrc && open && (
        <ModalWrapper>
          <StyledImageCrop
            circularCrop={circularCrop}
            minHeight={minHeight}
            minWidth={minWidth}
            src={imgSrc}
            onImageLoaded={onImageLoaded}
            onComplete={(c): void => setCrop({ ...c, aspect })}
            onChange={(c): void => setCrop({ ...c, aspect })}
            crop={crop}
          />
          <button onClick={handleSave}>Save</button>
        </ModalWrapper>
      )}
    </Modal>
  )
}

export default ImageCropModal
