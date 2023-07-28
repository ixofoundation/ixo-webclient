import React from 'react'
import { TClaimQuestionControlProps } from './types'
import styled from 'styled-components'
import { CheckBox } from 'pages/CreateEntity/Components'
import { FlexBox } from 'components/App/App.styles'

const StyledMultipleSelect = styled(FlexBox)``

const MultipleSelect: React.FC<TClaimQuestionControlProps> = ({
  itemValues,
  minItems,
  maxItems,
  value,
  onChange,
  ...rest
}) => {
  return (
    <StyledMultipleSelect direction='column' gap={2.5}>
      {(itemValues ?? []).map((option, index) => (
        <CheckBox
          key={index}
          label={option}
          value={value === option}
          handleChange={(value) => (value ? onChange(option) : undefined)}
        />
      ))}
    </StyledMultipleSelect>
  )
}

export default MultipleSelect
