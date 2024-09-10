import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'
import { Avatar } from 'screens/CurrentEntity/Components'
import CopyToClipboard from 'react-copy-to-clipboard'

import ProfileIcon from 'assets/images/icon-profile.svg'

import CopyIcon from 'assets/images/icon-copy.svg'
//
import StarIcon from 'assets/images/icon-star.svg'
//
import UserAstronautIcon from 'assets/images/icon-user-astronaut-solid.svg'
//
import UserNinjaIcon from 'assets/images/icon-user-ninja-solid.svg'
import { Card } from '../Card'
import { useAccount } from 'hooks/account'
import { successToast } from 'utils/toast'
// import PropoverButton from 'components/Button/PopoverButton'

const AccountCard = () => {
  const theme: any = useTheme()
  const { name, address } = useAccount()

  return (
    <Card
      icon={<ProfileIcon />}
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
                <SvgBox color={theme.ixoNewBlue} cursor='pointer' $svgWidth={6} $svgHeight={6}>
                  <CopyIcon />
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
