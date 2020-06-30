import * as React from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop/dist/ReactCrop'
import 'react-image-crop/dist/ReactCrop.css'
import Dropzone from 'react-dropzone'
import ImageUploadCircle from '../../../../assets/icons/ImageUploadCircle'
import {
  ImageContainer,
  ModalWrapper,
  DropZoneStyles,
} from './ImageUpload.styles'

export interface Props {
  imageCallback: Function
  imageWidth: number
  aspect?: number
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

class ImageUpload extends React.Component<Props, State> {
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

    this.props.imageCallback(base64EncodedImage)
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

  render(): JSX.Element {
    const { isModalOpen, imgSrc, crop } = this.state

    return (
      <div>
        <Dropzone
          accept="image/*"
          onDropAccepted={this.onDropAccepted}
          style={DropZoneStyles}
        >
          <ImageUploadCircle width={102} fill="#39C3E6" />
          Drag files to upload
          <br />
          <br />
          jpeg/png. Smaller than 2,3mb
        </Dropzone>
        <ModalWrapper style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="container">
            <div className="row">
              <ImageContainer className="col-md-12">
                <ReactCrop
                  src={imgSrc}
                  onComplete={this.onComplete}
                  onImageLoaded={this.onImageLoaded}
                  onChange={this.onCropChange}
                  crop={crop}
                  keepSelection={true}
                />
              </ImageContainer>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button onClick={(): void => this.cancel()}>Cancel</button>
              </div>
              <div className="col-md-6">
                <button onClick={(): void => this.save()}>Submit</button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      </div>
    )
  }
}

export default ImageUpload
