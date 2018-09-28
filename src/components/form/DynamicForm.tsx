import * as React    from 'react';
import TextArea      from './TextArea';
import InputText     from './InputText';
import Select from './Select';
import Radio from './Radio';
import CountrySelect from './CountrySelect';
import TemplateSelect from './TemplateSelect';
import styled from 'styled-components';
import InputImage from './InputImage';
import { FormStyles } from '../../types/models';
import { Button, ButtonTypes } from '../common/Buttons';

const SubmitStatus = styled.p`
	color:#0f8dab;
	margin-top:10px;
	text-align:center;
`;

const ButtonContainer = styled.div`
	margin-left: -20px;
	margin-right: -20px;
	margin-bottom: -25px;
	padding: 22px 34px 22px 34px;
	background: ${props => props.theme.grey};
	padding: 10px 20px;
	box-shadow: 0 2px 2px 0 rgba(0,0,0,0.18);
`;

const ReturnButton = styled.div`
	text-transform: uppercase;
	border-radius:3px;
	text-align: center;
	background: ${props => props.theme.bg.grey};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 15px;
	padding:10px 20px 10px;
	cursor: pointer;
	border: 1px solid ${props => props.theme.bg.darkButton};
	color: ${props => props.theme.bg.darkButton};
	width: 180px;
`;

const SubmitButton = styled.div`
	text-transform: uppercase;
	border-radius:3px;
	text-align: center;
	background: ${props => props.theme.bg.gradientButtonGreen};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 15px;
	padding:10px 20px 10px;
	cursor: pointer;
	color: white;
	text-decoration:none;

	i {
		font-size: 13px;
		padding-left: 10px;
	}

	i:before {
		color: ${props => props.theme.bg.grey};
	}
`;

export interface ParentProps {
	formSchema: any;
	formStyle: FormStyles;
	presetValues?: any[];
	submitText?: string;
	projectDID?: string;
}

export interface State {
	formData: any;
	submitStatus: string;
	hasError: boolean;
}

export interface Callbacks {
	handleSubmit: (formData: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

export default class DynamicForm extends React.Component<Props, State> {
	state = {
		formData: {},
		submitStatus: '',
		hasError: false
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
		console.log(this.state.formData);
		console.log(this.props.formSchema);
		// for (let field in this.props.formSchema) {
		// 	if (this.props.formSchema.hasOwnProperty(field)) {
		// 		console.log(field + ' -> ' + JSON.stringify(this.props.formSchema[field]));
		// 	}
		// }
		if (this.state.hasError === true ) {
			console.log('you lose');
		} else {
			// THIS WAS THE ONLY LINE IN THE FUNCTION BEFORE DONOVAN CAME ALONG
			// this.props.handleSubmit(this.state.formData);
		}
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

	handleRenderButtons = () => {
		if (this.props.formStyle === FormStyles.modal) {
			return <Button onClick={this.handleSubmit} type={ButtonTypes.gradient}>{this.props.submitText ? this.props.submitText : 'Submit Form'}</Button>;
		} else {
			return (
				<ButtonContainer>
					<div className="row">
						<div className="col-md-6">
							<ReturnButton onClick={() => history.back(-1)}>Back</ReturnButton>
						</div>
						<div className="col-md-6">
							<SubmitButton onClick={this.handleSubmit}>
								{this.props.submitText ? this.props.submitText : 'Submit Form'}<i className="icon-approvetick" />
							</SubmitButton>
						</div>
					</div>
				</ButtonContainer>
			);
		}
	}

	setHasError = (val: boolean) => {
			this.setState({ hasError: val});
	}

	render() {
		return (
			<form>
				<div className="form-group">
					{this.props.formSchema.map((field, i) => {
						switch (field.type) {
							case 'number':
							case 'text':
							case 'email':
								return (
									<InputText 
										formStyle={this.props.formStyle} 
										id={field.name} 
										type={field.type} 
										text={field.label} 
										key={i} 
										onChange={this.onFormValueChanged(field.name)}
										validation={field.validation}
										required={field.required}
										setHasError={(val) => this.setHasError(val)}
									/>
								);
							case 'image' :
								return <InputImage id={field.name} text={field.label} key={i} imageWidth={570} onChange={this.onFormValueChanged(field.name)}/>;
							case 'textarea' :
								return <TextArea formStyle={this.props.formStyle} id={field.name} text={field.label} key={i} onChange={this.onFormValueChanged(field.name)}/>;
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
					{this.handleRenderButtons()}
					<SubmitStatus>{this.state.submitStatus}</SubmitStatus>
				</div>
			</form>
		);
	}
}