import styled from 'styled-components'

export const Input = styled.div`
  margin: 15px 0;
  border-radius: 0;

  p {
    color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
    margin-bottom: 10px;
    font-weight: 500;
  }

  & select {
    height: 50px;
    border-left: 0;
    border-radius: 3px;
    border: 1px solid
      ${/* eslint-disable-line */ props => props.theme.lightGrey};
  }
`
