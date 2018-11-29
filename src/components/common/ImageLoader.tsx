import * as React from 'react';
import { ModalWrapper } from './ModalWrapper';
import ReactCrop, { makeAspectCrop } from 'react-image-crop/dist/ReactCrop';
import 'react-image-crop/dist/ReactCrop.css';
import Dropzone from 'react-dropzone'; 
import { iconUpload } from '../../lib/commonData';
import { Button, ButtonTypes } from './Buttons';

import styled from 'styled-components';

/*
Creates a dropzone to drop or select images. It then allows for cropping of image based on parameters

Parameters:
	imageCallback: The callback function that is called when an image is selected it gets a base64encoded image file
	imageWidth: The width in pixels of the resultant image file
	aspect?: (Optional) If set is forces the aspect ratio (width/height) of the resultant image
	placeholder?: (Optional) This is the text to be displayed under the upload-icon. Default: "Choose file"

Example:
	<ImageLoader placeholder="Choose a project image file" imageWidth={960} aspect={16 / 9} imageCallback={this.handleImage}/>

	This creates the dropzone to drop or select an image the aspect ratio is forced to be (16 / 9) and the 
	resultant image will be scaled to width 960px

	When an image is selected the handleImage(base64Image) function is called.

*/
const ImageContainer = styled.div`
	height: 400px;
	align: center;
	margin-bottom: 5px;
`;

const OverviewContainer = styled.div`
	background: ${props => props.theme.bg.ixoBlue};
`;

const IconImage = styled.img`
	padding: 3px;
	margin-top: 10px;
`;

const styles = {
	dropzone: {
		width: '100%',
		height: '150px',
		backgroundColor: 'lightgrey',
		color: 'black',
		borderWidth: '2px',
		textAlign: 'center',
		alignVertical: 'middle',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		borderRadius: '5px',
	}
};

const imageType = /^image\//;

export enum imageQuality {
	medium = 'LOW',
	high = 'HIGH',
}
export interface StateProps {
	imageCallback: Function;
	imageWidth: number;
	aspect?: number;
	placeholder?: string;
	quality: imageQuality;
}

export interface State {
	projectImgSrc: string;
	isModalOpen: boolean;
	image: any;
	crop: any;
	pixelCrop: any;
	filename: string;
}	

export class ImageLoader extends React.Component<StateProps, State> {

	state = {
			filename: null,
			projectImgSrc: '',
			isModalOpen: false,
			image: null,
			crop: ReactCrop.defaultCrop,
			pixelCrop: null,
	};

	reset = () => {
		this.setState({
			projectImgSrc: '',
			isModalOpen: false,
			image: null,
			crop: ReactCrop.defaultCrop,
			pixelCrop: null,
		});
	}

	onCropChange = (crop) => {
		if (this.props.aspect) {
			crop.aspect = this.props.aspect;
		}
		this.setState({ crop: crop });
	}

	onImageLoaded = (image) => {
		let crop = {};
		if (this.props.aspect) {
			crop = makeAspectCrop(
				{
					x: 0,
					y: 0,
					aspect: this.props.aspect,
					width: 50,
				}, 
				image.width / image.height);
		}
		this.setState({
			crop: crop,
			image: image,
			isModalOpen: true,
		});
	}

	cancel = () => {
		this.setState({isModalOpen: false});
		this.reset();
	}

	save = () => {
		let base64EncodedImage: string;
		if (this.state.pixelCrop != null) {
			base64EncodedImage = this.getCroppedImg(this.state.image, this.state.pixelCrop);
		} else {
			base64EncodedImage = this.getUncroppedImg(this.state.image);
		}
		this.props.imageCallback(base64EncodedImage);
		this.reset();
	}

	onComplete = (crop, pixelCrop) => {
		this.setState({crop: crop, pixelCrop: pixelCrop});
	}

	getCroppedImg = (image, pixelCrop) => {
		const canvas = document.createElement('canvas');
		let aspect = pixelCrop.width / pixelCrop.height;
		let imageHeight = this.props.imageWidth / aspect;

		canvas.width = this.props.imageWidth;
		canvas.height = imageHeight;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			this.props.imageWidth,
			imageHeight
		);

		if (this.props.quality === imageQuality.high) {
			return canvas.toDataURL();
		} else {
			return canvas.toDataURL('image/jpeg', 0.9);
		}
	}	

	getUncroppedImg = (image) => {
		const canvas = document.createElement('canvas');
		const img = document.createElement('img');
		img.src = this.state.projectImgSrc;
		let aspect = image.width / image.height;
		let imageHeight = this.props.imageWidth / aspect;

		canvas.width = this.props.imageWidth;
		canvas.height = imageHeight;
		const ctx = canvas.getContext('2d');
		console.log('width: ' + image.width + ' height: ' + image.height);
		console.log('crop.width: ' + this.state.crop.width + ' crop.height: ' + this.state.crop.height);

		ctx.drawImage(
			img,
			0,
			0,
			img.width,
			img.height,
			0,
			0,
			this.props.imageWidth,
			imageHeight
		);

		// As Base64 string
		return canvas.toDataURL();
	}	

	onDropAccepted = (files) => {
		let file = files[0];
		if (!file || !imageType.test(file.type)) {
			return;
		}
		this.setState({filename: file.name});
		const reader = new FileReader();
	
		reader.onload = (e2) => {
			// @ts-ignore
			this.setState({ projectImgSrc: e2.target.result, isModalOpen: true });
		};
	
		reader.readAsDataURL(file);

	}

	showFilename = () => {
		if (this.state.filename !== null) {
			return ': "' + this.state.filename + '"';
		}
		return '';
	}

	render() {
		return (
			<div>
				<Dropzone accept="image/*" onDropAccepted={this.onDropAccepted} style={styles.dropzone} >
					<IconImage src={iconUpload()} />
					<p>{this.props.placeholder || 'Choose file'}{this.showFilename()}</p>
				</Dropzone>
				<ModalWrapper
					isModalOpen={this.state.isModalOpen}
					handleToggleModal={() => this.cancel()}
				>
					<OverviewContainer className="container">
						<div className="row">
							<ImageContainer className="col-md-12">
								<ReactCrop src={this.state.projectImgSrc} onComplete={this.onComplete} onImageLoaded={this.onImageLoaded} onChange={this.onCropChange} crop={this.state.crop} />
							</ImageContainer>
						</div>
						<div className="row">
							<div className="col-md-6">
								<Button type={ButtonTypes.dark} onClick={() => this.cancel()}>Cancel</Button>
							</div>
							<div className="col-md-6">
								<Button type={ButtonTypes.dark} onClick={() => this.save()}>Submit</Button>
							</div>
						</div>
					</OverviewContainer>
				</ModalWrapper>
			</div>
		);
	}
}
