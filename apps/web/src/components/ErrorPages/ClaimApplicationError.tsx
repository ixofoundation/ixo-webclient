import { Button, Flex, Text } from '@mantine/core'
import { useKeyValueViewerContext } from 'contexts/KeyValueViewerContext'
import { LiaArrowLeftSolid } from 'react-icons/lia'
import { useLocation, useNavigate } from 'react-router-dom'

const ClaimApplicationError = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { resetKeyValue } = useKeyValueViewerContext()

  const handleBack = () => {
    resetKeyValue()
    const search = new URLSearchParams()
    search.delete('collectionId')
    search.delete('agentRole')
    navigate({ pathname: pathname, search: search.toString() })
  }

  return (
    <Flex w='100%' h='500px' justify={'center'} align='center' gap={30} direction={'column'}>
      <Text fz={'xl'} fw='bold' c='#9A9A9A'>
        Application form closed, check back soon
      </Text>
      <Button radius={4} size='md' onClick={handleBack} leftSection={<LiaArrowLeftSolid />}>
        Back
      </Button>
    </Flex>
  )
}

export default ClaimApplicationError
