import React from 'react'
import { CheckBox, DateRangePicker, TextArea } from '../../../Components'
import { FormWrapper, BrandNameInput, CountryDropDown } from './EntityDescriptionForm.styles'
import 'react-dates/initialize'
import { useEntityConfig } from 'hooks/configs'

interface Props {
  entityType: string
  description: string | undefined
  setDescription: (val: string) => void
  brand: string | undefined
  setBrand?: (val: string) => void
  location: string | undefined
  setLocation?: (val: string) => void
  autoGenerateZLottie?: boolean | undefined
  setAutoGenerateZLottie?: (val: boolean) => void
  startDate: string | undefined
  endDate: string | undefined
  setStartEndDate?: (startDate: string, endDate: string) => void
}

const EntityDescriptionForm: React.FC<Props> = ({
  entityType,
  description,
  setDescription,
  brand,
  setBrand,
  location,
  setLocation,
  autoGenerateZLottie,
  setAutoGenerateZLottie,
  startDate,
  endDate,
  setStartEndDate,
}): JSX.Element => {
  const { title } = useEntityConfig(entityType)

  return (
    <FormWrapper>
      <TextArea
        inputValue={description || ''}
        handleChange={setDescription}
        width={'400px'}
        height={'240px'}
        label={`Describe the ${title}`}
      />
      {setBrand && (
        <BrandNameInput
          name='brand'
          inputValue={brand}
          placeholder={'Brand Name'}
          handleChange={(name: string): void => setBrand(name)}
        />
      )}
      {setLocation && (
        <CountryDropDown
          value={location || ''}
          onChange={setLocation}
          onBlur={setLocation}
          onFocus={() => {
            //
          }}
        />
      )}
      {setStartEndDate && (
        <DateRangePicker
          id='protocol'
          startDate={startDate || ''}
          endDate={endDate || ''}
          onChange={(startDate, endDate) => {
            setStartEndDate(startDate, endDate)
          }}
        />
      )}
      {setAutoGenerateZLottie && (
        <CheckBox
          label='Autogenerate immutable zLottie'
          value={autoGenerateZLottie}
          handleChange={(option: boolean): void => setAutoGenerateZLottie(option)}
        />
      )}
    </FormWrapper>
  )
}

export default EntityDescriptionForm
