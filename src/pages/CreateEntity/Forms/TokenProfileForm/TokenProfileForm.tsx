// TODO: denom duplication check
import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow, Badge } from './TokenProfileForm.styles'
import { HeadlineMetric, IconUpload, ImageUpload, Input, InputWithLabel, SelectWithModal } from '../../Components'
import { thousandSeparator } from 'utils/formatters'
import { Box } from 'components/App/App.styles'
import { EAssetType } from 'types/entities'
import { Typography } from 'components/Typography'
import { useTheme } from 'styled-components'

interface Props {
  image: string | undefined
  setImage: (image: string) => void
  denom: string | undefined
  setDenom?: (denom: string) => void
  type: string | undefined
  setType?: (type: EAssetType) => void
  logo: string | undefined
  setLogo: (logo: string) => void
  tokenName: string | undefined
  setTokenName: (tokenName: string) => void
  name: string | undefined
  setName?: (name: string) => void
  maxSupply: number | undefined
  setMaxSupply?: (maxSupply: number) => void
  decimals?: number | undefined
  setDecimals?: (decimals: number) => void
  SN?: number | undefined
}

const TokenProfileForm: React.FC<Props> = ({
  image,
  setImage,
  denom,
  setDenom,
  type,
  setType,
  logo,
  setLogo,
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
  const theme: any = useTheme()
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
                wrapperStyle={{ color: denom === 'CSTOVE' && 'Not available' ? theme.ixoRed : theme.ixoNewBlue }}
                handleChange={(value): void => setDenom(String(value).toUpperCase())}
              />
            ) : (
              <Badge tagColor={theme.ixoDarkRed}>{denom}</Badge>
            )}
            {setType ? (
              <SelectWithModal
                width='150px'
                height='36px'
                label='Asset Type'
                value={type}
                handleChange={setType}
                options={Object.entries(EAssetType).map(([, value]) => value)}
              />
            ) : (
              <Badge tagColor={theme.ixoDarkOrange}>{type}</Badge>
            )}
          </Box>
          <IconUpload icon={logo} placeholder='Logo' handleChange={setLogo} />
        </FormRow>

        <FormRow>
          <InputWithLabel label='Asset Name' inputValue={tokenName} handleChange={setTokenName} />
        </FormRow>

        <FormRow>
          {setName ? (
            <InputWithLabel label='Class Name' inputValue={name} handleChange={setName} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
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
                <Typography color='grey700' weight='medium' size='md'>
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
              <Typography weight='bold' size='lg' color='grey700'>
                decimals
              </Typography>
            </Box>
          )}
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default TokenProfileForm
