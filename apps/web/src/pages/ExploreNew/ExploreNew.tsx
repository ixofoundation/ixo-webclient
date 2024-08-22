import { Flex } from '@mantine/core'
import { SearchSuggestion } from 'components/SearchSuggestion/SearchSuggestion'
import { useNavigate } from 'react-router-dom'

const ExploreNew = () => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    const encodedPath = encodeURIComponent(path)
    navigate(`/explore-new/search?query=${encodedPath}`)
  }

  return (
    <Flex direction='column' w='100%' maw='100vw' h='100%' align='center' mt={80}>
      <Flex w={'600px'} gap='lg'>
        <SearchSuggestion
          description='Create an entity'
          information='4 Protocols to get you started'
          onClick={() => handleNavigate('protocol/project,protocol/dao,protocol/request,protocol/oracle')}
        />
        <SearchSuggestion
          description='Interesting oracles'
          information='5 oracles'
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
}

export default ExploreNew
