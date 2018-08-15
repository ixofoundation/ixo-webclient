import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    justify-content:center;
	align-items:center;
	flex-direction: column;
    margin-top: 10px;
	margin-bottom: 10px;
    height: 150px;
    background-color: none;
	border-radius: 3px;
	
	p {
		display: block;
	}
`;

const LoaderContainer = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
`;

const LoaderWrapper = styled.div`
	padding: 0;
	border-radius: 50%;
	animation: pulse 1.5s infinite ease;
		
	@keyframes pulse {
		0%   { padding: 0; background: rgba(73,191,224,1);}
		100% { padding: 20px; background: rgba(255,255,255,1);}
	}
`;

const LoaderInner = styled.div`

	border-radius: 50%;
	padding: 5px;
	background: ${props => props.theme.ixoBlue};

	i {
		font-size: 30px;
		display:block;
		width: 29px;
		height: 29px;
		padding: 0;
		background: #FFF;
		border-radius: 50%;
	}
	.icon-ixo-x:before {
		color: ${props => props.theme.ixoBlue};
	}
`;
export interface Props {
}

export const ImageSpinner: React.SFC<Props> = () => {
	return (
		<Container className="col-md-12">
			<LoaderContainer>
				<LoaderWrapper>
					<LoaderInner>
					<i className="icon-ixo-x" />
					</LoaderInner>
				</LoaderWrapper>
			</LoaderContainer>
			<p>Loading image...</p>
		</Container>
	);
};