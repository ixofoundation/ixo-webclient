import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useTheme } from 'styled-components'
import { Typography } from 'components/Typography'
import { ReactComponent as ArrowRightIcon } from 'assets/images/icon-arrow-right.svg'
import { ReactComponent as WalletIcon } from 'assets/images/icon-wallet-solid.svg'
import { Card } from '../Card'

const BalanceCard = () => {
  const theme: any = useTheme()

  return (
    <Card
      icon={<WalletIcon />}
      title='Balance'
      columns={1}
      items={
        <>
          <FlexBox width='100%' gap={3} alignItems='center' justifyContent='space-between'>
            <Typography size='xl'>$12,456.12</Typography>
            <SvgBox
              borderRadius='8px'
              width='40px'
              height='40px'
              background={theme.ixoNewBlue}
              justifyContent='center'
              alignItems='center'
              svgWidth={5}
              svgHeight={5}
              color={theme.ixoWhite}
              cursor='pointer'
            >
              <ArrowRightIcon />
            </SvgBox>
          </FlexBox>

          <FlexBox width='100%' gap={2}>
            <FlexBox
              p={3}
              gap={2}
              alignItems='center'
              width='100%'
              background={'#F7F8F9'}
              borderRadius='8px'
              cursor='pointer'
            >
              <SvgBox svgWidth={5} svgHeight={5} transform='rotateZ(-45deg)'>
                <ArrowRightIcon />
              </SvgBox>
              <Typography size='sm'>Send</Typography>
            </FlexBox>
            <FlexBox
              p={3}
              gap={2}
              alignItems='center'
              width='100%'
              background={'#F7F8F9'}
              borderRadius='8px'
              cursor='pointer'
            >
              <SvgBox svgWidth={5} svgHeight={5} transform='rotateZ(135deg)'>
                <ArrowRightIcon />
              </SvgBox>
              <Typography size='sm'>Receive</Typography>
            </FlexBox>
          </FlexBox>
        </>
      }
    />
  )
}

export default BalanceCard
