import { Avatar, Flex } from '@mantine/core'
import { Typography } from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { TDAOGroupModel } from 'types/entities'
import { SvgBox } from 'components/App/App.styles'
import useCurrentEntity, { useCurrentEntityDAOGroup } from 'hooks/currentEntity'
import CopyToClipboard from 'react-copy-to-clipboard'
import { truncateString } from 'utils/formatters'
import { successToast } from 'utils/toast'

import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as FundingIcon } from 'assets/images/icon-funding.svg'
import { ReactComponent as CoinsIcon } from 'assets/images/icon-coins-solid.svg'
import { ReactComponent as PaperIcon } from 'assets/images/icon-paper.svg'
import { ReactComponent as HandshakeIcon } from 'assets/images/icon-handshake.svg'
import { GetBalances, GetTokenAsset } from 'lib/protocol'
import { customQueries } from '@ixo/impactxclient-sdk'
import { IxoCoinCodexRelayerApi } from 'hooks/configs'
import BigNumber from 'bignumber.js'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'

interface Props {
  daoGroup: TDAOGroupModel
}
const GroupCard: React.FC<Props> = ({ daoGroup }) => {
  const theme: any = useTheme()

  const { currentEntity: dao, daoController } = useCurrentEntity()
  const { isParticipating } = useCurrentEntityDAOGroup(daoGroup.coreAddress)

  const [lockedValue, setLockedValue] = useState('0')

  useEffect(() => {
    ;(async () => {
      const balances = await GetBalances(daoGroup.coreAddress)
      let value = '0'

      for (const balance of balances) {
        const microAmount = balance.amount
        const token = await GetTokenAsset(balance.denom)
        const tokenInfo = await customQueries.currency.findTokenInfoFromDenom(
          token.coinMinimalDenom,
          true,
          IxoCoinCodexRelayerApi,
        )
        if (!tokenInfo) {
          continue
        }

        const amount = convertMicroDenomToDenomWithDecimals(microAmount, token.coinDecimals)
        const { lastPriceUsd } = tokenInfo
        value = new BigNumber(value).plus(new BigNumber(amount).times(new BigNumber(lastPriceUsd))).toString()
      }

      setLockedValue(value)
    })()

    return () => {
      setLockedValue('0')
    }
  }, [daoGroup.coreAddress])

  if (!dao) {
    return null
  }
  return (
    <Flex
      w={'100%'}
      h={300}
      maw={220}
      py={32}
      direction={'column'}
      align={'center'}
      justify={'space-between'}
      style={{
        position: 'relative',
        border: `1px solid #436779`,
        borderRadius: 12,
        cursor: 'pointer',
        background: '#152B3F',
      }}
    >
      {daoController === daoGroup.coreAddress && (
        <Flex pos={'absolute'} top={10} left={10} py={2} px={6} style={{ borderRadius: 999 }} bg={theme.ixoNewBlue}>
          <Typography variant='secondary' size='xs' transform='uppercase'>
            Controller
          </Typography>
        </Flex>
      )}

      {isParticipating && (
        <Flex pos={'absolute'} top={10} right={10} py={2} px={6} style={{ borderRadius: 999 }} bg={theme.ixoNewBlue}>
          <Typography variant='secondary' size='xs' transform='uppercase'>
            Member
          </Typography>
        </Flex>
      )}

      <Flex direction='column' justify={'center'} align={'center'} gap={8}>
        <Avatar src={dao.profile?.logo} alt='' size={32} radius={100} />
        <Typography variant='primary' size='sm'>
          {dao.profile?.name}
        </Typography>
      </Flex>

      <Flex direction='column' justify={'center'} align={'center'} gap={4}>
        <Typography variant='primary' size='lg'>
          {daoGroup.config.name}
        </Typography>
        <CopyToClipboard text={daoGroup.coreAddress} onCopy={() => successToast(null, `Copied to clipboard`)}>
          <Flex align='center' gap={4} onClick={(e) => e.stopPropagation()}>
            <Typography color='blue' weight='medium' size='sm' hover={{ underline: true }}>
              {truncateString(daoGroup.coreAddress, 20, 'middle')}
            </Typography>
            <SvgBox color={theme.ixoNewBlue} svgWidth={5} svgHeight={5}>
              <CopyIcon />
            </SvgBox>
          </Flex>
        </CopyToClipboard>
      </Flex>

      <Flex gap={12}>
        <Flex direction={'column'} gap={8} w={'100%'}>
          <Flex align='center' gap={8} miw={80}>
            <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoNewBlue}>
              <ProfileIcon />
            </SvgBox>
            <Typography size='sm' color='white' weight='medium'>
              {daoGroup.votingModule.members.length}
            </Typography>
          </Flex>

          <Flex align='center' gap={8} miw={80}>
            {daoGroup.type === 'staking' && (
              <>
                <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoNewBlue}>
                  <CoinsIcon />
                </SvgBox>
                <Typography size='sm' color='white' weight='medium'>
                  Stake
                </Typography>
              </>
            )}
            {daoGroup.type !== 'staking' && (
              <>
                <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoNewBlue}>
                  <HandshakeIcon />
                </SvgBox>
                <Typography size='sm' color='white' weight='medium'>
                  Votes
                </Typography>
              </>
            )}
          </Flex>
        </Flex>

        <Flex direction={'column'} gap={8} w={'100%'}>
          <Flex align='center' gap={8} miw={80}>
            <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoNewBlue}>
              <FundingIcon />
            </SvgBox>
            <Typography size='sm' color='white' weight='medium'>
              {Intl.NumberFormat(undefined, {
                currency: 'USD',
                style: 'currency',
                notation: 'compact',
                maximumFractionDigits: 2,
              }).format(Number(lockedValue))}
            </Typography>
          </Flex>

          <Flex align='center' gap={8} miw={80}>
            <SvgBox svgWidth={6} svgHeight={6} color={theme.ixoNewBlue}>
              <PaperIcon />
            </SvgBox>
            <Typography size='sm' color='white' weight='medium'>
              {daoGroup.proposalModule.proposals.length}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GroupCard
