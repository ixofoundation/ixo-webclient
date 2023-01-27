import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow } from './OracleProfileForm.styles'
import { HeadlineMetric, IconUpload, ImageUpload, InputWithLabel } from '../../Components'
import { Typography } from 'components/Typography'

interface Props {
  image: string | undefined
  setImage: (image: string) => void
  orgName: string
  setOrgName?: (orgName: string) => void
  name: string
  setName?: (name: string) => void
  logo: string
  setLogo: (logo: string) => void
}

const OracleProfileForm: React.FC<Props> = ({
  image,
  setImage,
  orgName,
  setOrgName,
  name,
  setName,
  logo,
  setLogo,
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <FormHeader>
        <ImageUpload image={image} handleChange={setImage} />
      </FormHeader>

      <FormBody>
        <FormRow style={{ justifyContent: 'flex-end' }}>
          <IconUpload icon={logo} placeholder='Brand Logo' handleChange={setLogo} />
        </FormRow>
        <FormRow>
          {setOrgName ? (
            <InputWithLabel label='Organisation Name' inputValue={orgName} handleChange={setOrgName} />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {orgName}
            </Typography>
          )}
        </FormRow>
        <FormRow>
          {setName ? (
            <InputWithLabel label='Oracle Name' inputValue={name} handleChange={setName} />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {name}
            </Typography>
          )}
        </FormRow>

        <FormRow>
          <HeadlineMetric />
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default OracleProfileForm
