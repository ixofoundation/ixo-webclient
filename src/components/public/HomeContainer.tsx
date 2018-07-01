import * as React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../common/ModalWrapper';

import { onboardJson } from '../../lib/commonData';
import DynamicForm from '../form/DynamicForm';

const Container = styled.div`

`;

const OnboardFormStyle = styled.div`
	padding: 20px;
	width: 350px;
`;
export interface ParentProps {
	projectDid: string;
}

export interface Props extends ParentProps { }

export class HomeContainer extends React.Component<Props> {
	state = {
		isModalOpen: false,
		success: false,
	};

	// handleSubmit(e: any) {
	// 	console.log(e);
	// }
	// renderSuccess() {
	// 	return (
	// 		<div>
	// 			<p><strong>Your info has been submitted successfully.</strong></p>
	// 			<p>The ixo support team will be in contact with you shortly.</p>
	// 		</div>
	// 	);
	// }
	handleToggleModal = (modalStatus: boolean) => {
		this.setState({ isModalOpen: modalStatus });
	}

	handleSubmitForm = (event: any) => {
		console.log(event);
		this.setState({
			success: true
		});
	}

	handleRenderModal = () => {
		if (this.state.success) {
			return (
				<div>
					<p>Success</p>
				</div>
			);
		} else {
			let formJson = JSON.parse(onboardJson);
			if (formJson.fields.length > 0) {
				return (
					<DynamicForm

						formSchema={formJson.fields}
						handleSubmit={this.handleSubmitForm}
						submitText={'Join Now'}
					/>
				);
			} else {
				return <p>No Template found</p>;
			}
		}
	}

	render() {
		return (
			<Container className="container-fluid text-white">
				<div className="row">
					<div className="col-md-12">
						<ModalWrapper
							isModalOpen={this.state.isModalOpen}
							handleToggleModal={(e: any) => this.handleToggleModal(e)}
						>
							<OnboardFormStyle>
								<h5>Be the first to onboard</h5>
								{this.handleRenderModal()}
							</OnboardFormStyle>
						</ModalWrapper>
						<button onClick={() => this.handleToggleModal(true)}>Become a member</button>
					</div>
				</div>
			</Container>
		);
	}
}