import * as React from 'react';
import { Link } from 'react-router-dom';
import { LayoutWrapperClaims } from '../common/LayoutWrapperClaims';
import { WidgetWrapperClaims } from '../common/WidgetWrapperClaims';
import DynamicForm from '../form/DynamicForm';
import { decode as base64Decode } from 'base-64';
import { Data } from '../../types/models/project';
import styled from 'styled-components';

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

const FormProgressBar = styled.div`
	background: ${props => props.theme.bg.green};
	height: 6px;
	width: 100%;
	border-radius: 4px 4px 0px 0px;
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
	under
`;

const SubmitButton = styled.div`
	text-transform: uppercase;
	border-radius:3px;
	text-align: center;
	background: ${props => props.theme.bg.gradientButtonGreen};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 15px;
	padding:10px 20px 10px;
	cursor: pointer;
	color: white;
	text-decoration:none;
`;

const ButtonIcon = styled.i`
	font-size: 13px;
	padding-left: 10px;
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
	submitClaim: (claimData: object) => void;
	ixo?: any;
	projectData: Data;
}
export class ProjectNewClaim extends React.Component<ParentProps> {
	state = {
		fetchedFile: null
	};

	fetchFormFile = (claimFormKey: string, pdsURL: string) => {
		this.props.ixo.project.fetchPublic(claimFormKey, pdsURL).then((res: any) => {
			console.log('Fetched: ', res);
			let fileContents = base64Decode(res.data);
			this.setState({ fetchedFile: fileContents });
		});
	}

	componentDidMount() {
		this.fetchFormFile(this.props.projectData.templates.claim.form, this.props.projectData.serviceEndpoint);
	}

	handleRenderButtons = () => {
		return (
			<ButtonContainer>
				<div className="row">
					<div className="col-md-6">
						<ButtonLink to={'/'}><ReturnButton>Back</ReturnButton></ButtonLink>
					</div>
					<div className="col-md-6">
						<ButtonLink to={'/'} onClick={(claimData) => this.props.submitClaim(claimData)}>
							<SubmitButton>
								Submit Claim<ButtonIcon className="icon-approvetick" />
							</SubmitButton>
						</ButtonLink>
					</div>
				</div>
			</ButtonContainer>
		);
	}

	render() {
		const claimParsed = JSON.parse(this.state.fetchedFile);
		if (claimParsed) {
			return (
				<LayoutWrapperClaims>
					<div className="container">
						<FormProgressBar />
						<div className="row">
							<div className="col-md-12">
								<WidgetWrapperClaims>
									<h3>Form section 1</h3>
									<DividerShadow>
									<Divider />
									</DividerShadow>
									<DynamicForm formSchema={claimParsed.fields} handleSubmit={(claimData) => this.props.submitClaim(claimData)} />
								</WidgetWrapperClaims>
								{this.handleRenderButtons()}
							</div>
						</div>
					</div>
				</LayoutWrapperClaims>
			);
		}
		return null;
	}
}