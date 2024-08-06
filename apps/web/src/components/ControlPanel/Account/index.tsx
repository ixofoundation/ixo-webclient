import { Typography } from 'components/Typography'
import { Avatar } from 'screens/CurrentEntity/Components'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Card } from '../Card'
import { useAccount } from 'hooks/account'
import { successToast } from 'utils/toast'
import { useMantineTheme, Flex } from '@mantine/core'
import Image from 'next/image'
import { IconCopy, IconProfile } from 'components/IconPaths'

const AccountCard = () => {
  const theme: any = useMantineTheme()
  const { name, address } = useAccount()

  return (
    <Card
      icon={<Image src={IconProfile} alt='Send' width={5} height={5} color={theme.colors.blue[5]} />}
      title='My Connected Account'
      columns={1}
      items={
        <>
          <Flex w='100%' gap={3} align='center'>
            <Flex style={{ flex: 1 }}>
              <Avatar size={60} borderWidth={0} />
            </Flex>
            <Flex
              p={3}
              w='100%'
              align='center'
              justify='space-between'
              style={{ borderRadius: '8px', background: '#F7F8F9' }}
            >
              <Typography size='md'>{name}</Typography>
              <CopyToClipboard text={address} onCopy={() => successToast(`Copied to clipboard`)}>
                <Image src={IconCopy} alt='Send' width={5} height={5} color={theme.colors.blue[5]} />
              </CopyToClipboard>
            </Flex>
          </Flex>

          {/* <FlexBox width='100%' height='1px' background={'#EAEAEA'} /> */}
          {/* 
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <Typography size='md'>Credentials</Typography>

            <FlexBox $gap={2}>
              <PropoverButton
                icon={<StarIcon />}
                title={'KYC Credential'}
                description='This is a description of the Credential. It can say something about why the Credential is needed.'
              />

              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.ixoNewBlue}
                $justifyContent='center'
                $alignItems='center'
              >
                <UserAstronautIcon />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.ixoNewBlue}
                $justifyContent='center'
                $alignItems='center'
              >
                <UserNinjaIcon />
              </SvgBox>
            </FlexBox>
          </FlexBox> */}
        </>
      }
    />
  )
}

export default AccountCard
