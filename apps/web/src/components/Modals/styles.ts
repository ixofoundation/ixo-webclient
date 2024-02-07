import styled, { css } from 'styled-components'
import { Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/App/App.styles'
import { deviceWidth } from 'constants/device'

const activeButtonCSS = css`
  background: ${(props): string => props.theme.ixoNewBlue};
  color: ${(props): string => props.theme.ixoWhite};
`

export const ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: '100',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
    maxHeight: '90vh',
    maxWidth: '90vw',
    padding: 40,
    background: '#FFFFFF',
    border: 'none',
    boxSizing: 'border-box',
    borderRadius: '8px',
    position: 'relative',
    width: 'fit-content',
  },
}

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  & > svg > rect {
    fill: ${(props): string => props.theme.ixoBlack};
  }
`

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ModalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export const ModalInput = styled(Input)`
  font-weight: 500;
  &::placeholder {
    color: ${(props): string => props.theme.ixoGrey700};
  }
`

export const ModalTitle = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: ${(props): string => props.theme.ixoBlack};
  margin-bottom: 10px;
`

export const SelectionButton = styled.div<{ selected?: boolean }>`
  width: 140px;
  min-height: 48px;
  padding: 5px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: ${(props): string => props.theme.ixoBlack};
  background: ${(props): string => props.theme.ixoWhite};
  transition: all 0.2s;
  cursor: pointer;

  ${(props): any => props.selected && (activeButtonCSS as any)}

  &:hover {
    ${activeButtonCSS}
  }
`

export const SDGSelectionButton = styled.div<{
  $selected?: boolean
  $bgColor: string
}>`
  width: 142px;
  height: 120px;
  border-radius: 8px;
  background: ${(props): string => (props.$selected ? props.$bgColor + 'AA' : props.theme.ixoGrey300)};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  & > i {
    color: white;
    font-size: 50px;
  }

  &:hover {
    background: ${(props): string => props.$bgColor + 'AA'};
  }
`

export const Container = styled.div`
  position: relative;
  padding: 1.5rem 4rem;
  width: 34rem;
  min-height: 24rem;
  max-width: 100%;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0.5rem;
  }
`
export const NextStep = styled.div<{ show?: boolean }>`
  position: absolute;
  right: 10px;
  bottom: 30px;
  cursor: pointer;
  display: ${(props): string => (props.show ? 'block' : 'none')};

  @media (max-width: ${deviceWidth.mobile}px) {
    bottom: 10px;
  }
`
export const PrevStep = styled.div<{ show?: boolean }>`
  position: absolute;
  left: 10px;
  bottom: 30px;
  cursor: pointer;
  transform: rotateY(180deg);
  display: ${(props): string => (props.show ? 'block' : 'none')};

  @media (max-width: ${deviceWidth.mobile}px) {
    bottom: 10px;
  }
`
export const CheckWrapper = styled.div`
  position: relative;
  width: 100%;

  &.pe-none {
    pointer-events: none;
  }
  & > .check-icon {
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 1rem;

  button {
    background: #03324a;
    border: 1px solid #25758f;
    box-sizing: border-box;
    box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    cursor: pointer;
    flex: 1 1 0px;
    height: 50px;

    color: #ffeeee;
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    transition: all 0.2s;

    &:focus {
      outline: unset !important;
    }
    &:hover {
      color: #ffeeee !important;
    }
    &.inactive {
      color: #537b8e;
    }
    &.active {
      border: 1px solid ${(props) => props.theme.ixoNewBlue};
    }
  }
`

export const TXStatusBoard = styled.div`
  & > .lottie {
    width: 80px;
  }
  & > .status {
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.3px;
    color: #5a879d;
    text-transform: uppercase;
  }
  & > .message {
    font-size: 21px;
    color: #ffffff;
    text-align: center;
  }

  & > .transaction {
    border-radius: 100px;
    border: 1px solid ${(props): string => props.theme.highlight.light};
    padding: 10px 30px;
    cursor: pointer;
  }

  & > .copy-icon {
    transition: transform 0.05s;
    &:active {
      transform: scale(1.3);
    }
  }
`

export const OverlayWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #235975;
`

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Label = styled.div`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  color: #83d9f2;

  strong {
    font-weight: bold;
  }

  &.error {
    color: #cd1c33;
  }
`

export const Overlay = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const OverlayDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, #01283b 0%, #012d41 100%);
  color: ${(props): string => props.theme.ixoNewBlue};
  border: 1px solid #436779;
  box-sizing: border-box;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  width: 70px;
  height: 40px;
  z-index: 100;
  cursor: pointer;
  padding: 6px;

  font-weight: 700;
  font-size: 16px;
`
