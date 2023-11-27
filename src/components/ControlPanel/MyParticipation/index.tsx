import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as StarIcon } from 'assets/images/icon-star.svg'
import { ReactComponent as UserAstronautIcon } from 'assets/images/icon-user-astronaut-solid.svg'
import { ReactComponent as UserNinjaIcon } from 'assets/images/icon-user-ninja-solid.svg'
import { ReactComponent as UserCheckIcon } from 'assets/images/icon-user-check-solid.svg'
import { Card } from '../Card'

const MyParticipationCard = () => {
  const theme: any = useTheme()

  return (
    <Card
      icon={<UserCheckIcon />}
      title='My Participation'
      columns={1}
      items={
        <>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography size='md'>WaterDAO</Typography>

            <FlexBox gap={2}>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                borderRadius='8px'
                svgWidth={5}
                svgHeight={5}
                color={theme.ixoNewBlue}
                justifyContent='center'
                alignItems='center'
              >
                <ProfileIcon />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                borderRadius='8px'
                svgWidth={5}
                svgHeight={5}
                color={theme.ixoNewBlue}
                justifyContent='center'
                alignItems='center'
              >
                <UserAstronautIcon />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                borderRadius='8px'
                svgWidth={5}
                svgHeight={5}
                color={theme.ixoNewBlue}
                justifyContent='center'
                alignItems='center'
              >
                <UserNinjaIcon />
              </SvgBox>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' height='1px' background={'#EAEAEA'} />

          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <FlexBox gap={2}>
              <Typography size='md'>Members</Typography>
              <Typography size='md' color='blue'>
                20%
              </Typography>
            </FlexBox>

            <FlexBox gap={2}>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                borderRadius='8px'
                svgWidth={5}
                svgHeight={5}
                color={theme.ixoNewBlue}
                justifyContent='center'
                alignItems='center'
              >
                <StarIcon />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                borderRadius='8px'
                svgWidth={5}
                svgHeight={5}
                color={theme.ixoNewBlue}
                justifyContent='center'
                alignItems='center'
              >
                <ProfileIcon />
              </SvgBox>
            </FlexBox>
          </FlexBox>

          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <FlexBox gap={2}>
              <Typography size='md'>Administration</Typography>
              <Typography size='md' color='blue'>
                20%
              </Typography>
            </FlexBox>

            <FlexBox gap={2}>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                borderRadius='8px'
                svgWidth={5}
                svgHeight={5}
                color={theme.ixoNewBlue}
                justifyContent='center'
                alignItems='center'
              >
                <UserAstronautIcon />
              </SvgBox>
              <SvgBox
                width='40px'
                height='40px'
                background='#F7F8F9'
                borderRadius='8px'
                svgWidth={5}
                svgHeight={5}
                color={theme.ixoNewBlue}
                justifyContent='center'
                alignItems='center'
              >
                <ProfileIcon />
              </SvgBox>
            </FlexBox>
          </FlexBox>
        </>
      }
    />
  )
}

export default MyParticipationCard
