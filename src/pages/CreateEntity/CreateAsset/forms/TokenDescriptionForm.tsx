import React from 'react'
import { CheckBox, TextArea } from '../../components'
import { FormWrapper, TokenBrandNameInput } from './TokenDescriptionForm.styles'

interface Props {
  description: string
  setDescription: (val: string) => void
  brandName?: string
  setBrandName?: (val: string) => void
  country?: string
  setCountry?: (val: string) => void
  autoGenerateZLottie?: boolean
  setAutoGenerateZLottie?: (val: boolean) => void
}

const TokenDescriptionForm: React.FC<Props> = ({
  description,
  setDescription,
  brandName,
  setBrandName,
  country,
  setCountry,
  autoGenerateZLottie,
  setAutoGenerateZLottie,
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
      {brandName && (
        <TokenBrandNameInput
          inputValue={brandName}
          placeholder={'Brand Name'}
          handleChange={(name: string): void =>
            setBrandName && setBrandName(name)
          }
        />
      )}
      {country && (
        <TokenBrandNameInput
          inputValue={country}
          placeholder={'Country'}
          handleChange={(country: string): void =>
            setCountry && setCountry(country)
          }
        />
      )}
      {autoGenerateZLottie && (
        <CheckBox
          label="Autogenerate immutable zLottie"
          checked={autoGenerateZLottie}
          handleChange={(option: boolean): void =>
            setAutoGenerateZLottie && setAutoGenerateZLottie(option)
          }
        />
      )}
    </FormWrapper>
  )
}

export default TokenDescriptionForm
