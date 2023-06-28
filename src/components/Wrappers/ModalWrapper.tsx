import * as React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { Header } from 'types/models'
import { deviceWidth } from 'constants/device'
import CloseIcon from 'assets/images/icon-close.svg'

const defModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: '100',
    backdropFilter: 'blur(5px)',
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
    maxWidth: '100vw',
    padding: '0',
    background: 'linear-gradient(180deg, #01273A 0%, #002D42 100%)',
    border: '1px solid #083347',
    boxSizing: 'border-box',
    boxShadow: '-1px 10px 30px rgba(0, 0, 0, 0.25)',
    borderRadius: '13px',
  },
}

const ModalInner = styled.div<{ color?: string }>`
  background: ${(props): string => (props.color ? props.color : props.theme.ixoDarkestBlue)};
  color: white;
  padding: 30px 50px;
  font-family: ${(props): string => props.theme.fontRoboto};

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 20px 20px 10px;
  }
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

  @media (max-width: ${deviceWidth.mobile}px) {
    top: 10px;
    right: 10px;
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
    font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
  }

  h3.noCaps {
    text-transform: none;
  }

  p {
    font-weight: 300;
    margin: 0;
    font-size: 18px;
    color: ${/* eslint-disable-line */ (props) => props.theme.ixoLightBlue};
    font-family: ${/* eslint-disable-line */ (props) => props.theme.primaryFontFamily};
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
  zIndex?: number
}

interface Callbacks {
  handleToggleModal?: (theStatus: boolean) => void
}
export interface Props extends ParentProps, Callbacks {}

export const ModalWrapper: React.SFC<Props> = (props) => {
  const modalStyles = React.useMemo(
    () => ({
      ...defModalStyles,
      overlay: {
        ...defModalStyles.overlay,
        zIndex: props.zIndex || defModalStyles.overlay.zIndex,
      },
      content: {
        ...defModalStyles.content,
        background: props.bgColor || defModalStyles.content.background,
        overflow: props.bgColor === 'transparent' ? 'hidden' : defModalStyles.content.overflow,
        boxShadow: props.bgColor === 'transparent' ? 'none' : defModalStyles.content.boxShadow,
      },
    }),
    [props.bgColor, props.zIndex],
  )
  const renderHeader = (): JSX.Element => {
    return (
      <React.Fragment>
        <FlexContainer
          style={(props.header?.width && { width: `${props.header.width}px` }) || undefined}
          className='modal-heading'
        >
          <div>
            {props.header?.icon && props.header.icon}
            {props.header?.image && <img alt='' src={props.header.image} />}
          </div>
          <TitleContainer>
            <h3 className={props.header?.titleNoCaps === true ? 'noCaps' : ''}>{props.header?.title}</h3>
            {props.header?.subtitle && <p>{props.header.subtitle}</p>}
          </TitleContainer>
        </FlexContainer>
        {!props.header?.noDivider && <Line />}
      </React.Fragment>
    )
  }

  return (
    <Modal
      style={modalStyles as any}
      isOpen={props.isModalOpen}
      onRequestClose={(): void => props.handleToggleModal!(false)}
      contentLabel='Modal'
      ariaHideApp={false}
      // closeTimeoutMS={300}
    >
      <ModalInner color={props.bgColor}>
        <CloseModal onClick={(): void => props.handleToggleModal!(false)}>
          <img alt='' src={CloseIcon} />
        </CloseModal>
        {props.header && renderHeader()}
        <div>{props.children}</div>
      </ModalInner>
    </Modal>
  )
}
