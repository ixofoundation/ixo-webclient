import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow, Badge } from './TokenBasicInfoCardForm.styles'
import { HeadlineMetric, IconUpload, ImageUpload, Input, InputWithLabel, SelectWithLabel } from '../Components'
import { thousandSeparator } from 'utils/formatters'
import { Box, theme } from 'components/App/App.styles'
import { EAssetType } from 'types/protocol'
import { Typography } from 'components/Typography'

interface Props {
  image: string
  setImage: (image: string) => void
  denom: string
  setDenom?: (denom: string) => void
  type: string
  setType?: (type: EAssetType) => void
  icon: string
  setIcon: (icon: string) => void
  tokenName: string
  setTokenName: (tokenName: string) => void
  name: string
  setName?: (name: string) => void
  maxSupply: number
  setMaxSupply?: (maxSupply: number) => void
  decimals?: number
  setDecimals?: (decimals: number) => void
  SN?: number
}

const TokenBasicInfoCardForm: React.FC<Props> = ({
  image,
  setImage,
  denom,
  setDenom,
  type,
  setType,
  icon,
  setIcon,
  tokenName,
  setTokenName,
  name,
  setName,
  maxSupply,
  setMaxSupply,
  decimals,
  setDecimals,
  SN,
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <FormHeader>
        <ImageUpload image={image} handleChange={setImage} />
      </FormHeader>

      <FormBody>
        <FormRow style={{ justifyContent: 'space-between' }}>
          <Box className='d-flex align-items-center' style={{ gap: 4 }}>
            {setDenom ? (
              <InputWithLabel
                width='110px'
                height='36px'
                label='DENOM'
                inputValue={denom}
                error={(denom === 'CSTOVE' && 'Not available') || undefined} // TODO:
                handleChange={(value): void => setDenom(String(value).toUpperCase())}
              />
            ) : (
              <Badge tagColor={theme.ixoDarkRed}>{denom}</Badge>
            )}
            {setType ? (
              <SelectWithLabel width='150px' height='36px' label='Asset Type' value={type} handleChange={setType} />
            ) : (
              <Badge tagColor={theme.ixoNewOrange}>{type}</Badge>
            )}
          </Box>
          <IconUpload icon={icon} placeholder='Asset Icon' handleChange={setIcon} />
        </FormRow>

        <FormRow>
          <InputWithLabel label='Asset Name' inputValue={tokenName} handleChange={setTokenName} />
        </FormRow>

        <FormRow>
          {setName ? (
            <InputWithLabel label='Class Name' inputValue={name} handleChange={setName} />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {name}
            </Typography>
          )}
        </FormRow>

        <FormRow>
          <HeadlineMetric />
        </FormRow>

        <FormRow className='align-items-baseline' style={{ gap: 4 }}>
          {setMaxSupply ? (
            <InputWithLabel
              label='Max Amount (or blank if unlimited)'
              inputValue={thousandSeparator(maxSupply, ',')}
              handleChange={(value): void => {
                const val = value.replace(/[^0-9]/g, '')
                if (!isNaN(val)) {
                  setMaxSupply(val)
                }
              }}
            />
          ) : (
            <>
              <Typography weight='semi-bold' size='2xl' style={{ color: '#01283B' }}>
                # {SN}
              </Typography>
              {maxSupply && (
                <Typography color='gray-medium' weight='medium' size='md'>
                  of {parseFloat(String(maxSupply)).toLocaleString()}
                </Typography>
              )}
            </>
          )}
        </FormRow>

        <FormRow>
          {setDecimals && (
            <Box className='d-flex align-items-center' style={{ gap: 10 }}>
              <Input
                width='45px'
                className='text-center'
                placeholder='0'
                maxLength={2}
                inputValue={decimals}
                handleChange={(value): void => {
                  const val = value.replace(/[^0-9]/g, '')
                  if (!isNaN(val)) {
                    setDecimals(Number(val))
                  }
                }}
              />
              <Typography weight='bold' size='lg' color='gray-medium'>
                decimals
              </Typography>
            </Box>
          )}
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default TokenBasicInfoCardForm
