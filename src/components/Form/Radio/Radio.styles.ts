import styled from 'styled-components'

export const Input = styled.div`
  margin: 15px 0;
  border-radius: 0;
  text-transform: uppercase;

  & .input-group-text {
    white-space: normal;
    background: ${/* eslint-disable-line */ props => props.theme.bgMain};
    border: 0;
    color: white;
    padding: 15px 10px;
    font-size: 0.7em;
    border-radius: 0;
    width: 140px;
    justify-content: center;
  }
`

export const RadioButton = styled.div`
  padding: 10px 0px 10px 40px;
  text-transform: none;
`
