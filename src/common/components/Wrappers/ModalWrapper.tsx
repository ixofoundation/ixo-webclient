import * as React from 'react'
import * as Modal from 'react-modal'
import styled from 'styled-components'
import { Header } from '../../../types/models'

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '100',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #0C3550',
    overflow: 'auto',
    maxHeight: '90vh',
    padding: '0',
    borderRadius: '2px',
    backgroundColor: 'black',
  },
}

const ModalInner = styled.div`
  background: ${/* eslint-disable-line */ props => props.theme.bg.modal};
  color: white;
  padding: 10px 30px;
  font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
`

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

  &:focus {
    outline: none;
  }
`

const FlexContainer = styled.div`
  display: flex;
  padding: 10px 30px 0 0;

  i {
    margin-right: 10px;
    font-size: 50px;
  }

  img {
    width: 40px;
    margin-right: 20px;
  }

  h3 {
    font-weight: 300;
    font-size: 24px;
    line-height: 1;
    text-transform: uppercase;
    margin: 0;
    font-family: ${/* eslint-disable-line */ props =>
      props.theme.fontRobotoCondensed};
  }

  h3.noCaps {
    text-transform: none;
  }

  p {
    font-weight: 300;
    margin: 0;
    font-size: 18px;
    color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
    font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
  }
`

const Line = styled.div`
  background: ${/* eslint-disable-line */ props => props.theme.widgetBorder};
  width: calc(100% + 60px);
  margin: 10px -30px 25px;
  height: 1px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

interface ParentProps {
  isModalOpen: boolean
  header?: Header
  background?: string
}

interface Callbacks {
  handleToggleModal?: (theStatus: boolean) => void
}
export interface Props extends ParentProps, Callbacks {}

export const ModalWrapper: React.SFC<Props> = props => {
  const renderHeader = (): JSX.Element => {
    return (
      <React.Fragment>
        <FlexContainer
          style={props.header.width && { width: `${props.header.width}px` }}
          className="modal-heading"
        >
          <div>
            {props.header.icon && props.header.icon}
            {props.header.image && <img src={props.header.image} />}
          </div>
          <TitleContainer>
            <h3 className={props.header.titleNoCaps === true ? 'noCaps' : ''}>
              {props.header.title}
            </h3>
            {props.header.subtitle && <p>{props.header.subtitle}</p>}
          </TitleContainer>
        </FlexContainer>
        <Line />
      </React.Fragment>
    )
  }

  return (
    <Modal
      style={modalStyles}
      isOpen={props.isModalOpen}
      onRequestClose={(): void => props.handleToggleModal(false)}
      contentLabel="Modal"
      ariaHideApp={false}
      // closeTimeoutMS={300}
    >
      <ModalInner>
        <CloseModal onClick={(): void => props.handleToggleModal(false)}>
          <img src={ require('assets/images/icon-close.svg') } alt="close" />
        </CloseModal>
        {props.header && renderHeader()}
        <div>{props.children}</div>
      </ModalInner>
    </Modal>
  )
}
