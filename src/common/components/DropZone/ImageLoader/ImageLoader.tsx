import * as React from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Dropzone from 'react-dropzone'
import {
  DropZoneStyles,
  LoaderWrapper,
  UploadingWrapper,
} from '../Loader.styles'
import UploadFlat from 'assets/icons/UploadFlat'
import { strategyMap } from '../strategy-map'
import { FileType } from '../types'
import PulseLoader from '../../PulseLoader/PulseLoader'
import Modal from '../../Modal/Modal'

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

export interface State {
  imgSrc: any
  isModalOpen: boolean
  image: any
  crop: any
}

class ImageLoader extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      imgSrc: '',
      isModalOpen: false,
      image: null,
      crop: null,
    }
  }

  reset = (): void => {
    this.setState({
      imgSrc: '',
      isModalOpen: false,
      image: null,
      crop: null,
    })
  }

  onCropChange = (crop: any): void => {
    this.setState({ crop })
  }

  onImageLoaded = (image: any): false => {
    const { width: imageWidth, height: imageHeight } = image
    const { aspect } = this.props
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

    this.setState({
      image,
      isModalOpen: true,
      crop: {
        aspect: this.props.aspect,
        unit: 'px',
        width,
        height,
        x,
        y,
      },
    })

    return false
  }

  cancel = (): void => {
    this.setState({ isModalOpen: false })
    this.reset()
  }

  save = (): void => {
    const {
      crop: { width: cropWidth, height: cropHeight },
    } = this.state

    let base64EncodedImage: string

    if (cropWidth && cropHeight) {
      base64EncodedImage = this.getCroppedImg()
    } else {
      base64EncodedImage = this.getUncroppedImg()
    }

    this.props.handleSave(base64EncodedImage)
    this.reset()
  }

  onComplete = (crop: any): void => {
    this.setState({ crop })
  }

  getCroppedImg = (): string => {
    const { image, crop } = this.state
    const { circularCrop } = this.props

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const canvas = document.createElement('canvas')
    canvas.width = crop.width
    canvas.height = crop.height

    const ctx = canvas.getContext('2d')

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

  getUncroppedImg = (): string => {
    const { imgSrc } = this.state

    const image = document.createElement('img')
    image.src = imgSrc

    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)

    return canvas.toDataURL()
  }

  onDropAccepted = (files: any): void => {
    const file = files[0]

    const reader = new FileReader()

    reader.onload = (e2): void => {
      this.setState({
        imgSrc: e2.target.result,
        isModalOpen: true,
      })
    }

    reader.readAsDataURL(file)
  }

  renderCroppingModal = (): JSX.Element => {
    const { isModalOpen, imgSrc, crop } = this.state
    const { circularCrop, keepCropSelection, maxDimension } = this.props

    return (
      <>
        {isModalOpen && (
          <Modal
            submitText="Submit"
            cancelText="Cancel"
            onSubmit={this.save}
            onCancel={this.cancel}
          >
            <ReactCrop
              circularCrop={circularCrop}
              minHeight={50}
              minWidth={50}
              src={imgSrc}
              onComplete={this.onComplete}
              onImageLoaded={this.onImageLoaded}
              onChange={this.onCropChange}
              crop={crop}
              keepSelection={keepCropSelection}
              imageStyle={{
                maxWidth: `${maxDimension}px`,
                maxHeight: `${maxDimension}px`,
              }}
              style={{ margin: '0 left' }}
            />
          </Modal>
        )}
      </>
    )
  }

  render(): JSX.Element {
    const { uploading, uploadedImageSrc, previewWidth } = this.props

    if (uploading) {
      return (
        <LoaderWrapper>
          <UploadingWrapper>
            <PulseLoader repeat={true}>
              <UploadFlat width={32} fill="#39C3E6" />
            </PulseLoader>
            <p>Uploading...</p>
          </UploadingWrapper>
        </LoaderWrapper>
      )
    }

    if (uploadedImageSrc) {
      return (
        <LoaderWrapper>
          <img
            className="file-preview"
            src={uploadedImageSrc}
            width={previewWidth}
            alt="file preview"
          />
          <Dropzone
            accept={strategyMap[FileType.Image].mimeType}
            onDropAccepted={this.onDropAccepted}
            style={DropZoneStyles}
          >
            <button type="button">
              {strategyMap[FileType.Image].replaceButtonText}
            </button>
          </Dropzone>
          {this.renderCroppingModal()}
        </LoaderWrapper>
      )
    }

    return (
      <LoaderWrapper>
        <Dropzone
          accept="image/*"
          onDropAccepted={this.onDropAccepted}
          style={DropZoneStyles}
        >
          <PulseLoader repeat={false}>
            <UploadFlat width={32} fill="#39C3E6" />
          </PulseLoader>
          <p className="desktop-upload-item">Drag files to upload, or</p>
          <button type="button">
            {strategyMap[FileType.Image].uploadButtonText}
          </button>
          <small>{strategyMap[FileType.Image].fileTypesText}</small>
        </Dropzone>
        {this.renderCroppingModal()}
      </LoaderWrapper>
    )
  }
}

export default ImageLoader
