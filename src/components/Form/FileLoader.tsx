import * as React from 'react'
// @ts-ignore
import Dropzone from 'react-dropzone'

import styled from 'styled-components'

/*
Creates a dropzone to drop or select files.

Parameters:
	fileUrl: The callback function that is called when an image is selected it gets a base64encoded image file
	placeholder?: (Optional) This is the text to be displayed under the upload-icon. Default: "Choose file"

Example:
	<FileLoader placeholder="Choose a file" value={this.state.fileUrl} />

*/

const IconImage = styled.img`
  padding: 3px;
  margin-top: 10px;
`

const StyledDropZone = styled(Dropzone)`
  width: 100%;
  height: 150px;
  background-color: lightgrey;
  border-width: 2px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
`

export interface StateProps {
  selectedCallback: (a: any) => void
  acceptType: string
  placeholder?: string
}

export interface State {
  filename: string | null
}

export class FileLoader extends React.Component<StateProps, State> {
  state = {
    filename: null,
  }

  onDropAccepted = (files: any): void => {
    const file = files[0]
    if (!file) {
      return
    }

    this.setState({ filename: file.name })
    const reader = new FileReader()

    reader.onload = (e2): void => {
      this.props.selectedCallback(e2?.target?.result)
    }

    reader.readAsDataURL(file)
  }

  showFilename = (): string => {
    if (this.state.filename !== null) {
      return ': "' + this.state.filename + '"'
    }
    return ''
  }

  render(): JSX.Element {
    return (
      <div>
        <StyledDropZone
          // accept={this.props.acceptType}
          onDropAccepted={this.onDropAccepted}
          // style={styles.dropzone}
        >
          {({ getRootProps, getInputProps }): JSX.Element => (
            <div
              {...getRootProps({
                className: 'dropzone',
                onDrop: (event) => event.stopPropagation(),
              })}
            >
              <input {...getInputProps()} />
              <IconImage src={require('assets/images/icon-upload.svg')} />
              <p>
                {this.props.placeholder || 'Choose file'}
                {this.showFilename()}
              </p>
            </div>
          )}
        </StyledDropZone>
      </div>
    )
  }
}
