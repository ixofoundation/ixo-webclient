import Image from 'next/image'
import { Flex, useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { Card } from '../Card'
import { useAccount } from 'hooks/account'
import { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import ProfileModal from 'components/Header/components/ProfileModal'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { truncateString } from 'utils/formatters'
import { IconArrowRight, IconWalletSolid } from 'components/IconPaths'

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
        icon={IconWalletSolid}
        title='My Balance'
        columns={1}
        items={
          <>
            <Flex w='100%' gap={3} align='center' justify='space-between'>
              <Typography size='xl'>
                {Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(
                  Number(totalBalance),
                )}
              </Typography>
              <Image src={IconWalletSolid} alt='Wallet' width={5} height={5} color={theme.colors.blue[5]} />
            </Flex>
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
                  <Image src={IconArrowRight} alt='ArrowRight' width={5} height={5} color={theme.colors.blue[5]} />
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
                  <Image src={IconArrowRight} alt='ArrowRight' width={5} height={5} color={theme.colors.blue[5]} />
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
