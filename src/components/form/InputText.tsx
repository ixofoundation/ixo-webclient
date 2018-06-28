import * as React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
	font-family: ${props => props.theme.fontRoboto};
	margin:40px 0;
	border-radius:0;
	font-size: 16px;

	p {
		margin-bottom: 0;
		padding-left: 15px;
		position: relative;
		bottom: 36px;
		font-size: 15px;
		pointer-events: none;
		color: ${props => props.theme.darkGrey};
		line-height: 15px;
		font-weight: 300;
		transition: font-size 0.2s ease, bottom 0.2s ease;
	}

	input {
		padding-top: 15px;
		padding-bottom: 15px;
		border-radius: 3px;
		border:0;
		color: ${props => props.theme.darkGrey};
		background: none;
		border: 1px solid ${props => props.theme.lightGrey};
	}

	input:focus {
		background: none;
		color: ${props => props.theme.darkGrey};
		border: 1px solid ${props => props.theme.darkBlue};
	}

	input:focus ~ p, input:not(:placeholder-shown) ~ p {
		right: 15px;
		bottom: 85px;
		font-size: 15px;
		font-weight: 500; 
	}

	input::-webkit-input-placeholder { /* WebKit browsers */
		opacity:  0;
	}
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	   opacity:  0;
	}
	input::-moz-placeholder { /* Mozilla Firefox 19+ */
		opacity:  0;
	}
	input:-ms-input-placeholder { /* Internet Explorer 10+ */
		opacity:  0;
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
				<input 
					className="form-control"
					id={props.id}
					type={props.type}
					placeholder={props.text}
					onChange={props.onChange}
					name={props.id}
					// onBlur={(event) => validateEmail(event.target.value)}
				/>
				<p>{props.text}</p>
			</InputContainer>
		);
};

export default InputText;