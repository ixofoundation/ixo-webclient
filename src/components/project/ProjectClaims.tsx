import * as React from 'react';
import { Link } from 'react-router-dom';
import { LayoutWrapper } from '../common/LayoutWrapper';
import { WidgetWrapper } from '../common/WidgetWrapper';
import styled from 'styled-components';
import { Fragment } from 'react';
const Section = styled.section`

	padding-bottom: 30px;
	border-bottom: 1px solid #164A63;
	margin-bottom: 30px;
	
	h2 {
		color: white;
		font-size: 30px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 20px;

		i {
			font-size: 25px;
			margin-right: 10px;
		}

		i.icon-pending:before {
			color: #F89D28;
		}
		i.icon-approved:before {
			color: #5AB946;
		}
		i.icon-rejected:before {
			color: #E2223B;
		}
	}
`;

const Indicator = styled.div`
	width: 7px;
	height: 25px;
	position: absolute;
	top:18px;
	left:-7px;

	background: ${props => props.color};

`;

const Mail = styled.a`
`;

const Col = styled.div`

	font-size: 15px;
	font-weight: 300;

	a {
		color: white;
		text-decoration: none;
	}
	
	${Mail} {
		color: #5094ac;
		text-decoration:none;
		display:block;
	}

	p {
		margin:0;
	}

	${Mail}:hover {
		color:white;
		font-weight: 600;
	}

	> a > div {
		position: relative;
		margin: 8px 0;
	}

`;

const ClaimsWidget = styled.div`
	margin: 20px 0;
	
`;	

const ListItemWrapper = styled.div`
	background: #002d42;
	position: relative;
	margin-bottom: 10px;
	padding: 12px 25px;
	box-shadow: 0 2px 10px 0 rgba(0,0,0,0.18);
	p {
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		color: white;
	}

	a {
		color: white;
	}
`;

const WidgetLink = styled(Link)`
	display: block;
	text-align: center;
	color: white;

	:hover {
		color: white;
		font-weight: bold;
		text-decoration: none;
	}
`;

export interface ParentProps {
	claims?: any[];  
	projectDid: string;
	fullPage: boolean;
	hasLink: boolean;
}

export const ProjectClaims: React.SFC<ParentProps> = ({claims, projectDid, fullPage, hasLink}) => {

	const renderClaimStatus = (status) => {
		switch (status) {
			case '0':
				return 'Pending';
			case '1':
				return 'Approved';
			case '2':
				return 'Rejected';
			default:
				return 'Pending';
		}
	};

	const renderClaim = (claim, colorClass) => {

		if (hasLink) {
			return (
				<Link to={{pathname: `/projects/${projectDid}/detail/claims/${claim.claimId}`}}>
					<WidgetWrapper title={'Claim ID: ' + claim.claimId}>
						<Indicator color={colorClass}/>
						<p>{renderClaimStatus(claim.status)}</p>
					</WidgetWrapper>
				</Link>
			);
		} else {
			return (
				<WidgetWrapper title={'Claim ID: ' + claim.claimId}>
					<Indicator color={colorClass}/>
					<p>{renderClaimStatus(claim)}</p>
				</WidgetWrapper>
			);
		}
	};

	const handleRenderSection = (iconClass: string, claimsList: any[], colorClass: string, title: string, key: number) => {
		return (
			<Section className="row" key={key}>
					<div className="col-12">
						<h2><i className={iconClass}/>{title}</h2>
					</div>
				{claimsList.map((claim, index) => {
					return (
						<Col className="col-12" key={index}>
							{renderClaim(claim, colorClass)}
						</Col>
					);
				})}
			</Section>
		);

	};

	const showViewAllLink = () => {
		if (hasLink) {
			return (<WidgetLink to={`/projects/${projectDid}/detail/claims`}>View all claims</WidgetLink>);
		} else {
			return null;
		}
	};

	const claimDate = (date: string) => {
		return 'test';
	};

	const handleRenderWidget = () => {
		let colorCLass = '';
		return (
			<ClaimsWidget>
				{claims.map((claim, index) => {
					console.log(claim);
					switch (claim.status) {
						case '0':
							colorCLass = '#F89D28';
							break;
						case '1':
							colorCLass = '#5AB946';
							break;
							case '2':
							colorCLass = '#E2223B';
							break;
						default:
							break;
					}
					if (hasLink) {
						return (
							<Link key={index} to={{pathname: `/projects/${projectDid}/detail/claims/${claim.claimId}`}}>
								<ListItemWrapper className="col-12" >
											<Indicator color={colorCLass}/>
											<p>{'Claim ID: ' + claim.claimId} {claimDate(claim.date)}</p>
											<p>{renderClaimStatus(claim.status)}</p>
								</ListItemWrapper>
							</Link>
						);
					} else {
						return (
							<ListItemWrapper key={index} className="col-12" >
										<Indicator color={colorCLass}/>
										<p>{'Claim ID: ' + claim.claimId}</p>
										<p>{renderClaimStatus(claim.status)}</p>
							</ListItemWrapper>
						);
					}
				})}
				{showViewAllLink()}
			</ClaimsWidget>
		);
	};

	const handleRenderFull = () => {

		const approved = [];
		const pending = [];
		const revoked = [];
		const sections = [];
		claims.map((claim) => {
			switch (claim.status) {				
				case '1':
					approved.push(claim);
					break;
				case '2':
					revoked.push(claim);
					break;
				case '0':
				default:
					pending.push(claim);
					break;
			}
		});

		pending.length > 0 && sections.push(handleRenderSection('icon-pending', pending, '#F89D28', 'Claims pending approval', 1));
		approved.length > 0 && sections.push(handleRenderSection('icon-approved', approved, '#5AB946', 'Claims Approved', 2));
		revoked.length > 0 && sections.push(handleRenderSection('icon-rejectedcross', revoked, '#E2223B', 'Claims rejected', 3));
		return (
			<LayoutWrapper>
				{sections}
			</LayoutWrapper>
		);
	};

	return (
		<Fragment>
			{(fullPage) ? handleRenderFull() : handleRenderWidget()}
		</Fragment>
	);
};