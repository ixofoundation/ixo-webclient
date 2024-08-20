import { Box, Flex, ScrollArea, Text, rem } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEntityHeadUIConfig } from 'redux/entities/entities.selectors'
import { EnhancedSearch } from 'components/EnhancedSearch/EnhancedSearch'

const ExploreLayout = () => {
  const headConfig = useSelector(selectEntityHeadUIConfig)
  const title = headConfig?.title
  return (
    <Flex w='100%' h='calc(-74px + 100vh)' direction={'column'}>
      <Flex w='100%' h={200} align={'center'} bg='linear-gradient(135deg, #05324C 0%, #149FBD 100%)' pos='relative'>
        <Box w='90%' mx='auto'>
          {/* <Text size={rem(30)} c='white'>
            {title}
          </Text>
          <Text size={rem(20)} c='white' mt={10}>
            Requests
          </Text> */}
        </Box>

        <Flex pos={'absolute'} bottom={0} left={0} right={0} mb={-20}>
          <EnhancedSearch />
        </Flex>
      </Flex>
      <ScrollArea w='100%' h='100%' bg='gray.2'>
        <Outlet />
      </ScrollArea>
    </Flex>
  )
}

export default ExploreLayout
