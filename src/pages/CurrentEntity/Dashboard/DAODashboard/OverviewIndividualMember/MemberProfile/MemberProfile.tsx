import { FlexBox, GridContainer, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { HTMLAttributes, useEffect, useState } from 'react'
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
import { Avatar } from '../../../Components'
import { useGetMemberProfile } from 'hooks/dao'
import { useHistory, useParams } from 'react-router-dom'

const MemberProfile: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId, address } = useParams<{ entityId: string; groupId: string; address: string }>()
  const { data, error } = useGetMemberProfile(address)
  const [displayInfo, setDisplayInfo] = useState('')

  useEffect(() => {
    if (error) {
      history.push(`/entity/${entityId}/dashboard/membership`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const ContactInfoIcon = ({ children, content }: any): JSX.Element => (
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
      onMouseEnter={() => setDisplayInfo(content)}
      onMouseLeave={() => setDisplayInfo('')}
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
          <Avatar url={data?.avatar} size={120} />
          <FlexBox direction='column' gap={1.5}>
            <Typography color='white' weight='medium' size='4xl'>
              {data?.name}
            </Typography>
            <Typography color='light-blue' size='2xl'>
              {data?.role}
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
        <FlexBox direction='column' alignItems='end' height='100%' gap={4}>
          <FlexBox>
            <Typography color='white'>{displayInfo}</Typography>
          </FlexBox>
          <FlexBox gap={4}>
            <ContactInfoIcon content={data?.phoneNumber}>
              <PhoneIcon />
            </ContactInfoIcon>
            <ContactInfoIcon content={data?.email}>
              <EmailIcon />
            </ContactInfoIcon>
            <ContactInfoIcon content={data?.socials?.linkedIn}>
              <LinkedInIcon />
            </ContactInfoIcon>
            <ContactInfoIcon content={data?.socials?.twitter}>
              <TwitterIcon />
            </ContactInfoIcon>
            <ContactInfoIcon content={data?.socials?.github}>
              <GithubIcon />
            </ContactInfoIcon>
          </FlexBox>
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
            {Object.entries(data?.accounts ?? {}).map(([key, value]) => (
              <FlexBox key={key} width='100%' justifyContent='space-between' alignItems='center'>
                <Typography size='lg'>{key}</Typography>
                <FlexBox alignItems='center' gap={2}>
                  <Typography size='lg' color='blue'>
                    {truncateString(value as string, 20)}
                  </Typography>
                  <CopyToClipboard text={value as string} onCopy={() => Toast.successToast(`Copied to clipboard`)}>
                    <SvgBox color={theme.ixoNewBlue} svgWidth={5} svgHeight={5} cursor='pointer'>
                      <CopyIcon />
                    </SvgBox>
                  </CopyToClipboard>
                  <SvgBox color={theme.ixoNewBlue} svgWidth={4.5} svgHeight={4.5} cursor='pointer'>
                    <QRCodeIcon />
                  </SvgBox>
                </FlexBox>
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default MemberProfile
