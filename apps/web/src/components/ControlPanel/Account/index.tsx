import Image from 'next/image'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { Avatar } from 'screens/CurrentEntity/Components'
import CopyToClipboard from 'react-copy-to-clipboard'
// // // import { Card } from '../Card'
import { useAccount } from 'hooks/account'
import { successToast } from 'utils/toast'
import { IconProfile } from 'components/IconPaths'
import { IconCopy } from 'components/IconPaths'
import { IconUserNinja } from 'components/IconPaths'
import { IconUserAstronaut } from 'components/IconPaths'
import { IconStar } from 'components/IconPaths'

// import PropoverButton from 'components/Button/PopoverButton'

const AccountCard = () => {
  const theme = useMantineTheme()
  const { name, address } = useAccount()

  return (
    <Card
      icon={<Image src={IconProfile} alt='Profile' width={5} height={5} color={theme.colors.blue[5]} />}
      title='My Connected Account'
      columns={1}
      items={
        <>
          <FlexBox width='100%' $gap={3} $alignItems='center'>
            <FlexBox style={{ flex: 1 }}>
              <Avatar size={60} borderWidth={0} />
            </FlexBox>
            <FlexBox
              p={3}
              width='100%'
              $alignItems='center'
              $justifyContent='space-between'
              $borderRadius='8px'
              background='#F7F8F9'
            >
              <Typography size='md'>{name}</Typography>
              <CopyToClipboard text={address} onCopy={() => successToast(`Copied to clipboard`)}>
                <SvgBox color={theme.colors.blue[5]} cursor='pointer' $svgWidth={6} $svgHeight={6}>
                  <Image src={IconCopy} alt='Copy' width={5} height={5} color={theme.colors.blue[5]} />
                </SvgBox>
              </CopyToClipboard>
            </FlexBox>
          </FlexBox>

          {/* <FlexBox width='100%' height='1px' background={'#EAEAEA'} /> */}
          {/* 
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <Typography size='md'>Credentials</Typography>

            <FlexBox $gap={2}>
              <PropoverButton
                icon={<Image src={IconStar} alt='Star' width={5} height={5} color={theme.colors.blue[5]} />}
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
                color={ theme.colors.blue[5]}
                $justifyContent='center'
                $alignItems='center'
              >
                <Image src={IconUserAstronaut} alt='UserAstronaut' width={5} height={5} color={theme.colors.blue[5]} />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                $borderRadius='8px'
                $svgWidth={5}
                $svgHeight={5}
                color={ theme.colors.blue[5]}
                $justifyContent='center'
                $alignItems='center'
              >
                <Image src={IconUserNinja} alt='UserNinja' width={5} height={5} color={theme.colors.blue[5]} />
              </SvgBox>
            </FlexBox>
          </FlexBox> */}
        </>
      }
    />
  )
}

export default AccountCard
