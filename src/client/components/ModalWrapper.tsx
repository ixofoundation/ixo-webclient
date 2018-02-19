import * as React from 'react';
import * as Modal from 'react-modal';
import styled from 'styled-components';

export namespace ModalWrapper {
    interface Props {
        isModalOpen: boolean,
    }

    interface Callbacks {
        handleToggleModal?: (theStatus: boolean)=> void;
    }
    export interface IProps extends Props, Callbacks {}
}

export const ModalWrapper: React.SFC<ModalWrapper.IProps>= (props) => {
    return (
        <Modal
        style={modalStyles}
        isOpen={props.isModalOpen}
        onRequestClose={()=>props.handleToggleModal(false)}
        contentLabel="Modal"
        ariaHideApp={false}
        >
        <ModalInner>
            <CloseModal onClick={()=>props.handleToggleModal(false)}>&times;</CloseModal>
            <div>{props.children}</div>
        </ModalInner>
    </Modal>);
}

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
        background : 'white',
        border : '0',
        overflow: 'scroll',
        maxHeight: '90vh'
    }
};

const ModalInner = styled.div`
    border-radius:2px;
`;

const CloseModal = styled.button`
    color: #333;
    background: white;
    border: 0;
    float: right;
    margin-top: -10px;
    margin-right: -10px;
    font-size: 25px;
    margin-bottom: 10px;
    line-height: 1;
    cursor: pointer;
`;