import React from 'react'
import { FormWrapper, FormBody, FormRow, FormHeader } from './DeedProfileForm.styles'
import { ImageUpload, InputWithLabel, SelectWithModal } from '../../Components'
import { Typography } from 'components/Typography'
import { EDeedType } from 'types/protocol'
import { FlexBox } from 'components/App/App.styles'
import moment from 'moment'

interface Props {
  image: string | undefined
  setImage: (image: string) => void
  type: string
  setType: (type: string) => void
  title: string
  setTitle: (title: string) => void
  description: string
  error?: { [id: string]: string }
}

const DeedProfileForm: React.FC<Props> = ({
  setImage,
  image,
  type,
  setType,
  title,
  setTitle,
  description,
  error = {},
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <FormHeader>
      <ImageUpload image={image} handleChange={setImage} />
      </FormHeader>

      <FormBody>
        <FormRow>
          <SelectWithModal
            label='Deed Type'
            value={type}
            handleChange={setType}
            options={Object.entries(EDeedType).map(([, value]) => value)}
          />
        </FormRow>

        <FlexBox $direction='column' $gap={2}>
          {setTitle ? (
            <InputWithLabel label='Deed Title' inputValue={title} handleChange={setTitle} error={error.title} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {title}
            </Typography>
          )}
        </FlexBox>

        <FlexBox height={'100px'} $alignItems='center'>
          {description ? (
            <Typography color='grey300' $overflowLines={4}>
              {description}
            </Typography>
          ) : (
            <Typography color='grey300'>Deed Description</Typography>
          )}
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

export default DeedProfileForm
