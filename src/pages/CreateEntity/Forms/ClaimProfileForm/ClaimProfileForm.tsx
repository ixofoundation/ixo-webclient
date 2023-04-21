import React from 'react'
import { FormWrapper, FormBody, FormRow } from './ClaimProfileForm.styles'
import { InputWithLabel, SelectWithLabel, TextArea } from '../../Components'
import { Typography } from 'components/Typography'
import { EClaimType } from 'types/protocol'

interface Props {
  type: EClaimType | undefined
  setType: (type: EClaimType) => void
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
}

const ClaimProfileForm: React.FC<Props> = ({
  type,
  setType,
  title,
  setTitle,
  description,
  setDescription,
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <FormBody>
        <FormRow>
          <SelectWithLabel
            label='Claim Type'
            value={type}
            handleChange={setType}
            options={Object.entries(EClaimType).map(([, value]) => value)}
          />
        </FormRow>

        <FormRow>
          {setTitle ? (
            <InputWithLabel label='Claim Title' inputValue={title} handleChange={setTitle} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {title}
            </Typography>
          )}
        </FormRow>

        <FormRow>
          {setDescription ? (
            <TextArea
              label='Describe the Claim Form'
              inputValue={description}
              handleChange={setDescription}
              height={'350px'}
            />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {description}
            </Typography>
          )}
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default ClaimProfileForm
