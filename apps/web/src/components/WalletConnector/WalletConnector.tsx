import React, { useEffect, useState } from 'react'
import { Text, Tabs, Flex, Box, Anchor } from '@mantine/core'
import { ReactComponent as KeplrIcon } from 'assets/images/icon-keplr.svg'
import { ReactComponent as ImpactXIcon } from 'assets/images/x-icon.svg'
import { ImpactXMobile } from './ImpactXMobileConnect'
import { KeplrConnect } from './KeplrConnect'
import Success from 'assets/icons/Success'
import { Button, ButtonTypes } from '../Form/Buttons'
import { useAccount } from 'hooks/account'
import ProfileModal from 'components/Header/components/ProfileModal'
import { GettingStarted } from './GettingStarted'
import { useTheme } from 'styled-components'

const WalletMenu = () => {
  const [activeTab, setActiveTab] = useState('init') // default to 'Keplr'

  const handleTabChange = (value: any) => {
    if (value) {
      // Check if the value is not null
      setActiveTab(value) // If it's a valid string, update the state
    }
  }

  return (
    <Tabs orientation='vertical' variant='pills' w={'650px'} h='500px' onChange={handleTabChange} value={activeTab}>
      <Flex direction='column'>
        <Text size='xl' style={{ weight: 700, color: 'white' }} mb={30}>
          Connect Wallet
        </Text>
        <Tabs.List>
          <Tabs.Tab value='init' hidden>
            <Text size='md' style={{ weight: 700, color: 'white' }}>
              Getting Started
            </Text>{' '}
          </Tabs.Tab>
          <Tabs.Tab value='Keplr' leftSection={<KeplrIcon scale={0.5} height={40} width={40} />}>
            <Text size='md' style={{ weight: 700, color: 'white' }}>
              Keplr
            </Text>{' '}
          </Tabs.Tab>
          <Tabs.Tab value='ImpactX' leftSection={<ImpactXIcon scale={2} height={40} width={40} />}>
            <Text size='md' style={{ weight: 700, color: 'white' }}>
              ImpactsX Mobile
            </Text>{' '}
          </Tabs.Tab>
        </Tabs.List>
      </Flex>

      <Tabs.Panel value='init' p='xs'>
        <GettingStarted />
      </Tabs.Panel>

      <Tabs.Panel value='Keplr' p='xs'>
        {activeTab === 'Keplr' && <KeplrConnect />}
      </Tabs.Panel>

      <Tabs.Panel value='ImpactX' p='xs'>
        {activeTab === 'ImpactX' && <ImpactXMobile />}
      </Tabs.Panel>
    </Tabs>
  )
}

const FundYourAccount = () => {
  const theme = useTheme() as any
  const { address, selectedWallet, updateBalances } = useAccount()

  const handledFunded = (): void => {
    updateBalances()
  }

  return (
    <Box>
      <Success width='64' fill={theme.ixoNewBlue} />
      <h3 style={{ textTransform: 'uppercase' }}>YOU HAVE SUCCESSFULLY INSTALLED {selectedWallet}</h3>
      <p>
        <span>NEXT STEP - </span>Fund your Account with IXO Tokens to Register your self-sovereign identity on the
        blockchain
        <br />
        (This requires a small amount of IXO for gas).
        <br />
        Your Account address is <span>{address || '-'}</span>
      </p>
      <Button type={ButtonTypes.dark} onClick={handledFunded}>
        I HAVE FUNDED MY ACCOUNT
      </Button>
      <Anchor
        href='https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6'
        target='_blank'
      >
        Why do I need to sign my credentials?
      </Anchor>
    </Box>
  )
}

// const LedgerAccount = ({ handleLedgerDid }: any) => (
//   <Box>
//     <p>
//       YOUR ACCOUNT HAS SUCCESSFULLY BEEN FUNDED
//       <br />
//       Now you can Register your self-sovereign identity on the blockchain, which will deduct a small gas fee from your
//       account.
//     </p>
//     <Button type={ButtonTypes.dark} onClick={handleLedgerDid}>
//       SIGN THIS REQUEST
//     </Button>
//   </Box>
// )

const AccountModal = () => (
  <Box>
    <ProfileModal />
  </Box>
)

export const WalletConnector = () => {
  const { address, registered } = useAccount()
  const [modalStep, setModalStep] = useState(0)

  const modalSteps = [
    // Step 0: No connected account
    {
      title: 'Connect Your Wallet',
      content: <WalletMenu />,
    },
    // Step 1: Fund account
    {
      title: 'Fund Your Account',
      content: <FundYourAccount />,
    },
    {
      title: 'Account',
      content: <AccountModal />,
    },
  ]

  useEffect(() => {
    if (!address) {
      setModalStep(0)
    } else if (address && !registered) {
      setModalStep(1)
    } else {
      setModalStep(2) // Assuming step 2 is already implemented as the registered state
    }
  }, [address, registered])

  return modalSteps[modalStep].content
}
