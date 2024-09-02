import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { Flex, Box, Text, Avatar } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { GetBalances } from 'lib/protocol'
import { useEffect, useMemo, useState } from 'react'
import { LiaPlusCircleSolid } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { ReactComponent as IXOIcon } from 'assets/images/icon-ixo.svg'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'

const CoinCard = ({ denom, amount }: { denom: string; amount: string }) => {
  return (
    <Box w='100%' px='md' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
      <Flex>
        <Avatar size={40}>
          <IXOIcon height={20} width={20} />
        </Avatar>
        <Flex direction='column' ml={4}>
          <Text size='md'>{convertMicroDenomToDenomWithDecimals(amount, 6)} IXO</Text>
          <Text size='xs' c='dimmed' mt={-4}>
            Funding Secured
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

const FundingAccountCard = () => {
  const [balances, setBalances] = useState<Coin[]>([])
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))

  useEffect(() => {
    const address = entity.accounts?.find((account) => account.name === 'admin')?.address
    if (address) {
      GetBalances(address).then((balance) => setBalances(balance))
    }
  }, [entity.accounts])

  const balanceTotal = useMemo(() => {
    return balances.reduce((acc, curr) => acc + parseInt(curr.amount), 0)
  }, [balances])

  if (balanceTotal === 0) {
    return null
  }

  return (
    <ActionCard title='Funding' icon={<LiaPlusCircleSolid />} editable={false}>
      <Flex gap={10}>
        {balances.map((balance) => (
          <CoinCard key={balance.denom} denom={balance.denom} amount={balance.amount} />
        ))}
      </Flex>
    </ActionCard>
  )
}

export default FundingAccountCard
