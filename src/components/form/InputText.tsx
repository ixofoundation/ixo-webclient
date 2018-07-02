import * as React from 'react';
import styled from 'styled-components';

const Input = styled.div`

	margin:15px 0;
	border-radius:0;
	text-transform:uppercase;

	& .input-group-text {
		background: ${props => props.theme.bgMain};
		border: 0;
		color: white;
		padding: 15px 10px;
		font-size:0.7em;
		border-radius: 0;
		width:140px;
		white-space: normal;
		justify-content:center;
	}

	& input {
		border-radius:0;
		border-left:0;
	}
`;

export interface ParentProps {
	type: string;
	text?: string;
	id: string;
	validation?: string;
}
export interface Callbacks {
	onChange: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {}

// const validateEmail = (email: string) => {
// 	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	console.log(re.test(String(email).toLowerCase()));
// 	return re.test(String(email).toLowerCase());
// };

const InputText: React.SFC<Props> = (props) => {

		return (
			<Input className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">{props.text}</span>
				</div>
				<input 
					className="form-control"
					id={props.id}
					type={props.type}
					placeholder={props.text}
					onChange={props.onChange}
					name={props.id}
					// onBlur={(event) => validateEmail(event.target.value)}
				/>
			</Input>
		);
};

export default InputText;