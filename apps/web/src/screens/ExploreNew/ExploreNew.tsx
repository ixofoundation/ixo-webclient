'use client'
import { Flex } from '@mantine/core'
import ExploreCard from 'components/ExploreCard/ExploreCard'
import { SearchSuggestion } from 'components/SearchSuggestion/SearchSuggestion'
import { useRouter } from 'next/navigation'

export interface SearchResult {
  id: string
  name: string
  image: string
  logo: string
  description: string
  filter: string
  type: string
  entityVerified: boolean
  startDate: string
  endDate: string
  owner: string
  relayerNode: string
  alsoKnownAs: string
  objectID: string
  brand: string
}

interface OutletContext {
  searchQuery: string
  searchResults: SearchResult[]
  updateSearchQuery: (query: string) => void
}

const ExploreNew: React.FC = () => {
  const router = useRouter()
  const { searchQuery, searchResults, updateSearchQuery } = {
    searchQuery: '',
    searchResults: [],
    updateSearchQuery: () => {},
  }

  const handleNavigate = (path: string) => {
    // updateSearchQuery(path)
  }

  const renderSearchResults = () => (
    <Flex direction='column' w='100%' h='100%' align='center' mt={80}>
      <Flex gap='lg' wrap='wrap' justify='center'>
        {searchResults.map((result: any) => (
          <ExploreCard
            key={result.objectID}
            image={result?.image}
            type={result?.type}
            name={result?.name}
            brand={result?.brand}
            logo={result?.logo}
            onClick={() => router.push(`/entity/${result.id}`)}
          />
        ))}
      </Flex>
    </Flex>
  )

  const renderSuggestions = () => (
    <Flex direction='column' w='100%' h='100%' align='center' mt={80}>
      <Flex w={'600px'} gap='lg'>
        <SearchSuggestion
          description='Create an entity'
          information='Use protcols to help you get start easier'
          onClick={() => handleNavigate('protocol')}
        />
        <SearchSuggestion
          description='Interesting oracles'
          information='Explore oracles that evaluate and verify data'
          onClick={() => handleNavigate('oracle')}
        />
        <SearchSuggestion
          description='New requests available'
          information='Complete tasks and get paid'
          onClick={() => handleNavigate('deed/request')}
        />
      </Flex>
    </Flex>
  )

  return searchQuery && searchResults.length > 0 ? renderSearchResults() : renderSuggestions()
}

export default ExploreNew
