import { Flex } from '@mantine/core'
import React from 'react'
import HeadLine from './HeadLine'
import BalanceView from './BalanceView'

const MyPortfolioPage = () => {
  return (
    <Flex direction={'column'} gap={40}>
      <HeadLine />
      <BalanceView />
    </Flex>
  )
}

export default MyPortfolioPage
