import { theme } from 'modules/App/App.styles'
import React from 'react'
import {
  AddLink,
  FormRow,
  FormWrapper,
  RemoveLink,
  TokenAttributeInput,
} from './TokenAttributesForm.styles'

interface Props {
  attributes: { key: string; value: string }[]
  setAttributes: (value) => void
}

const TokenAttributesForm: React.FC<Props> = ({
  attributes,
  setAttributes,
}): JSX.Element => {
  const handlAddAttribute = (): void =>
    setAttributes((prev) => [...prev, { key: '', value: '' }])
  const handlRemoveAttribute = (index): void => {
    if (attributes.length === 1) {
      setAttributes([{ key: '', value: '' }])
    } else {
      setAttributes((prev) => {
        const newArray = prev.filter((_, i) => index !== i)
        return newArray
      })
    }
  }

  return (
    <FormWrapper>
      {attributes.map(({ key, value }, index) => (
        <FormRow key={index}>
          <TokenAttributeInput
            inputValue={key}
            placeholder={'Attribute Key'}
            handleChange={(val): void =>
              setAttributes((prev) =>
                prev.map((_, i) => ({
                  key: index === i ? val : _.key,
                  value: _.value,
                })),
              )
            }
          />
          <TokenAttributeInput
            inputValue={value}
            placeholder={'Attribute Value'}
            handleChange={(val): void =>
              setAttributes((prev) =>
                prev.map((_, i) => ({
                  key: _.key,
                  value: index === i ? val : _.value,
                })),
              )
            }
          />
          <RemoveLink
            color={theme.ixoNewBlue}
            fontWeight={700}
            fontSize="12px"
            lineHeight="16px"
            onClick={(): void => handlRemoveAttribute(index)}
          >
            - Remove
          </RemoveLink>
        </FormRow>
      ))}
      <AddLink
        color={theme.ixoNewBlue}
        fontWeight={700}
        fontSize="12px"
        lineHeight="16px"
        onClick={handlAddAttribute}
      >
        + Add another Attribute
      </AddLink>
    </FormWrapper>
  )
}

export default TokenAttributesForm
