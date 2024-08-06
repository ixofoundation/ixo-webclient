import Image from 'next/image'
import React from 'react'
import { isAccountAddress, isContractAddress } from 'utils/validation'
import { Flex, useMantineTheme } from '@mantine/core'
import { IconTimes } from 'components/IconPaths'
import { IconCheck } from 'components/IconPaths'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  address: string
}

const AccountValidStatus: React.FC<Props> = ({ address, ...rest }): JSX.Element => {
  const theme = useMantineTheme()
  const isValidAddress: boolean = isAccountAddress(address) || isContractAddress(address)

  return (
    <Flex
      align='center'
      justify='center'
      w='48px'
      h='48px'
      style={{
        borderRadius: '8px',
        background: address ? (isValidAddress ? theme.colors.green[5] : theme.colors.red[5]) : 'transparent',
      }}
      {...rest}
    >
      {address && isValidAddress && (
        <Image src={IconCheck} alt='Check' width={5} height={5} color={theme.colors.blue[5]} />
      )}
      {address && !isValidAddress && (
        <Image src={IconTimes} alt='Times' width={5} height={5} color={theme.colors.blue[5]} />
      )}
    </Flex>
  )
}

export default AccountValidStatus
