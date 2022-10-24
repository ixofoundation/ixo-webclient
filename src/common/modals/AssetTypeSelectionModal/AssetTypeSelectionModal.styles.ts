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

export const TypeButton = styled.div`
  width: 140px;
  height: 36px;
  padding: 5px;
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  text-align: center;

  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: ${(props): string => props.theme.ixoBlack};
  background: ${(props): string => props.theme.ixoWhite};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${(props): string => props.theme.ixoNewBlue};
    color: ${(props): string => props.theme.ixoWhite};
  }
`
