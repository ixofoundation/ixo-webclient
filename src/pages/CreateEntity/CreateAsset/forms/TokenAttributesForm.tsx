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
  attributes = [{ key: '', value: '' }],
  setAttributes,
}): JSX.Element => {
  const handlAddAttribute = (): void =>
    setAttributes([...attributes, { key: '', value: '' }])
  const handleRemoveAttribute = (index): void => {
    if (attributes.length === 1) {
      setAttributes([{ key: '', value: '' }])
    } else {
      setAttributes(attributes.filter((_, i) => index !== i))
    }
  }
  const handleUpdateAttribute = (attrIdx: number, obj: object): void => {
    setAttributes(
      attributes.map((_, i) => {
        if (attrIdx === i) {
          return { ..._, ...obj }
        }
        return { ..._ }
      }),
    )
  }

  return (
    <FormWrapper>
      {attributes.map(({ key, value }, index) => (
        <FormRow key={index}>
          <TokenAttributeInput
            inputValue={key}
            placeholder={'Attribute Key'}
            handleChange={(key): void => handleUpdateAttribute(index, { key })}
          />
          <TokenAttributeInput
            inputValue={value}
            placeholder={'Attribute Value'}
            handleChange={(value): void =>
              handleUpdateAttribute(index, { value })
            }
          />
          <RemoveLink
            color={theme.ixoNewBlue}
            fontWeight={700}
            fontSize="12px"
            lineHeight="16px"
            onClick={(): void => handleRemoveAttribute(index)}
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
