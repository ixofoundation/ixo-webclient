import * as React from 'react'
// @ts-ignore
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
// @ts-ignore
import Dropzone from 'react-dropzone'
import { DropZoneStyles, LoaderWrapper, UploadingWrapper } from '../Loader.styles'
import UploadFlat from 'assets/icons/UploadFlat'
import { strategyMap } from '../strategy-map'
import { FileType } from '../types'
import PulseLoader from '../../PulseLoader/PulseLoader'
import BackdropModal from '../../BackdropModal/BackdropModal'
import Portal from 'common/components/Portal/Portal'

export interface CroppingModalProps {
  circularCrop: boolean
  keepCropSelection: boolean
  isModalOpen: boolean
  imgSrc: any
  crop: any
  onSave: () => void
  onCancel: () => void
  onComplete: (crop: any) => void
  onImageLoaded: (dimensions: any) => false
  onCropChange: (crop: any) => void
}

const CroppingModal: React.FC<CroppingModalProps> = ({
  circularCrop,
  keepCropSelection,
  isModalOpen,
  imgSrc,
  crop,
  onSave,
  onCancel,
  onComplete,
  onImageLoaded,
  onCropChange,
}) => {
  if (!isModalOpen) return null

  return (
    <Portal wrapperId='crop-modal-portal'>
      <BackdropModal submitText='Submit' cancelText='Cancel' onSubmit={onSave} onCancel={onCancel}>
        <ReactCrop
          circularCrop={circularCrop}
          minHeight={50}
          minWidth={50}
          src={imgSrc}
          onComplete={onComplete}
          onImageLoaded={onImageLoaded}
          onChange={onCropChange}
          crop={crop}
          keepSelection={keepCropSelection}
        />
      </BackdropModal>
    </Portal>
  )
}

export interface Props {
  uploading: boolean
  uploadedImageSrc: string
  aspect?: number
  maxDimension: number
  previewWidth?: number
  circularCrop: boolean
  keepCropSelection: boolean
  handleSave: (base64EncodedImage: string) => void
}

const ImageLoader: React.FC<Props> = ({
  uploading,
  uploadedImageSrc,
  aspect,
  previewWidth,
  circularCrop,
  keepCropSelection,
  handleSave,
}) => {
  const [imgSrc, setImgSrc] = React.useState<any>('')
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [image, setImage] = React.useState<any>(null)
  const [crop, setCrop] = React.useState<any>(null)

  const reset = (): void => {
    setImgSrc('')
    setIsModalOpen(false)
    setImage(null)
    setCrop(null)
  }

  const onImageLoaded = (dimensions: any): false => {
    const { width: imageWidth, height: imageHeight } = dimensions
    const imageAspect = imageWidth / imageHeight

    let width
    let height
    let x
    let y

    if (aspect) {
      if (aspect > imageAspect) {
        width = imageWidth
        height = imageWidth / aspect
        x = 0
        y = (imageHeight - height) / 2
      } else {
        width = imageHeight * aspect
        height = imageHeight
        x = (imageWidth - width) / 2
        y = 0
      }
    } else {
      width = imageWidth
      height = imageHeight
      x = 0
      y = 0
    }

    setImage(dimensions)
    setIsModalOpen(true)
    setCrop({
      aspect,
      unit: 'px',
      width,
      height,
      x,
      y,
    })

    return false
  }

  const getCroppedImg = (): string => {
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const canvas = document.createElement('canvas')
    canvas.width = crop.width
    canvas.height = crop.height

    const ctx = canvas.getContext('2d')!

    if (circularCrop) {
      ctx.beginPath()
      ctx.arc(
        crop.width / 2,
        crop.height / 2,
        crop.width / 2,
        0,
        2 * Math.PI, // 4 radians is the entire circumference
      ) // draw the circle
      ctx.clip() //call the clip method so the next render is clipped in last path
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

  const getUncroppedImg = (): string => {
    const image = document.createElement('img')
    image.src = imgSrc

    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')!
    ctx.drawImage(image, 0, 0)

    return canvas.toDataURL()
  }

  const save = (): void => {
    const { width: cropWidth, height: cropHeight } = crop

    let base64EncodedImage: string

    if (cropWidth && cropHeight) {
      base64EncodedImage = getCroppedImg()
    } else {
      base64EncodedImage = getUncroppedImg()
    }

    handleSave(base64EncodedImage)
    reset()
  }

  const onDropAccepted = (files: any): void => {
    const file = files[0]

    const reader = new FileReader()

    reader.onload = (e2: any): void => {
      setImgSrc(e2.target.result)
      setIsModalOpen(true)
    }

    reader.readAsDataURL(file)
  }

  if (uploading) {
    return (
      <LoaderWrapper>
        <UploadingWrapper>
          <PulseLoader repeat={true}>
            <UploadFlat width={32} fill='#39C3E6' />
          </PulseLoader>
          <p>Uploading...</p>
        </UploadingWrapper>
      </LoaderWrapper>
    )
  }

  if (uploadedImageSrc) {
    return (
      <LoaderWrapper>
        <img alt='' className='file-preview' src={uploadedImageSrc} width={previewWidth} />
        <Dropzone accept={strategyMap[FileType.Image].mimeType} onDropAccepted={onDropAccepted} style={DropZoneStyles}>
          <button type='button'>{strategyMap[FileType.Image].replaceButtonText}</button>
        </Dropzone>
        <CroppingModal
          circularCrop={circularCrop}
          keepCropSelection={keepCropSelection}
          isModalOpen={isModalOpen}
          imgSrc={imgSrc}
          crop={crop}
          onSave={save}
          onCancel={reset}
          onComplete={setCrop}
          onImageLoaded={onImageLoaded}
          onCropChange={setCrop}
        />
      </LoaderWrapper>
    )
  }

  return (
    <LoaderWrapper>
      <Dropzone accept='image/*' onDropAccepted={onDropAccepted} style={DropZoneStyles}>
        <PulseLoader repeat={false}>
          <UploadFlat width={32} fill='#39C3E6' />
        </PulseLoader>
        <p className='desktop-upload-item'>Drag files to upload, or</p>
        <button type='button'>{strategyMap[FileType.Image].uploadButtonText}</button>
        <small>{strategyMap[FileType.Image].fileTypesText}</small>
      </Dropzone>
      <CroppingModal
        circularCrop={circularCrop}
        keepCropSelection={keepCropSelection}
        isModalOpen={isModalOpen}
        imgSrc={imgSrc}
        crop={crop}
        onSave={save}
        onCancel={reset}
        onComplete={setCrop}
        onImageLoaded={onImageLoaded}
        onCropChange={setCrop}
      />
    </LoaderWrapper>
  )
}

export default ImageLoader
