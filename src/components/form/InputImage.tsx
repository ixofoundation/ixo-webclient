import * as React from 'react';
import styled from 'styled-components';
import { ImageLoader } from '../common/ImageLoader';

const InputContainer = styled.div`
	font-family: ${props => props.theme.fontRoboto};
	margin:20px 0;
	border-radius:0;
	text-transform:uppercase;
`;

const InputImageContainer = InputContainer.extend`
	display: inline-block;
	position: relative;
`;

const CloseButton = styled.button`
	color: blaxk;
	background: none;
	border: 0;
	right: 0px;
	font-size: 40px;
	line-height: 1;
	cursor: pointer;
	font-weight: 100;
	position: absolute;
`;

export interface ParentProps {
	id: string;
	imageWidth: number;
	text?: string;
	aspect?: number;
}
export interface Callbacks {
	onChange?: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

export interface State {
	croppedImage: string;
}

export default class InputImage extends React.Component<Props, State> {
	state = {
		croppedImage: null
	};

	handleImage = (base64Image) => {
		this.setState({croppedImage: base64Image });
		// make this look like an event
		this.props.onChange({target: {value: base64Image}});
	}

	clearImage = () => {
		this.setState({croppedImage: null});
		// make this look like an event
		this.props.onChange({target: {value: null}});
	}
	
	render() {
		if (this.state.croppedImage) {
			return (
				<InputImageContainer>
					<CloseButton onClick={this.clearImage} >&times;</CloseButton>
					<img src={this.state.croppedImage} />
				</InputImageContainer>
			);
		} else {
			return (
				<InputContainer>
					<ImageLoader placeholder={this.props.text} imageWidth={this.props.imageWidth} aspect={this.props.aspect} imageCallback={this.handleImage}/>
				</InputContainer>
			);
		}
	}
}
