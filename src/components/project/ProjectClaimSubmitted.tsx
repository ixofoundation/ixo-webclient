import * as React from 'react';
import { Link } from 'react-router-dom';
import { LayoutWrapperClaims } from '../common/LayoutWrapperClaims';
import { WidgetWrapperClaims } from '../common/WidgetWrapperClaims';
import { ClaimStatus } from '../common/ClaimStatus';
import styled from 'styled-components';

const Container = styled.div`
	justify-content: center;
	display: flex;
`; 

const Divider = styled.div`
	height: 2px;
	background: ${props => props.theme.bg.lightBlue};
	width: 36%;
	position: absolute;
	left: 15px;
`;

const DividerShadow = styled.div`
	height: 1px;
	background: ${props => props.theme.bg.lightGrey};
	width: 100%;
`;

const ButtonContainer = styled.div`
	padding: 22px 34px 22px 34px;
	background: ${props => props.theme.grey};
	padding: 10px 20px;
	box-shadow: 0 2px 2px 0 rgba(0,0,0,0.18);
`;

const ReturnButton = styled.div`
	text-transform: uppercase;
	border-radius:3px;
	text-align: center;
	background: ${props => props.theme.bg.grey};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 15px;
	padding:10px 20px 10px;
	cursor: pointer;
	border: 1px solid ${props => props.theme.bg.darkButton};
	color: ${props => props.theme.bg.darkButton};
`;

const EvaluateMoreButton = styled.div`
	text-transform: uppercase;
	border-radius:3px;
	text-align: center;
	background: ${props => props.theme.bg.gradientDarkBlue};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 15px;
	padding:10px 20px 10px;
	cursor: pointer;
	color: white;
	text-decoration:none;
`;

const ButtonIconLeft = styled.i`
	font-size: 13px;
	padding-right: 10px;
	i:before {
		color: ${props => props.theme.bg.grey};
	}
`;

const ButtonLink = styled(Link)`
	:hover {
		text-decoration: none;
	}
`;

export interface ParentProps {
	projectDid: string;
}

const message: string = 'Your form has been successfully submitted and is awaiting evaluation. Please check back soon';

export const ProjectClaimSubmitted: React.SFC<ParentProps> = (props) => {
	const handleRenderButtons = () => {
		return (
			<ButtonContainer>
				<div className="row">
					<div className="col-md-6">
						<ButtonLink to={{ pathname: `/projects/${props.projectDid}/detail/new-claim/`, state: { resetForm: true } }} >
							<EvaluateMoreButton>
								<ButtonIconLeft className="icon-plus" />Submit another claim
							</EvaluateMoreButton>
						</ButtonLink>
						{/* <a href={'www.google.com'}>
							<EvaluateMoreButton>
								<ButtonIconLeft className="icon-plus" />Submit another claim
							</EvaluateMoreButton>
						</a> */}
					</div>
					<div className="col-md-6">
						<ButtonLink to={`/projects/${props.projectDid}/overview`}><ReturnButton>Return to project</ReturnButton></ButtonLink>
					</div>
				</div>
			</ButtonContainer>
		);
	};

	return (
		<LayoutWrapperClaims>
			<Container className="row">
				<div className="col-md-6">
					<WidgetWrapperClaims>
						<h3>Claim successfully submitted</h3>
						<DividerShadow>
							<Divider />
						</DividerShadow>
						<p style={{ padding: '50px' }}><ClaimStatus message={message} icon={'icon-approved'} /></p>
					</WidgetWrapperClaims>
					{handleRenderButtons()}
				</div>
			</Container>
		</LayoutWrapperClaims>
	);
};