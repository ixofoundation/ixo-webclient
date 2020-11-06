import * as React from "react";
import { ImageLoader, imageQuality } from "../ImageLoader";
import {
  CloseButton,
  InputContainer,
  InputImageContainer,
} from "./InputImage.styles";

export interface ParentProps {
  id: string;
  imageWidth: number;
  text?: string;
  aspect?: number;
}
export interface Callbacks {
  onChange: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

export interface State {
  croppedImage: string | null | undefined;
}

export default class InputImage extends React.Component<Props, State> {
  state = {
    croppedImage: "",
  };

  handleImage = (base64Image: any): void => {
    this.setState({ croppedImage: base64Image });
    // make this look like an event
    this.props.onChange({ target: { value: base64Image } });
  };

  clearImage = (): void => {
    this.setState({ croppedImage: null });
    // make this look like an event
    this.props.onChange({ target: { value: null } });
  };

  render(): JSX.Element {
    if (this.state.croppedImage) {
      return (
        <InputImageContainer>
          <CloseButton onClick={this.clearImage}>&times;</CloseButton>
          <img src={this.state.croppedImage} alt="crop" />
        </InputImageContainer>
      );
    } else {
      return (
        <InputContainer>
          <ImageLoader
            quality={imageQuality.medium}
            placeholder={this.props.text}
            imageWidth={this.props.imageWidth}
            aspect={this.props.aspect}
            imageCallback={this.handleImage}
          />
        </InputContainer>
      );
    }
  }
}
