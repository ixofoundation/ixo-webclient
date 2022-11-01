import styled from 'styled-components'
import { Input } from 'pages/CreateEntity/components'
import { Typography } from 'modules/App/App.styles'

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
  justify-content: center;
  gap: 10px;
`

export const ModalInput = styled(Input)`
  font-weight: 500;
  &::placeholder {
    color: ${(props): string => props.theme.ixoMediumGrey};
  }
`

export const ModalTitle = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: ${(props): string => props.theme.ixoBlack};
  margin-bottom: 10px;
`
