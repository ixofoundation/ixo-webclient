import { Flex } from '@mantine/core'
import { useEffect } from 'react'
import HeadLine from './HeadLine'
import BalanceView from './BalanceView'
import { useUpdate20Balances } from 'hooks/cw20Balances'

const MyPortfolioPage = () => {
  const { update } = useUpdate20Balances()

  useEffect(() => {
    update()
  }, [])

  return (
    <Flex direction={'column'} gap={40}>
      <HeadLine />
      <BalanceView />
    </Flex>
  )
}

export default MyPortfolioPage
