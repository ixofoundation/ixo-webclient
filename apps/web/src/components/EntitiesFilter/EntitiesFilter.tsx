import { Modal, Button, Flex, Text, Pill, Divider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ControlsIcon } from 'components/Icons/ControlsIcon'

const FilterItem = ({ title, description, items }: { title: string; description: string; items: string[] }) => {
  return (
    <Flex direction='column'>
      <Text fz='xl' fw='400'>
        {title}
      </Text>
      <Text fz='md' mt='xs'>
        {description}
      </Text>
      <Flex gap='md' mt={10}>
        {items.map((item) => (
          <Pill size='lg' key={item}>
            {item}
          </Pill>
        ))}
      </Flex>
    </Flex>
  )
}

export const EntitiesFilter = () => {
  return (
    <Flex direction='column'>
      <Divider my='md' />

      <FilterItem title='Entity Type' description='Filter by entity type' items={['Project', 'DAO', 'Oracle']} />
      <Divider my='md' />
      <Flex gap='lg' w='100%'>
        <Button color='gray.2' w='100%' radius='xl' c='black' size='md' fw='400'>
          Remove all
        </Button>
        <Button w='100%' radius='xl' size='md' fw='400'>
          Apply
        </Button>
      </Flex>
    </Flex>
  )
}

export const EntitiesFilterModal = () => {
  const [isOpen, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal opened={isOpen} onClose={close} title='Filters' radius={'md'} size='lg'>
        <EntitiesFilter />
      </Modal>
      <Button leftSection={<ControlsIcon />} variant='outline' radius={'md'} style={{ outline: 'none' }} onClick={open}>
        Filter
      </Button>
    </>
  )
}
