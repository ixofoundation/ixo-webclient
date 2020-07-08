import * as React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop/dist/ReactCrop'
import 'react-image-crop/dist/ReactCrop.css'
import Dropzone from 'react-dropzone'
import {
  ModalWrapper,
  ImageLoaderWrapper,
  UploadingWrapper,
  DropZoneStyles,
} from './ImageLoader.styles'
import UploadFlat from 'src/assets/icons/UploadFlat'
import UploadCamera from 'src/assets/icons/UploadCamera'

export interface Props {
  uploading: boolean
  uploadedImageSrc: string
  imageWidth: number
  aspect?: number
  handleSave: (base64EncodedImage: string) => void
}

export interface State {
  imgSrc: string | ArrayBuffer | null
  isModalOpen: boolean
  image: any
  crop: any
  pixelCrop: any
}

const initialState = {
  imgSrc: '',
  isModalOpen: false,
  image: null,
  crop: ReactCrop.defaultCrop,
  pixelCrop: null,
}

class ImageLoader extends React.Component<Props, State> {
  state = initialState

  reset = (): void => {
    this.setState(initialState)
  }

  onCropChange = (crop): void => {
    const { aspect } = this.props

    if (aspect) {
      crop.aspect = aspect
    }

    this.setState({ crop })
  }

  onImageLoaded = (image): void => {
    const { aspect } = this.props
    const { width, height } = image
    let crop = {}

    if (aspect) {
      crop = makeAspectCrop(
        {
          x: 0,
          y: 0,
          aspect,
          width,
        },
        width / height,
      )
    } else {
      crop = { width, height }
    }

    this.setState({
      crop,
      image,
      isModalOpen: true,
    })
  }

  cancel = (): void => {
    this.setState({ isModalOpen: false })
    this.reset()
  }

  save = (): void => {
    const { image, pixelCrop } = this.state
    let base64EncodedImage: string

    if (pixelCrop != null) {
      base64EncodedImage = this.getCroppedImg(image, pixelCrop)
    } else {
      base64EncodedImage = this.getUncroppedImg(image)
    }

    this.props.handleSave(base64EncodedImage)
    this.reset()
  }

  onComplete = (crop, pixelCrop): void => {
    this.setState({ crop, pixelCrop })
  }

  getCroppedImg = (image, pixelCrop): string => {
    const { imageWidth } = this.props
    const canvas = document.createElement('canvas')
    const aspect = pixelCrop.width / pixelCrop.height
    const imageHeight = imageWidth / aspect
    canvas.width = imageWidth
    canvas.height = imageHeight
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      imageWidth,
      imageHeight,
    )

    return canvas.toDataURL()
  }

  getUncroppedImg = (image): string => {
    const { imageWidth } = this.props
    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    img.src = this.state.imgSrc
    const aspect = image.width / image.height
    const imageHeight = imageWidth / aspect
    canvas.width = imageWidth
    canvas.height = imageHeight
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      imageWidth,
      imageHeight,
    )

    return canvas.toDataURL()
  }

  onDropAccepted = (files): void => {
    const file = files[0]
    if (!file || !/^image\//.test(file.type)) {
      return
    }
    const reader = new FileReader()

    reader.onload = (e2): void => {
      this.setState({
        imgSrc: e2.target.result,
        isModalOpen: true,
      })
    }

    reader.readAsDataURL(file)
  }

  renderCroppingModal = (isModalOpen, imgSrc, crop): JSX.Element => {
    return (
      <ModalWrapper style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div>
          <ReactCrop
            src={imgSrc}
            onComplete={this.onComplete}
            onImageLoaded={this.onImageLoaded}
            onChange={this.onCropChange}
            crop={crop}
            keepSelection={true}
          />
        </div>
        <div className="button-wrapper">
          <button onClick={(): void => this.cancel()}>Cancel</button>
          <button className="submit" onClick={(): void => this.save()}>
            Submit
          </button>
        </div>
      </ModalWrapper>
    )
  }

  render(): JSX.Element {
    const { isModalOpen, imgSrc, crop } = this.state
    const { uploading, uploadedImageSrc } = this.props

    if (uploading) {
      return (
        <ImageLoaderWrapper>
          <UploadingWrapper>
            <div className="icon-pulse-wrapper repeat mobile-upload-item">
              <UploadCamera width={32} fill="#39C3E6" />
            </div>
            <div className="icon-pulse-wrapper repeat desktop-upload-item">
              <UploadFlat width={32} fill="#39C3E6" />
            </div>
            <p>Uploading...</p>
          </UploadingWrapper>
        </ImageLoaderWrapper>
      )
    }

    if (uploadedImageSrc) {
      return (
        <ImageLoaderWrapper>
          <img className="image-example" src={uploadedImageSrc} />
          <Dropzone
            accept="image/*"
            onDropAccepted={this.onDropAccepted}
            style={DropZoneStyles}
          >
            <button>Update Image</button>
          </Dropzone>
          {this.renderCroppingModal(isModalOpen, imgSrc, crop)}
        </ImageLoaderWrapper>
      )
    }

    return (
      <ImageLoaderWrapper>
        <Dropzone
          accept="image/*"
          onDropAccepted={this.onDropAccepted}
          style={DropZoneStyles}
        >
          <div className="icon-wrapper mobile-upload-item">
            <UploadCamera width={32} fill="#39C3E6" />
          </div>
          <div className="icon-wrapper desktop-upload-item">
            <UploadFlat width={32} fill="#39C3E6" />
          </div>
          <p className="desktop-upload-item">Drag files to upload, or</p>
          <p className="mobile-upload-item">Take a photo, or</p>
          <button>Choose an image</button>
          <small>jpeg/png. Smaller than 2,3mb</small>
        </Dropzone>
        {this.renderCroppingModal(isModalOpen, imgSrc, crop)}
      </ImageLoaderWrapper>
    )
  }
}

export default ImageLoader
