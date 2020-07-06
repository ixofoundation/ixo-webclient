import styled from 'styled-components'

export const ImageContainer = styled.div`
  height: 400px;
  margin-bottom: 5px;
`

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: white;
  width: 50%;
  padding: 1.5em 2.875em 4.5em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const DropZoneStyles = {
  width: '100%',
  height: '150px',
  backgroundColor: 'lightgrey',
  color: 'black',
  borderWidth: '2px',
  textAlign: 'center',
  alignVertical: 'middle',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '5px',
}
