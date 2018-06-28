import * as React from 'react';
import styled from 'styled-components';
import { FormStyles } from '../../types/models';

const InputContainer = styled.div`
	font-family: ${props => props.theme.fontRoboto};
	border-radius:0;
	
	p {
		margin-bottom: 0;
		position: relative;
		pointer-events: none;
		line-height: 15px;
		font-weight: 300;
	}
	
	input {
		border:0;
		background: none;
	}
	
	input:focus {
		background: none;
	}

	input:focus ~ p, input:not(:placeholder-shown) ~ p {
		bottom: 85px;
		font-weight: 500; 
	}

	.modal-input {
		margin:20px 0;
		font-size: 15px;

		input {
			color: white;
			border-bottom: 1px solid ${props => props.theme.fontDarkBlueButtonHover};
		}

		input:focus {
			color: white;
			border-bottom: 1px solid #5AB946;
		}

		input:focus ~ p, input:not(:placeholder-shown) ~ p {
			bottom: 50px;
			font-size: 11px; 
		}

		p {
			bottom: 23px;
			color: #83D9F2;
			transition: font-size 0.2s ease, bottom 0.2s ease;
		}
	}
	
	.standard-input {
		margin:40px 0;
		font-size: 16px;
		text-transform:uppercase;

		input {
			color: ${props => props.theme.darkGrey};
			border: 1px solid ${props => props.theme.lightGrey};
			padding-top: 15px;
			padding-bottom: 15px;
			border-radius: 3px;
	
		}

		input:focus {
			color: ${props => props.theme.darkGrey};
			border: 1px solid ${props => props.theme.darkBlue};
		}

		input:focus ~ p, input:not(:placeholder-shown) ~ p {
			bottom: 85px;
			font-size: 11px;
			font-weight: 500;
			padding-left: 0;
		}

		p {
			bottom: 36px;
			color: ${props => props.theme.darkGrey};
			padding-left: 15px;

			transition: padding-left 0.2s ease, bottom 0.2s ease, font-size 0.2s ease;
		}
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
	id: string;
	formStyle: FormStyles;
	text?: string;
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
				<div className={`${(props.formStyle).toLowerCase()}-input`}>
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
				</div>
			</InputContainer>
		);
};

export default InputText;