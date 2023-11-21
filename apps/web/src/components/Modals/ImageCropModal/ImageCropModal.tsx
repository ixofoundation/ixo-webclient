import { Button } from 'pages/CreateEntity/Components'
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Point } from 'react-easy-crop/types'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import getCroppedImg from './helpers'
import { ImageBox } from './ImageCropModal.styles'
import { ModalStyles, ModalWrapper, ModalBody, ModalRow, CloseButton } from 'components/Modals/styles'

interface Props {
  open: boolean
  onClose: () => void
  imgSrc: string
  handleChange: (img: any) => void

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

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels :any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleSave = async (): Promise<void> => {
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels, rotation, undefined, circularCrop)
      handleChange(croppedImage)
    } catch (e) {
      console.error(e)
      return undefined
    }
    onClose()
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      {imgSrc && open && (
        <ModalWrapper>
          <ModalBody>
            <ModalRow>
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
            </ModalRow>
            <ModalRow style={{ justifyContent: 'center' }}>
              <Button variant='primary' size='md' onClick={handleSave}>
                Save
              </Button>
            </ModalRow>
          </ModalBody>
        </ModalWrapper>
      )}
    </Modal>
  )
}

export default ImageCropModal
