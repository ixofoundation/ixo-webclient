import * as React from 'react'
import { FileContainer } from './InputFile.styles'

export interface ParentProps {
  text?: string
  imgSrc?: string
  id: string
}

export interface State {
  imgSrc: string | ArrayBuffer | null
}

export interface Callbacks {
  onChange: (event: Event) => void
}

export interface Props extends ParentProps, Callbacks {}

export default class InputFile extends React.Component<Props, State> {
  state = {
    imgSrc: '',
  }

  handleChange = (e: any): void => {
    e.preventDefault()
    this.props.onChange(e)
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onloadend = (): void => {
      this.setState({
        imgSrc: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  render(): JSX.Element {
    const { imgSrc } = this.state
    let imgPreview = null
    if (imgSrc) {
      imgPreview = <img src={imgSrc} alt='inputFileImg' />
    }
    return (
      <FileContainer className='custom-file'>
        <input className='custom-file-input' id={this.props.id} type='file' onChange={this.handleChange} />
        <label className='custom-file-label' htmlFor={this.props.id}>
          {this.props.text}
        </label>
        {imgPreview}
      </FileContainer>
    )
  }
}
