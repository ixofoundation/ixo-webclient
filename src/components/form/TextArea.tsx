import * as React from 'react';
import styled from 'styled-components';

const Text = styled.div`
	
	& textarea {
		border-radius:0;
	}
`;

export interface ParentProps {
	text?: string;
	id: string;
}

export interface Callbacks {
	onChange?: (event: any) => void;
}

export interface Props extends ParentProps, Callbacks {

}

const TextArea: React.SFC<Props> = (props) => {
	return (
		<Text>
			<textarea 
				id={props.id}
				className="form-control"
				placeholder={props.text}
				onChange={props.onChange}
			/>
		</Text>
	);
};

export default TextArea;