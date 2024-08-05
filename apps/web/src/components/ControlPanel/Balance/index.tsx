import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
// import { ReactComponent as ArrowRightIcon } from '/public/assets/images/icon-arrow-right.svg'
import { ReactComponent as WalletIcon } from '/public/assets/images/icon-wallet-solid.svg'
import { Card } from '../Card'
import { useAccount } from 'hooks/account'
import { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import ProfileModal from 'components/Header/components/ProfileModal'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { truncateString } from 'utils/formatters'

const BalanceCard = () => {
  const theme = useMantineTheme()
  const { name, nativeTokens } = useAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalBalance = useMemo(() => {
    return nativeTokens.reduce(
      (prev, cur) =>
        new BigNumber(cur.balance)
          .times(new BigNumber(cur.lastPriceUsd || 0))
          .plus(new BigNumber(prev))
          .toString(),
      '0',
    )
  }, [nativeTokens])

  const renderModalHeader = (): {
    title: string
    titleNoCaps?: boolean
  } => {
    if (name) {
      return {
        title: 'Hi, ' + truncateString(name, 20, 'end'),
        titleNoCaps: true,
      }
    } else {
      return {
        title: '',
        titleNoCaps: undefined,
      }
    }
  }
  const onButtonClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Card
        icon={<WalletIcon />}
        title='My Balance'
        columns={1}
        items={
          <>
            <FlexBox width='100%' $gap={3} $alignItems='center' $justifyContent='space-between'>
              <Typography size='xl'>
                {Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(
                  Number(totalBalance),
                )}
              </Typography>
              <SvgBox
                $borderRadius='8px'
                width='40px'
                height='40px'
                background={theme.ixoNewBlue}
                $justifyContent='center'
                $alignItems='center'
                $svgWidth={5}
                $svgHeight={5}
                color={theme.ixoWhite}
                cursor='pointer'
                onClick={onButtonClick}
              >
                <WalletIcon />
              </SvgBox>
            </FlexBox>
            {/* 
            <FlexBox width='100%' $gap={2}>
              <FlexBox
                p={3}
                $gap={2}
                $alignItems='center'
                width='100%'
                background={'#F7F8F9'}
                $borderRadius='8px'
                cursor='pointer'
              >
                <SvgBox $svgWidth={5} $svgHeight={5} transform='rotateZ(-45deg)'>
                  <ArrowRightIcon />
                </SvgBox>
                <Typography size='sm'>Send</Typography>
              </FlexBox>
              <FlexBox
                p={3}
                $gap={2}
                $alignItems='center'
                width='100%'
                background={'#F7F8F9'}
                $borderRadius='8px'
                cursor='pointer'
              >
                <SvgBox $svgWidth={5} $svgHeight={5} transform='rotateZ(135deg)'>
                  <ArrowRightIcon />
                </SvgBox>
                <Typography size='sm'>Receive</Typography>
              </FlexBox>
            </FlexBox> */}
          </>
        }
      />
      <ModalWrapper
        isModalOpen={isModalOpen}
        handleToggleModal={() => setIsModalOpen(false)}
        header={renderModalHeader()}
      >
        <ProfileModal />
      </ModalWrapper>
    </>
  )
}

export default BalanceCard
