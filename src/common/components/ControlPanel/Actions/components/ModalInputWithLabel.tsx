import React from 'react'
import styled from 'styled-components'

const ModalInputWithLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  margin-bottom: 8px;
`

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${(props): string => props.theme.ixoBlue};
  border-radius: 4px;
  padding: 10px;
  background: transparent;
  color: #ffffff;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #0e536b;
  }
`

interface Props {
  label?: string
  placeholder?: string
  value: string
  handleChange: (value) => void
}

const ModalInputWithLabel: React.FC<Props> = ({
  label,
  placeholder,
  value,
  handleChange,
  ...rest
}): JSX.Element => {
  return (
    <ModalInputWithLabelWrapper {...rest}>
      <StyledLabel className="label">{label}</StyledLabel>
      <StyledInput
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(event): void => {
          const val = event?.target?.value ?? ''
          handleChange(val)
        }}
      />
    </ModalInputWithLabelWrapper>
  )
}

export default ModalInputWithLabel
