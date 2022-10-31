import { Input } from 'pages/CreateEntity/components'
import styled from 'styled-components'

export const modalStyles = {
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
  gap: 10px;
`

export const UploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props): string => props.theme.ixoLightGrey};
  border-radius: 8px;
  width: 600px;
  height: 400px;
`

export const SelectImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  & svg > path {
    fill: ${(props): string => props.theme.ixoNewBlue};
  }
`

export const DisplayImage = styled.div<{ background: string }>`
  background: url(${(props): string => props.background}) center no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  cursor: pointer;
`

export const ModalButton = styled.button<{ disabled?: boolean }>`
  background: ${(props): string =>
    props.disabled ? props.theme.ixoLightGrey2 : props.theme.ixoNewBlue};
  border-radius: 8px;
  padding: 8px 0px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.3px;
  transition: all 0.2s;
  text-transform: uppercase;
  color: ${(props): string => props.theme.ixoWhite};
  border: none;
  outline: none;
  cursor: pointer;

  width: 150px;

  &:focus {
    outline: none;
  }
`

export const ModalInput = styled(Input)`
  font-weight: 500;
  &::placeholder {
    color: ${(props): string => props.theme.ixoMediumGrey};
  }
`
