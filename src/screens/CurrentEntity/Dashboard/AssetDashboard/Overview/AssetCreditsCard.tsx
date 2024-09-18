import { Flex, Text } from '@mantine/core'
import { Card } from 'screens/CurrentEntity/Components'
import { mantineThemeColors } from 'styles/mantine'

export type AssetCreditsCardProps = {
  label: string
  icon?: JSX.Element
  carbonAmountProduced?: number
  carbonAmountRetired?: number
  carbonAmountClaimable?: number
}

export const AssetCreditsCard = ({
  label,
  icon,
  carbonAmountClaimable = 0,
  carbonAmountRetired = 0,
  carbonAmountProduced = 0,
}: AssetCreditsCardProps) => {
  return (
    <Card label={label} icon={icon}>
      <Flex direction='column' justify='center' w='100%' h='100%'>
        <Flex w='100%' justify={'center'} align={'baseline'} my={8} gap={4}>
          <Text fw='bolder' size='xl'>
            {carbonAmountProduced.toLocaleString()} CARBON credits
          </Text>
          <Text fw='bolder' ml={4}>
            produced
          </Text>
        </Flex>
        <Flex w='100%' justify={'center'} align={'baseline'} my={8} gap={4}>
          <Text fw='bolder' size='xl' c={mantineThemeColors['ixo-green'][6]}>
            {carbonAmountRetired.toLocaleString()} CARBON credits
          </Text>
          <Text fw='bolder' ml={4} c={mantineThemeColors['ixo-green'][6]}>
            retired
          </Text>
        </Flex>
        <Flex w='100%' justify={'center'} align={'baseline'} my={8} gap={4}>
          <Text fw='bolder' size='xl' c={mantineThemeColors['ixo-blue'][6]}>
            {carbonAmountClaimable.toLocaleString()} CARBON credits
          </Text>
          <Text fw='bolder' c={mantineThemeColors['ixo-blue'][6]} ml={4}>
            claimable
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
