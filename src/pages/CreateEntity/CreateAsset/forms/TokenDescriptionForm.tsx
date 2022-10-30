import React from 'react'
import { TextArea } from '../../components'
import { FormWrapper, TokenBrandNameInput } from './TokenDescriptionForm.styles'

interface Props {
  description: string
  setDescription: (val: string) => void
  brandName: string
  setBrandName: (val: string) => void
  country: string
  setCountry: (val: string) => void
}

const TokenDescriptionForm: React.FC<Props> = ({
  description,
  setDescription,
  brandName,
  setBrandName,
  country,
  setCountry,
}): JSX.Element => {
  return (
    <FormWrapper>
      <TextArea
        inputValue={description}
        handleChange={setDescription}
        width={'400px'}
        height={'240px'}
        placeholder={'Describe the Asset Class'}
      />
      <TokenBrandNameInput
        inputValue={brandName}
        placeholder={'Brand Name'}
        handleChange={setBrandName}
      />
      <TokenBrandNameInput
        inputValue={country}
        placeholder={'Country'}
        handleChange={setCountry}
      />
    </FormWrapper>
  )
}

export default TokenDescriptionForm
