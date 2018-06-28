import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	justify-content: center;
	display: flex;
`;

const Icon = styled.div`
	font-size: 64px;
	padding-bottom: 10px;
	i:before {
		color: ${props => props.theme.bg.lightBlue};
	}
`;

const MessageText = styled.div`
	font-size: 18px;
	font-family: ${props => props.theme.fontRoboto};
	text-align: center;
`;

export interface Props {
	message: string;
	icon: string;
}

export const ClaimStatus: React.SFC<Props> = (props) => {
	return (
		<Container className="row">
			<div className="col-md-12">
				<Icon className="row d-flex justify-content-center">
					<i className={props.icon} />
				</Icon>
				<MessageText className="row d-flex justify-content-center">{props.message}</MessageText>
			</div>
		</Container>
	);
};