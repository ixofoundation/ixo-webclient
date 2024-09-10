import { FlexBox } from 'components/App/App.styles'
import React from 'react'
import { isAccountAddress, isContractAddress } from 'utils/validation'

import CheckIcon from 'assets/images/icon-check-big.svg'

import TimesIcon from 'assets/images/icon-times.svg'
import { useTheme } from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  address: string
}

const AccountValidStatus: React.FC<Props> = ({ address, ...rest }): JSX.Element => {
  const theme: any = useTheme()
  const isValidAddress: boolean = isAccountAddress(address) || isContractAddress(address)

  return (
    <FlexBox
      $alignItems='center'
      $justifyContent='center'
      width='48px'
      height='48px'
      $borderRadius='8px'
      background={address ? (isValidAddress ? theme.ixoGreen : theme.ixoRed) : 'transparent'}
      {...rest}
    >
      {address && isValidAddress && <CheckIcon />}
      {address && !isValidAddress && <TimesIcon />}
    </FlexBox>
  )
}

export default AccountValidStatus
