import * as React from 'react'
import styled from 'styled-components'

const FileContainer = styled.div`
  & img {
    max-width: 200px;
    max-height: 80px;
    margin: 10px 0 0;
    padding-bottom: 15px;
  }

  & .custom-file-label {
    border-radius: 0;
  }

  & .custom-file-label::after {
    background: ${/* eslint-disable-line*/ props => props.theme.bgMain};
    border-radius: 0;
    color: white;
    text-transform: uppercase;
    border: 0;
    font-size: 0.7em;
    height: 38px;
    top: -1px;
    right: -1px;
    display: flex;
    align-items: center;
  }
`
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

  handleChange = (e): void => {
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
      imgPreview = <img src={imgSrc} />
    }
    return (
      <FileContainer className="custom-file">
        <input
          className="custom-file-input"
          id={this.props.id}
          type="file"
          onChange={this.handleChange}
        />
        <label className="custom-file-label" htmlFor={this.props.id}>
          {this.props.text}
        </label>
        {imgPreview}
      </FileContainer>
    )
  }
}
