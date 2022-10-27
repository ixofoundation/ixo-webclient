import styled from 'styled-components'
import ReactImageCrop from 'react-image-crop'

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

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledImageCrop = styled(ReactImageCrop)`
  width: 90vw;
  & img {
    width: 100%;
  }
`
