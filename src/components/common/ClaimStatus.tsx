import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	justify-content: center;
	display: flex;
`;

const Icon = styled.i`
	font-size: 64px;
	color: ${props => props.theme.bg.lightBlue};
`;

const MessageText = styled.div`
	font-size: 18px;
	font-family: ${props => props.theme.fontRoboto};
`;

export interface Props {
	message: string;
	icon: string;
}

export const ClaimStatus: React.SFC<Props> = (props) => {
	return (
		<Container className="row">
			<div className="col-md-4">
				<div className="row d-flex justify-content-center">
					<Icon className={props.icon} />
				</div>
				<MessageText className="row d-flex justify-content-center">{props.message}</MessageText>
			</div>
		</Container>
	);
};