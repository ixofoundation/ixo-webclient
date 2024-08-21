import { Flex } from '@mantine/core'
import { SearchSuggestion } from 'components/SearchSuggestion/SearchSuggestion'

const ExploreNew = () => {
  return (
    <Flex direction='column' w='100%' maw='100vw' h='100%' align='center' mt={80}>
      <Flex w={'600px'} gap='lg'>
        <SearchSuggestion description='Search for a specific topic' information='Search for a specific topic' />
        <SearchSuggestion description='Search for a specific topic' information='Search for a specific topic' />
        <SearchSuggestion description='Search for a specific topic' information='Search for a specific topic' />
      </Flex>
    </Flex>
  )
}

export default ExploreNew
