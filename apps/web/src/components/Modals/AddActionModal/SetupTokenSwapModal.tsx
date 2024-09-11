import { Box, FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { NATIVE_MICRODENOM } from 'constants/chains'
import { AccountValidStatus, Button, Dropdown, Input } from 'screens/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { TProposalActionModel } from 'types/entities'
import { isAccountAddress } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'






import { useTheme } from 'styled-components'

export interface Counterparty {
  address: string
  type: 'cw20' | 'native'
  denomOrAddress: string
  amount: number
  decimals: number
}

export interface PerformTokenSwapData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to create a new swap contract or enter an existing
  // address. When `true`, it shows the status of the swap.
  // `tokenSwapContractAddress` should be defined and valid when this is `true`.
  contractChosen: boolean

  tokenSwapContractAddress?: string

  selfParty?: Omit<Counterparty, 'address'>
  counterparty?: Counterparty
}

const initialState: PerformTokenSwapData = {
  contractChosen: false, // | 'fund'
  tokenSwapContractAddress: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupTokenSwapModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const theme: any = useTheme()
  const [formData, setFormData] = useState<PerformTokenSwapData>(initialState)
  const [reviewing, setReviewing] = useState(false)

  const validate = useMemo(() => isAccountAddress(formData.tokenSwapContractAddress), [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    if (!reviewing) {
      setReviewing(true)
    } else {
      onSubmit && onSubmit({ ...action, data: formData })
      onClose()
    }
  }

  return (
    <SetupActionModalTemplate
      width='520px'
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      {!reviewing ? (
        <>
          <FlexBox width='100%' $gap={4}>
            <Button
              variant={formData.contractChosen === false ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('contractChosen', false)}
              style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
            >
              Create Swap
            </Button>
            <Button
              variant={formData.contractChosen === true ? 'primary' : 'secondary'}
              onClick={() => handleUpdateFormData('contractChosen', true)}
              style={{ width: '100%', textTransform: 'capitalize', fontWeight: 500 }}
            >
              Fund Swap
            </Button>
          </FlexBox>

          <FlexBox width='100%' $direction='column'>
            <Typography size='md'>
              To perform a token swap, one DAO must first create it, configuring the number of tokens each party must
              contribute. Then, both DAOs must add their funds. Once both DAOs have added their funds to the swap, the
              swap will be performed immediately.
            </Typography>
            <Typography size='md'>
              {formData.contractChosen
                ? `In this step, you will choose a token swap that you (or the counterparty) has already initiated. After you fund a swap, you can withdraw the tokens you funded unless (or until) the counterparty has paid. Likewise, the counterparty can withdraw the tokens they funded until you pay.`
                : `In this step, you will create the token swap. This creation step describes how many funds each party needs to send for the swap to complete. No funds will be transferred at this time.`}
            </Typography>
          </FlexBox>

          <FlexBox $direction='column' width='100%' $gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              {formData.contractChosen ? `Existing Token Swap to fund` : `Who is the Counterparty?`}
            </Typography>

            <FlexBox width='100%' $gap={4}>
              <Input
                name='token_swap_contract_address'
                placeholder='Paste Address'
                inputValue={formData.tokenSwapContractAddress}
                handleChange={(value) => handleUpdateFormData('tokenSwapContractAddress', value)}
              />
              <AccountValidStatus address={formData.tokenSwapContractAddress ?? ''} style={{ flex: '0 0 48px' }} />
            </FlexBox>
          </FlexBox>

          {!formData.contractChosen && (
            <>
              <FlexBox $direction='column' width='100%' $gap={2}>
                <Typography color='black' weight='medium' size='xl'>
                  What do you need to receive?
                </Typography>

                <FlexBox width='100%' $gap={4}>
                  <Input
                    inputValue={formData.selfParty?.amount}
                    handleChange={(value) =>
                      handleUpdateFormData('selfParty', { ...formData.selfParty, amount: value })
                    }
                    style={{ textAlign: 'right' }}
                  />
                  {/* TODO: missing options */}
                  <Dropdown
                    name={'token'}
                    value={formData.selfParty?.denomOrAddress}
                    options={[{ value: NATIVE_MICRODENOM, text: '$IXO' }]}
                    onChange={(e) => handleUpdateFormData('denom', e.target.value)}
                    style={{ textAlign: 'center' }}
                  />
                </FlexBox>
              </FlexBox>

              <FlexBox $direction='column' width='100%' $gap={2}>
                <Typography color='black' weight='medium' size='xl'>
                  What do you need to send?
                </Typography>

                <FlexBox width='100%' $gap={4}>
                  <Input
                    inputValue={formData.selfParty?.amount}
                    handleChange={(value) =>
                      handleUpdateFormData('selfParty', { ...formData.selfParty, amount: value })
                    }
                    style={{ textAlign: 'right' }}
                  />
                  {/* TODO: missing options */}
                  <Dropdown
                    name={'token'}
                    value={formData.selfParty?.denomOrAddress}
                    options={[{ value: NATIVE_MICRODENOM, text: '$IXO' }]}
                    onChange={(e) => handleUpdateFormData('denom', e.target.value)}
                    style={{ textAlign: 'center' }}
                  />
                </FlexBox>
              </FlexBox>
            </>
          )}
        </>
      ) : (
        <>
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <FlexBox
              width='180px'
              $direction='column'
              p={4}
              $justifyContent='space-between'
              $alignItems='center'
              $borderRadius='1rem'
              background={theme.ixoGrey100}
              $gap={3}
            >
              <FlexBox $alignItems='center' $gap={3}>
                <Box width='32px' height='32px' $borderRadius='100%' background={theme.ixoGrey700} />
                <Typography size='xl'>TestDAO</Typography>
              </FlexBox>
              <FlexBox>
                <Typography size='xl'>1 $IXO</Typography>
              </FlexBox>
              <FlexBox $gap={1} $alignItems='center' color={theme.ixoRed}>
                <SvgBox color={theme.ixoRed} $svgWidth={5} $svgHeight={5}>
                  <img src="/assets/images/icon-times.svg"  />
                </SvgBox>
                <Typography>Unpaid</Typography>
              </FlexBox>
            </FlexBox>

            <SvgBox color='black'>
              <img src="/assets/images/icon-sync-alt-solid.svg"  />
            </SvgBox>

            <FlexBox
              width='180px'
              $direction='column'
              p={4}
              $justifyContent='space-between'
              $alignItems='center'
              $borderRadius='1rem'
              background={theme.ixoGrey100}
              $gap={3}
            >
              <FlexBox $alignItems='center' $gap={3}>
                <Box width='32px' height='32px' $borderRadius='100%' background={theme.ixoGrey700} />
                <Typography size='xl'>OtherTestDAO</Typography>
              </FlexBox>
              <FlexBox>
                <Typography size='xl'>2 $JUNO</Typography>
              </FlexBox>
              <FlexBox $gap={1} $alignItems='center' color={theme.ixoRed}>
                <SvgBox color={theme.ixoRed} $svgWidth={5} $svgHeight={5}>
                  <img src="/assets/images/icon-times.svg"  />
                </SvgBox>
                <Typography>Unpaid</Typography>
              </FlexBox>
            </FlexBox>
          </FlexBox>

          <FlexBox>
            <Typography size='md'>This action sends 1$IXO to the token contract below.</Typography>
          </FlexBox>

          <FlexBox $alignItems='center' $gap={4}>
            <Typography size='xl'>{formData.tokenSwapContractAddress}</Typography>
            <SvgBox color='black'>
              <img src="/assets/images/icon-copy.svg"  />
            </SvgBox>
          </FlexBox>
        </>
      )}
    </SetupActionModalTemplate>
  )
}

export default SetupTokenSwapModal
