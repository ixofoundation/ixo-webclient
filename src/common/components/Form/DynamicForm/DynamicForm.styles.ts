import styled from 'styled-components'

export const SubmitStatus = styled.p`
  color: #0f8dab;
  margin-top: 10px;
  text-align: center;
`

export const ButtonContainer = styled.div`
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: -25px;
  padding: 22px 34px 22px 34px;
  background: ${/*eslint-disable-line*/ (props) => props.theme.grey};
  padding: 10px 20px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.18);
`

export const ReturnButton = styled.div`
  text-transform: uppercase;
  border-radius: 3px;
  text-align: center;
  background: ${/*eslint-disable-line*/ (props) => props.theme.bg.grey};
  font-family: ${/*eslint-disable-line*/ (props) => props.theme.secondaryFontFamily};
  font-size: 15px;
  padding: 10px 20px 10px;
  cursor: pointer;
  border: 1px solid ${/*eslint-disable-line*/ (props) => props.theme.bg.darkButton};
  color: ${/*eslint-disable-line*/ (props) => props.theme.bg.darkButton};
  width: 180px;
`

export const SubmitButton = styled.div`
  text-transform: uppercase;
  border-radius: 3px;
  text-align: center;
  background: ${/*eslint-disable-line*/ (props) => props.theme.bg.gradientButtonGreen};
  font-family: ${/*eslint-disable-line*/ (props) => props.theme.secondaryFontFamily};
  font-size: 15px;
  padding: 10px 20px 10px;
  cursor: pointer;
  color: white;
  text-decoration: none;

  svg {
    padding-left: 10px;
  }
`
