import * as React from 'react';
import styled from 'styled-components';
import { formJson } from '../../lib/commonData';
import DynamicForm from '../form/DynamicForm';

const Text = styled.textarea`
	margin: 20px 0;
	display: block;
	width: 100%;
	height: 300px;
`;

const Container = styled.div`
	button {
		margin: 0 10px 10px 10px;
	}
`;

export interface State {
	formJson: any;
}	
export class ProjectForm extends React.Component<{}, State> {

	state = {
		formJson: formJson.fields,
	};

	handleJSONChange = (event: any) => {
		this.setState({formJson: JSON.parse(event.target.value)});
		this.handleRenderForm();
	}

	handleSubmitForm = (event: any) => {
		console.log(event);
	}

	handleRenderForm = () => {
		if (formJson.fields.length > 0) {
			return <DynamicForm formSchema={this.state.formJson} handleSubmit={this.handleSubmitForm} />;
		} else {
			return <p>No Template found</p>;
		}
	}

	render() {
		return (
			<div>
				<Container className="container">
					<div className="row">
						<div className="col-md-12">
							<Text value={JSON.stringify(this.state.formJson)} onChange={this.handleJSONChange} />
							{this.handleRenderForm()}
							<button onClick={this.handleSubmitForm}>CREATE PROJECT</button>
						</div>
					</div>
				</Container>
			</div>
		); 
	}
}