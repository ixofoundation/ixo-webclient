import * as React from 'react'
import * as Modal from 'react-modal'
import styled from 'styled-components'
import { Header } from '../../../types/models'

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: '100',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderWidth: 0,
    overflow: 'auto',
    maxHeight: '90vh',
    padding: '0',
    background: 'linear-gradient(180deg, #01273A 0%, #002D42 100%)',
    border: '1px solid #083347',
    boxSizing: 'border-box',
    boxShadow: '-1px 10px 30px rgba(0, 0, 0, 0.25)',
    borderRadius: '13px',
  },
}

const ModalInner = styled.div<{ color?: string }>`
  // background: ${/* eslint-disable-line */ (props) => props.color ? props.color : props.theme.bg.modal};
  color: white;
  padding: 30px 50px 0;
  font-family: ${/* eslint-disable-line */ (props) => props.theme.fontRoboto};
`

const CloseModal = styled.button`
  color: white;
  background: none;
  border: 0;
  top: 18px;
  right: 40px;
  font-size: 40px;
  line-height: 1;
  cursor: pointer;
  font-weight: 100;
  position: absolute;
  z-index: 100;

  &:focus {
    outline: none;
  }
`

const FlexContainer = styled.div`
  display: flex;
  // padding: 10px 30px 0 0;

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
    letter-spacing: 0.3px;
    margin: 0;
    font-family: ${/* eslint-disable-line */ (props) =>
      props.theme.fontRobotoCondensed};
  }

  h3.noCaps {
    text-transform: none;
  }

  p {
    font-weight: 300;
    margin: 0;
    font-size: 18px;
    color: ${/* eslint-disable-line */ (props) => props.theme.fontLightBlue};
    font-family: ${/* eslint-disable-line */ (props) => props.theme.fontRoboto};
  }
`

const Line = styled.div`
  background: ${/* eslint-disable-line */ (props) => props.theme.widgetBorder};
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
  bgColor?: string
}

interface Callbacks {
  handleToggleModal?: (theStatus: boolean) => void
}
export interface Props extends ParentProps, Callbacks {}

export const ModalWrapper: React.SFC<Props> = (props) => {
  const renderHeader = (): JSX.Element => {
    return (
      <React.Fragment>
        <FlexContainer
          style={props.header.width && { width: `${props.header.width}px` }}
          className="modal-heading"
        >
          <div>
            {props.header.icon && props.header.icon}
            {props.header.image && <img alt="" src={props.header.image} />}
          </div>
          <TitleContainer>
            <h3 className={props.header.titleNoCaps === true ? 'noCaps' : ''}>
              {props.header.title}
            </h3>
            {props.header.subtitle && <p>{props.header.subtitle}</p>}
          </TitleContainer>
        </FlexContainer>
        {!props.header.noDivider && <Line />}
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
      <ModalInner color={props.bgColor}>
        <CloseModal onClick={(): void => props.handleToggleModal(false)}>
          <img alt="" src={require('assets/images/icon-close.svg')} />
        </CloseModal>
        {props.header && renderHeader()}
        <div>{props.children}</div>
      </ModalInner>
    </Modal>
  )
}

export const Button = styled.button`
  border-radius: 7px;
  border: 1px solid #00d2ff;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  height: 2.25rem;
`
