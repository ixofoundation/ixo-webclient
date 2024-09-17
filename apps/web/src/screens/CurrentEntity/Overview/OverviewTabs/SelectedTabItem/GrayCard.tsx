import { Flex, FlexProps } from '@mantine/core'
import React from 'react'

function GrayCard({
  children,
  ...props
}: {
  children: React.ReactNode
} & FlexProps) {
  return (
    <Flex w='100%' align='center' gap={'md'} bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }} mt='md' {...props}>
      {children}
    </Flex>
  )
}

export default GrayCard
