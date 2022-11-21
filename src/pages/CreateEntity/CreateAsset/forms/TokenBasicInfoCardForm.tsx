import React from 'react'
import {
  FormWrapper,
  FormHeader,
  FormBody,
  FormRow,
  Badge,
} from './TokenBasicInfoCardForm.styles'
import {
  HeadlineMetric,
  IconUpload,
  ImageUpload,
  Input,
  InputWithLabel,
  SelectWithLabel,
} from '../../components'
import { thousandSeparator } from 'common/utils/formatters'
import { Box, theme, Typography } from 'modules/App/App.styles'
import { EAssetType } from 'types'

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

const TokenAttributeCardForm: React.FC<Props> = ({
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
          <Box className="d-flex align-items-center" style={{ gap: 4 }}>
            {setDenom ? (
              <InputWithLabel
                width="110px"
                height="36px"
                label="DENOM"
                inputValue={denom}
                error={denom === 'CSTOVE' && 'Not available'} // TODO:
                handleChange={(value): void =>
                  setDenom(String(value).toUpperCase())
                }
              />
            ) : (
              <Badge tagColor={theme.ixoDarkRed}>{denom}</Badge>
            )}
            {setType ? (
              <SelectWithLabel
                width="150px"
                height="36px"
                label="Asset Type"
                value={type}
                handleChange={setType}
              />
            ) : (
              <Badge tagColor={theme.ixoNewOrange}>{type}</Badge>
            )}
          </Box>
          <IconUpload icon={icon} handleChange={setIcon} />
        </FormRow>

        <FormRow>
          <InputWithLabel
            label="Asset Name"
            inputValue={tokenName}
            handleChange={setTokenName}
          />
        </FormRow>

        <FormRow>
          {setName ? (
            <InputWithLabel
              label="Class Name"
              inputValue={name}
              handleChange={setName}
            />
          ) : (
            <Typography
              color={theme.ixoMediumGrey}
              fontSize="20px"
              lineHeight="28px"
              fontWeight={700}
            >
              {name}
            </Typography>
          )}
        </FormRow>

        <FormRow>
          <HeadlineMetric />
        </FormRow>

        <FormRow className="align-items-baseline" style={{ gap: 4 }}>
          {setMaxSupply ? (
            <InputWithLabel
              label="Max Amount (or blank if unlimited)"
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
              <Typography
                color={'#01283B'}
                fontWeight={600}
                fontSize="23px"
                lineHeight="27px"
              >
                # {SN}
              </Typography>
              {maxSupply && (
                <Typography
                  color={theme.ixoMediumGrey}
                  fontWeight={500}
                  fontSize="14px"
                  lineHeight="16px"
                >
                  of {parseFloat(String(maxSupply)).toLocaleString()}
                </Typography>
              )}
            </>
          )}
        </FormRow>

        <FormRow>
          {setDecimals && (
            <Box className="d-flex align-items-center" style={{ gap: 10 }}>
              <Input
                width="45px"
                className="text-center"
                placeholder="0"
                maxLength={2}
                inputValue={decimals}
                handleChange={(value): void => {
                  const val = value.replace(/[^0-9]/g, '')
                  if (!isNaN(val)) {
                    setDecimals(Number(val))
                  }
                }}
              />
              <Typography
                fontWeight={700}
                fontSize="18px"
                lineHeight="18px"
                color={theme.ixoMediumGrey}
              >
                decimals
              </Typography>
            </Box>
          )}
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default TokenAttributeCardForm
