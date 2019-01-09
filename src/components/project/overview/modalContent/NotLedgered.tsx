import * as React from 'react';
import styled from 'styled-components';
import { ButtonTypes, Button } from 'src/components/common/Buttons';

const ModalData = styled.div`

	max-width: 380px;
	text-align: center;
	padding: 20px 20px 30px;

	i {
		font-size: 64px;

		:before {
			color: ${props => props.theme.ixoBlue};
		}
	}

	h3 {
		margin-top: 10px;
		font-size: 18px;
		font-family: ${props => props.theme.fontRobotoCondensed};
	}

	p {
		font-size: 15px;
		font-weight: 300;

		span {
			color: ${props => props.theme.ixoBlue};
		}
	}
`;

const InfoLink = styled.a`
	color: white;
	font-size: 12px;
	text-decoration: underline;

	:hover {
		color: ${props => props.theme.ixoBlue};
	}
`;

const Container = styled.div`
	max-width: 360px;
	font-family: ${props => props.theme.fontRoboto};

	p {
		font-weight: 200;
	}
`;

export interface ParentProps {
	modalResponse: string;
	handleToggleModal: (isOpen: boolean) => void;
	ledgerDid: () => string;
}

export const NoKYC: React.SFC<ParentProps> = (props) => {

	if (props.modalResponse.length > 0) {
		return (
			<Container>
				<ModalData>
					<p>{props.modalResponse}</p>
					<Button type={ButtonTypes.dark} onClick={() => props.handleToggleModal(false)}>CONTINUE</Button>
				</ModalData>
			</Container>
		);
	} else {
		return (
			<Container>
				<ModalData>
					<i className="icon-success" />
					<h3>YOU HAVE SUCCESSFULLY INSTALLED THE IXO KEYSAFE</h3>
					<p><span>LAST STEP - </span>create your self-sovereign credentials on the ixo blockchain.</p>
					<Button type={ButtonTypes.dark} onClick={props.ledgerDid}>SIGN NOW USING KEYSAFE</Button>
					<InfoLink href="https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6" target="_blank">Why do I need to sign my credentials?</InfoLink>
				</ModalData>
			</Container>
		);
	}
};