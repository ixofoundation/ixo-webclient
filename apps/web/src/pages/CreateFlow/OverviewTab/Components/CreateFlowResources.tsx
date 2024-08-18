import { Flex } from '@mantine/core'
import { CreateFlowResourceTable } from 'pages/CreateFlow/Components/CreateFlowResourceTable'
import { CreateFlowServiceTable } from 'pages/CreateFlow/Components/CreateFlowServiceTable'

const CreateFlowResources = () => {
  return (
    <Flex direction={'column'} w={'100%'}>
      <CreateFlowResourceTable title='Linked Resources' />
      <CreateFlowServiceTable title='Services' />
    </Flex>
  )
}

export default CreateFlowResources
