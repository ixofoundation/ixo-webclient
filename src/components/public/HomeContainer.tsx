import * as React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../common/ModalWrapper';
// import { deviceWidth } from '../../lib/commonData';

const Container = styled.div`

`;

export interface ParentProps {
	projectDid: string;
}

export interface Props extends ParentProps { }

export class HomeContainer extends React.Component<Props> {
	state = {
		isModalOpen: true,
		name: '',
		email: '',
		success: false,
	};

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const onboardItem = {
			name: this.state.name,
			email: this.state.email
		}
		console.log(onboardItem)
	}
	renderSuccess() {
		return (
			<div>
				<p><strong>Your info has been submitted successfully.</strong></p>
				<p>The ixo support team will be in contact with you shortly.</p>
			</div>
		)
	}

	renderForm() {
		if (this.state.success) {
			{ this.renderSuccess }
		} else {
			<form onSubmit={this.handleSubmit}>
				<label>Name</label>
				<input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
				<label>Email</label>
				<input type="email" name="email" onChange={this.handleChange} value={this.state.email} />
			</form>
		}
	}

	render() {
		return (
			<Container className="container-fluid text-white">
				<div className="row">
					<div className="col-md-12">
						<ModalWrapper
							isModalOpen={this.state.isModalOpen}

						>
							<h5>Be the first to onboard</h5>
							{this.renderForm}
						</ModalWrapper>
					</div>
				</div>
			</Container>
		);
	}
}