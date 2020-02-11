import * as React from 'react'
import Dropzone from 'react-dropzone'
import { iconUpload } from '../../lib/commonData'

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

const styles = {
  dropzone: {
    width: '100%',
    height: '150px',
    backgroundColor: 'lightgrey',
    borderWidth: '2px',
    textAlign: 'center',
    alignVertical: 'middle',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '5px',
  },
}

export interface StateProps {
  selectedCallback: Function
  acceptType: string
  placeholder?: string
}

export interface State {
  filename: string
}

export class FileLoader extends React.Component<StateProps, State> {
  state = {
    filename: null,
  }

  onDropAccepted = (files): void => {
    const file = files[0]
    if (!file) {
      return
    }

    this.setState({ filename: file.name })
    const reader = new FileReader()

    reader.onload = (e2): void => {
      this.props.selectedCallback(e2.target.result)
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
        <Dropzone
          accept={this.props.acceptType}
          onDropAccepted={this.onDropAccepted}
          style={styles.dropzone}
        >
          <IconImage src={iconUpload()} />
          <p>
            {this.props.placeholder || 'Choose file'}
            {this.showFilename()}
          </p>
        </Dropzone>
      </div>
    )
  }
}
