import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow } from './OracleProfileForm.styles'
import { HeadlineMetric, IconUpload, ImageUpload, InputWithLabel } from '../../Components'
import { Typography } from 'components/Typography'
import { FlexBox } from 'components/App/App.styles'

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
          <IconUpload icon={logo} placeholder='Oracle Logo' handleChange={setLogo} />
        </FormRow>
        <FormRow>
          {setOrgName ? (
            <InputWithLabel label='Organisation Name' height='48px' inputValue={orgName} handleChange={setOrgName} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {orgName}
            </Typography>
          )}
        </FormRow>
        <FormRow>
          {setName ? (
            <InputWithLabel label='Oracle Name' height='48px' inputValue={name} handleChange={setName} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {name}
            </Typography>
          )}
        </FormRow>

        <FlexBox my={10}>
          <HeadlineMetric />
        </FlexBox>
      </FormBody>
    </FormWrapper>
  )
}

export default OracleProfileForm
