import { Card, CardProps } from './Card'
import { Flex, Text } from '@mantine/core'

export type AssetCreditsCardProps = Omit<CardProps, 'children'> & {
  carbonAmountProduced?: number
  carbonAmountRetired?: number
  carbonAmountClaimable?: number
}

export const AssetCreditsCard = ({
  width = '100%',
  height = '100%',
  carbonAmountClaimable,
  carbonAmountRetired,
  carbonAmountProduced,
  ...props
}: AssetCreditsCardProps) => {
  return (
    <Card width={width} height={height} {...props}>
      <Flex direction='column' justify='center' w='100%' h='100%'>
        <Flex w='100%' justify={'center'} align={'flex-end'} my={8}>
          <Text fw='bolder' size='xl'>
            {carbonAmountProduced || 0} CARBON
          </Text>
          <Text fw='bolder' ml={4}>
            {' '}
            produced
          </Text>
        </Flex>
        <Flex w='100%' justify={'center'} align={'flex-end'} my={8}>
          <Text fw='bolder' size='xl' c='#6FCF97'>
            {carbonAmountRetired || 0} CARBON
          </Text>
          <Text fw='bolder' ml={4} c='#6FCF97'>
            {' '}
            retired
          </Text>
        </Flex>
        <Flex w='100%' justify={'center'} align={'flex-end'} my={8}>
          <Text fw='bolder' size='xl' c='#00D2FF'>
            {carbonAmountClaimable || 0} CARBON
          </Text>{' '}
          <Text fw='bolder' c='#00D2FF' ml={4}>
            {' '}
            claimable
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
