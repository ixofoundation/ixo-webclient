import React from 'react'
import { TClaimQuestionControlProps } from './types'
import styled from 'styled-components'

const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.ixoNewBlue};
  padding: 10px;

  font-family: ${(props) => props.theme.primaryFontFamily};
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;

  color: ${(props) => props.theme.ixoWhite};
  background: transparent;

  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.ixoDarkBlue};
  }
`

const Input: React.FC<TClaimQuestionControlProps> = ({ value, onChange, ...rest }) => {
  return <StyledInput value={(value as string) || ''} onChange={(e) => onChange(e.target.value)} {...rest} />
}

export default Input
