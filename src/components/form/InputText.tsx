import * as React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`

	margin:15px 0;
	border-radius:0;
	text-transform:uppercase;

	p {
		color: ${props => props.theme.fontLightBlue};
		margin-bottom: 0;
		
	}

	& input {
		border-radius:0;
		border:0;
		background: none;
		border-bottom: 1px solid ${props => props.theme.fontDarkBlueButtonHover};
	}

	& input:focus {
		background: none;
		border-bottom: 1px solid #5AB946;
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
			<InputContainer>
				<p>{props.text}</p>
				<input 
					className="form-control"
					id={props.id}
					type={props.type}
					// placeholder={props.text}
					onChange={props.onChange}
					name={props.id}
					// onBlur={(event) => validateEmail(event.target.value)}
				/>
			</InputContainer>
		);
};

export default InputText;