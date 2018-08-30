import * as React from 'react';
import QRCode from 'qrcode';

export interface ParentProps {
	url: string;
}

export default class QRComponent extends React.Component<ParentProps> {

	state = {
		imgSrc: null
	};

	componentDidMount() {
		
		QRCode.toDataURL('I am a pony!')
		.then(url => {
			console.log(url);
			this.setState({ imgSrc: url});
		})
		.catch(err => {
			console.error(err);
		});
	}

	render() {
		return (
			<img style={{width: '100px', height: '100px'}}src={this.state.imgSrc} />
		);
	}
}