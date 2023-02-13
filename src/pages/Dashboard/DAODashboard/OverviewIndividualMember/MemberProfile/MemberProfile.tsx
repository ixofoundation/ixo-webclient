import { FlexBox, GridContainer, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { HTMLAttributes } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import * as Toast from 'utils/toast'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { ReactComponent as PhoneIcon } from 'assets/images/icon-phone.svg'
import { ReactComponent as EmailIcon } from 'assets/images/icon-email.svg'
import { ReactComponent as LinkedInIcon } from 'assets/images/icon-linkedin.svg'
import { ReactComponent as TwitterIcon } from 'assets/images/icon-twitter.svg'
import { ReactComponent as GithubIcon } from 'assets/images/icon-github.svg'
import { ReactComponent as ShieldIcon } from 'assets/images/icon-shield.svg'
import { ReactComponent as CheckIcon } from 'assets/images/icon-check.svg'
import { ReactComponent as QRCodeIcon } from 'assets/images/icon-qrcode.svg'
import { Avatar } from '../../Components'

interface Props {
  member: {
    avatar?: string
    name?: string
    address: string
    role: string
    votingPower: number
    staking: number
    votes: number
    proposals: number
    status: 'approved' | 'pending' | 'rejected'
    verified: boolean
    administrator: boolean
    assignedAuthority: number
  }
}

const MemberProfile: React.FC<Props> = ({ member }): JSX.Element => {
  const { avatar, address, name, role } = member

  const ContactInfoIcon = ({ children }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <SvgBox
      borderRadius='100px'
      width='32px'
      height='32px'
      background={theme.ixoDarkBlue}
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      svgWidth={4.5}
      svgHeight={4.5}
      color={'white'}
      hover={{ background: theme.ixoBlue }}
    >
      {children}
    </SvgBox>
  )

  const CredentialIcon = ({ children }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <SvgBox
      borderRadius='100px'
      width='32px'
      height='32px'
      background={theme.ixoDarkBlue}
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      svgWidth={4.5}
      svgHeight={4.5}
      color={'white'}
      hover={{ background: theme.ixoGreen }}
    >
      {children}
    </SvgBox>
  )

  return (
    <FlexBox direction='column' gap={6} width='100%'>
      <FlexBox
        padding={7.5}
        background={theme.ixoGradientDark2}
        borderRadius='12px'
        alignItems='end'
        justifyContent='space-between'
        width='100%'
      >
        <FlexBox alignItems='center' gap={7.5}>
          <Avatar url={avatar} size={120} />
          <FlexBox direction='column' gap={1.5}>
            <Typography color='white' weight='medium' size='4xl'>
              {name}
            </Typography>
            <Typography color='light-blue' size='2xl'>
              {role}
            </Typography>
            <FlexBox alignItems='center' gap={2}>
              <Typography color='blue' size='lg'>
                {truncateString(address, 20)}
              </Typography>
              <CopyToClipboard text={address} onCopy={() => Toast.successToast(`Copied to clipboard`)}>
                <SvgBox color={theme.ixoNewBlue} cursor='pointer'>
                  <CopyIcon />
                </SvgBox>
              </CopyToClipboard>
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <FlexBox height='100%' gap={4}>
          <ContactInfoIcon>
            <PhoneIcon />
          </ContactInfoIcon>
          <ContactInfoIcon>
            <EmailIcon />
          </ContactInfoIcon>
          <ContactInfoIcon>
            <LinkedInIcon />
          </ContactInfoIcon>
          <ContactInfoIcon>
            <TwitterIcon />
          </ContactInfoIcon>
          <ContactInfoIcon>
            <GithubIcon />
          </ContactInfoIcon>
        </FlexBox>
      </FlexBox>

      <FlexBox alignItems='stretch' gap={6} width='100%'>
        <FlexBox
          width='100%'
          background='white'
          borderColor={theme.ixoGrey300}
          borderStyle='solid'
          borderWidth='1px'
          padding={7.5}
          borderRadius='12px'
          direction='column'
          gap={3}
        >
          <Typography weight='medium' size='2xl'>
            Credentials
          </Typography>
          <GridContainer columns={6} columnGap={4} rowGap={3}>
            <CredentialIcon>
              <ShieldIcon />
            </CredentialIcon>
            <CredentialIcon>
              <ShieldIcon />
            </CredentialIcon>
            <CredentialIcon>
              <ShieldIcon />
            </CredentialIcon>
            <CredentialIcon>
              <ShieldIcon />
            </CredentialIcon>
            <CredentialIcon>
              <ShieldIcon />
            </CredentialIcon>
            <CredentialIcon>
              <CheckIcon />
            </CredentialIcon>
            <CredentialIcon>
              <CheckIcon />
            </CredentialIcon>
          </GridContainer>
        </FlexBox>

        <FlexBox
          width='100%'
          background='white'
          borderColor={theme.ixoGrey300}
          borderStyle='solid'
          borderWidth='1px'
          padding={7.5}
          borderRadius='12px'
          direction='column'
          gap={3}
        >
          <Typography weight='medium' size='2xl'>
            Accounts
          </Typography>
          <FlexBox width='100%' direction='column' gap={3}>
            <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
              <Typography size='lg'>Impact Hub</Typography>
              <FlexBox alignItems='center' gap={2}>
                <Typography size='lg' color='blue'>
                  {truncateString(address, 20)}
                </Typography>
                <CopyToClipboard text={address} onCopy={() => Toast.successToast(`Copied to clipboard`)}>
                  <SvgBox color={theme.ixoNewBlue} svgWidth={5} svgHeight={5} cursor='pointer'>
                    <CopyIcon />
                  </SvgBox>
                </CopyToClipboard>
                <SvgBox color={theme.ixoNewBlue} svgWidth={4.5} svgHeight={4.5} cursor='pointer'>
                  <QRCodeIcon />
                </SvgBox>
              </FlexBox>
            </FlexBox>
            <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
              <Typography size='lg'>Cosmos</Typography>
              <FlexBox alignItems='center' gap={2}>
                <Typography size='lg' color='blue'>
                  {truncateString(address, 20)}
                </Typography>
                <CopyToClipboard text={address} onCopy={() => Toast.successToast(`Copied to clipboard`)}>
                  <SvgBox color={theme.ixoNewBlue} svgWidth={5} svgHeight={5} cursor='pointer'>
                    <CopyIcon />
                  </SvgBox>
                </CopyToClipboard>
                <SvgBox color={theme.ixoNewBlue} svgWidth={4.5} svgHeight={4.5} cursor='pointer'>
                  <QRCodeIcon />
                </SvgBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default MemberProfile
