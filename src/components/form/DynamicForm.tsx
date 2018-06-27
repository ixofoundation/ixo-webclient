import * as React    from 'react';
import TextArea      from './TextArea';
import InputFile     from './InputFile';
import InputText     from './InputText';
import Select from './Select';
import Radio from './Radio';
import CountrySelect from './CountrySelect';
import TemplateSelect from './TemplateSelect';
import styled from 'styled-components';
import { Button, ButtonTypes } from '../common/Buttons';

const SubmitStatus = styled.p`
	color:#0f8dab;
	margin-top:10px;
	text-align:center;
`;  

export interface ParentProps {
	formSchema: any;
	presetValues?: any[];
	submitText?: string;
}

export interface State {
	formData: any;
	submitStatus: string;
}

export interface Callbacks {
	handleSubmit: (formData: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

export default class DynamicForm extends React.Component<Props, State> {
	state = {
		formData: {},
		submitStatus: ''
	};

	componentWillMount() {

		let hiddenCount = 0;
		this.props.formSchema.map((field, i) => {
			if (field.hidden) {
				this.setFormState(field.name, this.props.presetValues[hiddenCount]);
				hiddenCount++;
			} else {
				this.setFormState(field.name, '');
			}
		});
	}

	handleSubmit = (event) => {
		this.props.handleSubmit(this.state.formData);
	}

	setFormState = (name: String, value: any) => {
		const fields = name.split('.');
		let formData = this.state.formData;
		fields.forEach((field, index) => {
			if (index === fields.length - 1 ) {
				formData[field] = value;
			} else {
				if (!formData[field]) {
					formData[field] = {};
				}
				formData = formData[field];
			}
		});
		this.setState({formData: formData});
	}

	onFormValueChanged = (name: String) => {
		return (event) => {
			this.setFormState(name, event.target.value);
		};
	}

	render() {
		return (
			<form>
				<div className="form-group">
					{this.props.formSchema.map((field, i) => {
						switch (field.type) {
							case 'number':
							case 'text':
							return <InputText id={field.name} type={field.type} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							case 'email':
								return <InputText id={field.name} type={field.type} text={field.label} validation={field.validation} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							case 'image' :
								return <InputFile id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							case 'textarea' :
								return <TextArea id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							case 'select':
								return <Select id={field.name} options={field.options} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							case 'country':
								return <CountrySelect id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							case 'template':
								return <TemplateSelect id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							case 'radio':
								return <Radio id={field.name} options={field.options} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
							default:
								return <p>Type not found</p>;
						}
					})}
					<Button onClick={this.handleSubmit} type={ButtonTypes.gradient}>{this.props.submitText ? this.props.submitText : 'Submit Form'}</Button> 
					<SubmitStatus>{this.state.submitStatus}</SubmitStatus>
				</div>
			</form>
		);
	}
}