import React from 'react'
import { FormWrapper, FormBody, FormRow, FormHeader } from './ClaimProfileForm.styles'
import { InputWithLabel, SelectWithModal } from '../../Components'
import { Typography } from 'components/Typography'
import { EClaimType } from 'types/protocol'
import { Box, FlexBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'
import moment from 'moment'

interface Props {
  type: string
  setType: (type: string) => void
  title: string
  setTitle: (title: string) => void
}

const ClaimProfileForm: React.FC<Props> = ({ type, setType, title, setTitle, ...rest }): JSX.Element => {
  const theme: any = useTheme()
  return (
    <FormWrapper {...rest}>
      <FormHeader>
        <Box height='240px' background={theme.ixoGrey300}></Box>
      </FormHeader>

      <FormBody>
        <FormRow>
          <SelectWithModal
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

        <FlexBox my={10}>
          <Typography size='xl' color='grey300'>
            Claim Description
          </Typography>
        </FlexBox>

        <FormRow style={{ justifyContent: 'space-between' }}>
          <Typography color='color-2' size='md'>
            Creation Date:
          </Typography>
          <Typography color='black' size='md'>
            {moment().format('DD MMM YYYY')}
          </Typography>
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default ClaimProfileForm
