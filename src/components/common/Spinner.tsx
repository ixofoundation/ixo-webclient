import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content:center;
	align-items:center;
	flex-direction: column;
	background-color: ${props => props.theme.bg.blue};
	flex:1 1 auto;
	p {
		color: ${props => props.theme.ixoBlue}
	}
`;

const LoaderContainer = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
`;

const LoaderWrapper = styled.div`
	background: ${props => props.theme.ixoBlue};
	padding: 0;
	border-radius: 50%;
	animation: pulse 1.5s infinite ease;
		
	@keyframes pulse {
		0%   { padding: 0; background: rgba(0,210,255,1);}
		100% { padding: 20px; background: rgba(0,34,51,1);}
	}
`;

const LoaderInner = styled.div`

	border-radius: 50%;
	padding: 5px;
	background: ${props => props.theme.ixoBlue};

	i {
		font-size: 54px;
		display:block;
		width: 29px;
		height: 29px;
		padding: 0;
		background: ${props => props.theme.bg.blue};
		border-radius: 50%;
	}
	.icon-ixo-x:before {
		color: ${props => props.theme.ixoBlue};
		position: relative;
		top: -13px;
		left: -12px;
	}
`;
export interface Props {
	info: string;
}

export const Spinner: React.SFC<Props> = ({info}) => {
	return (
		<Container>
			<LoaderContainer>
				<LoaderWrapper>
					<LoaderInner>
					<i className="icon-ixo-x" />
					</LoaderInner>
				</LoaderWrapper>
			</LoaderContainer>
			<p>{info}</p>
		</Container>
	);
};