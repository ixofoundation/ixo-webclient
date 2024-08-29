import { SearchBox, useInstantSearch } from 'react-instantsearch'
import './theme.css'
import { Box } from '@mantine/core'
import { useEffect, useCallback } from 'react'
import { algoliaIndexName } from 'constants/common'

interface SearchProps {
  onSearchStateChange: (query: string, results: any[]) => void
  searchQuery: string
}

export const Search: React.FC<SearchProps> = ({ onSearchStateChange, searchQuery }) => {
  const { results, uiState, setUiState } = useInstantSearch()

  useEffect(() => {
    onSearchStateChange(uiState[algoliaIndexName].query || '', results?.hits || [])
  }, [results, uiState[algoliaIndexName].query, onSearchStateChange])

  const queryHook = useCallback(
    (query: string, search: (q: string) => void) => {
      setUiState((state) => ({
        ...state,
        [algoliaIndexName]: { ...state[algoliaIndexName], query },
      }))
      search(query)
    },
    [setUiState],
  )

  useEffect(() => {
    if (searchQuery) {
      setUiState((state) => ({
        ...state,
        [algoliaIndexName]: { ...state[algoliaIndexName], query: searchQuery },
      }))
    }
  }, [searchQuery, setUiState])

  return (
    <Box w={600}>
      <SearchBox
        classNames={{
          root: 'custom-searchbox-root',
          form: 'custom-searchbox-form',
          input: 'custom-searchbox-input',
          submit: 'custom-searchbox-submit',
          reset: 'custom-searchbox-reset',
        }}
        placeholder='Search...'
        submitIconComponent={() => null}
        resetIconComponent={() => null}
        queryHook={queryHook}
      />
    </Box>
  )
}
