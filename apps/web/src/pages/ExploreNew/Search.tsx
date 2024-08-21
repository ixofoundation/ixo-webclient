import { Box, Button, Flex, Text } from '@mantine/core'
import { useExplorerContext } from 'contexts/ExplorerContext'
import { FeaturedEntities } from 'components/FeaturedEntities/FeaturedEntities'
import { EntitiesTable } from 'components/EntitiesTable/EntitiesTable'
import { ControlsIcon } from 'components/Icons/ControlsIcon'

const ExploreNew = () => {
  const { entities } = useExplorerContext()

  return (
    <Flex direction='column' w='100%' maw='100vw' h='100%' align='center'>
      <Box w='90%' mt={40} mx='auto'>
        <FeaturedEntities entities={entities.slice(0, 8)} />
      </Box>
      <Flex w='90%' justify='space-between' mt={30}>
        <Text>All Domains</Text>
        <Button leftSection={<ControlsIcon />} variant='outline' radius={'md'} style={{ outline: 'none' }}>
          Filter
        </Button>
      </Flex>
      <Flex w='90%' mt={10} wrap='wrap' gap='md' mx='auto'>
        <EntitiesTable entities={entities.slice(8)} />
      </Flex>
    </Flex>
  )
}

export default ExploreNew
