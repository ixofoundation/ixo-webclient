import * as React from 'react';
import styled from 'styled-components';

const Input = styled.div`

margin:15px 0;
border-radius:0;
text-transform:uppercase;
& {align-items:center;}

& .input-group-text {
	background: ${props => props.theme.bgMain};
	border: 0;
	color: white;
	padding: 15px 10px;
	font-size:0.7em;
	border-radius: 0;
	width:140px;
	white-space:normal;
	justify-content:center;
}

& select {
	height: 50px;
	border-left: 0;
	border-radius: 0;
}
`;
export interface ParentProps {
	text?: string;
	id: string;
	options?: any;
}

export interface Callbacks {
	onChange: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {

}

export default class Select extends React.Component<Props> {

	generateSelect = () => {
		return this.props.options.map((option, index) => {
			return <option key={index} value={option.value}>{option.label}</option>;
		});
	}

	render() {

		return (
			<Input className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">{this.props.text}</span>
				</div>
				<select defaultValue="default" className="custom-select" id={this.props.id} onChange={this.props.onChange}>
					<option value="default" disabled={true}>Please choose a {this.props.text}</option>
					{this.generateSelect()}
				</select>
			</Input>
		);
	}
}