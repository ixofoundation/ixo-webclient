import { FlexBox, theme } from 'components/App/App.styles'
import React from 'react'
import { isAccountAddress } from 'utils/validation'
import { ReactComponent as CheckIcon } from 'assets/images/icon-check-big.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  address: string
}

const AccountValidStatus: React.FC<Props> = ({ address, ...rest }): JSX.Element => {
  const isValidAddress: boolean = isAccountAddress(address)

  return (
    <FlexBox
      alignItems='center'
      justifyContent='center'
      width='48px'
      height='48px'
      borderRadius='8px'
      background={address ? (isValidAddress ? theme.ixoGreen : theme.ixoRed) : theme.ixoGrey500}
      {...rest}
    >
      {address && isValidAddress && <CheckIcon />}
      {address && !isValidAddress && <TimesIcon />}
    </FlexBox>
  )
}

export default AccountValidStatus
