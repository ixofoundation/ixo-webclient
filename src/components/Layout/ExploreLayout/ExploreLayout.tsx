import { Box, Flex, ScrollArea, Text } from '@mantine/core'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEntityHeadUIConfig } from 'redux/entities/entities.selectors'
import { useEffect, useState } from 'react'
// import { Search } from 'components/Search/Search'
import { InstantSearch } from 'react-instantsearch'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { algoliaAppId, algoliaIndexName, algoliaSearchKey } from 'constants/common'

const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey)

interface SearchResult {
  objectID: string
  title: string
  // Add other properties based on your Algolia index structure
}

const getTitle = (pathname: string, title: string = 'Explore') => {
  if (pathname === '/requests/create') {
    return 'Create a request using a protocol'
  }
  if (pathname === '/requests') {
    return 'Browse requests'
  }
  return title
}

const ExploreLayout: React.FC = () => {
  const headConfig = useSelector(selectEntityHeadUIConfig)
  const title = headConfig?.title

  const [heroHeight, setHeroHeight] = useState(200)

  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()

  // const handleSearchStateChange = (query: string, results: SearchResult[]) => {
  //   setSearchQuery(query)
  //   setSearchResults(results)
  // }

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query)
  }

  useEffect(() => {
    if (searchQuery) {
      setHeroHeight(200)
    } else {
      setHeroHeight(200)
    }
  }, [searchQuery])

  return (
    <Flex w='100%' h='calc(-74px + 100vh)' direction={'column'}>
      <InstantSearch searchClient={searchClient} indexName={algoliaIndexName}>
        <Flex
          w='100%'
          h={heroHeight}
          align={'center'}
          bg='linear-gradient(135deg, #05324C 0%, #149FBD 100%)'
          pos='relative'
          style={{ transition: 'height 0.5s ease-in-out' }}
        >
          <Box w='90%' mx='auto'>
            <Text fz='xl' c='white'>
              {getTitle(location.pathname, title)}
            </Text>
          </Box>

          {/* <Flex pos={'absolute'} bottom={0} left={0} right={0} mb={-20} justify='center' style={{ zIndex: 10 }}>
            <Search onSearchStateChange={handleSearchStateChange} searchQuery={searchQuery} />
          </Flex> */}
        </Flex>
        <ScrollArea w='100%' h='100%' bg='gray.2'>
          <Outlet context={{ searchQuery, searchResults, updateSearchQuery, setSearchResults }} />
        </ScrollArea>
      </InstantSearch>
    </Flex>
  )
}

export default ExploreLayout
