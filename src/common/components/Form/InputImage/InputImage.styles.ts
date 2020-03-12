import styled from 'styled-components'

export const InputContainer = styled.div`
  font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
  margin: 20px 0;
  border-radius: 0;
  text-transform: uppercase;
`

export const InputImageContainer = InputContainer.extend`
  display: inline-block;
  position: relative;
`

export const CloseButton = styled.button`
  color: blaxk;
  background: none;
  border: 0;
  right: 0px;
  font-size: 40px;
  line-height: 1;
  cursor: pointer;
  font-weight: 100;
  position: absolute;
`
