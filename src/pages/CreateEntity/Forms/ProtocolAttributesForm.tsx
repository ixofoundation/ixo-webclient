import React from 'react'
import { TEntityProfileAttributeModel } from 'types/protocol'
import { AddLink, FormRow, FormWrapper, RemoveLink, AttributeInput } from './ProtocolAttributesForm.styles'

interface Props {
  attributes: TEntityProfileAttributeModel[]
  setAttributes: (value: TEntityProfileAttributeModel[]) => void
  edit?: boolean
}

const ProtocolAttributesForm: React.FC<Props> = ({
  edit = false,
  attributes = [{ key: '', value: '' }],
  setAttributes,
}): JSX.Element => {
  const handlAddAttribute = (): void => setAttributes([...attributes, { key: '', value: '' }])
  const handleRemoveAttribute = (index: any): void => {
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
        <FormRow key={index} className='align-items-center'>
          {edit ? (
            <span className='w-100'>{key}</span>
          ) : (
            <AttributeInput
              inputValue={key}
              placeholder={'Attribute Key'}
              handleChange={(key): void => handleUpdateAttribute(index, { key })}
            />
          )}
          <AttributeInput
            inputValue={value}
            placeholder={'Attribute Value'}
            handleChange={(value): void => handleUpdateAttribute(index, { value })}
          />
          {!edit && (
            <RemoveLink color='blue' weight='bold' size='sm' onClick={(): void => handleRemoveAttribute(index)}>
              - Remove
            </RemoveLink>
          )}
        </FormRow>
      ))}
      {!edit && (
        <AddLink color='blue' weight='bold' size='sm' onClick={handlAddAttribute}>
          + Add another Attribute
        </AddLink>
      )}
    </FormWrapper>
  )
}

export default ProtocolAttributesForm
