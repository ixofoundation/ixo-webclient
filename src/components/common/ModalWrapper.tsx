import * as React from 'react';
import * as Modal from 'react-modal';
import styled from 'styled-components';

const modalStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		transition     : 'all 0.5s ease',
		zIndex : '100'
	},
	content: {
		top        : '50%',
		left       : '50%',
		right      : 'auto',
		bottom     : 'auto',
		marginRight: '-50%',
		transform  : 'translate(-50%, -50%)',
		border : '1px solid #0C3550',
		overflow: 'scroll',
		maxHeight: '90vh',
		padding: '0',
		borderRadius: '2px'
	}
};

const ModalInner = styled.div`
	background: ${props => props.theme.bg.blue};
	color: white;
	padding: 10px 20px;
`;

const CloseModal = styled.button`
	color: white;
	background: none;
	border: 0;
	top: 0px;
	right: 5px;
	font-size: 40px;
	line-height: 1;
	cursor: pointer;
	font-weight: 100;
	position: absolute;
`;

interface StateProps {
	isModalOpen: boolean;
}

interface Callbacks {
	handleToggleModal?: (theStatus: boolean) => void;
}
export interface Props extends StateProps, Callbacks {}

export const ModalWrapper: React.SFC<Props> = (props) => {
	return (
		<Modal
			style={modalStyles}
			isOpen={props.isModalOpen}
			onRequestClose={() => props.handleToggleModal(false)}
			contentLabel="Modal"
			ariaHideApp={false}
		>
			<ModalInner>
					<CloseModal onClick={() => props.handleToggleModal(false)}>&times;</CloseModal>
					<div>{props.children}</div>
			</ModalInner>
		</Modal>
	);
};