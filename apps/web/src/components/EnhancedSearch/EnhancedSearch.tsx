import { Accordion, Avatar, Badge, Box, Flex, Text, TextInput, useMantineTheme } from '@mantine/core'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useExplorerContext } from 'contexts/ExplorerContext'
import { useMemo, useState, useEffect } from 'react'
import { LiaObjectGroup, LiaRProject } from 'react-icons/lia'
import countries from 'constants/maps/countryLatLng.json'
import { DaoIcon } from 'components/Icons'
import Project from 'assets/icons/Project'

type AccordionItemProps = {
  type: string
  entities: any
  icon: React.ReactNode
}

const entityTypeTagMap = {
  dao: 'Dao Type',
  project: 'Project Type',
}

const includedEntityTypes = ['dao', 'project']

const AccordionEntityItem = ({ entity }: { entity: any }) => {
  return (
    <Flex p={8} align='center' justify={'space-between'}>
      <Flex align='center' w={270}>
        <Avatar src={entity.profile.image} alt={entity.profile.name} />
        <Text ml={15}>{entity.profile.name}</Text>
      </Flex>
      <Text w={150} c='dimmed'>
        {entity?.tags?.find((tag: any) => tag?.category === entityTypeTagMap[entity.type])?.tags[0]}
      </Text>
      <Text w={150} c='dimmed'>
        {entity.profile.location === 'AA'
          ? 'Global'
          : countries.find((country) => country.alpha2 === entity.profile.location)?.country}
      </Text>
    </Flex>
  )
}

const AccordionItem = ({ type, entities, icon }: AccordionItemProps) => {
  return (
    <Accordion.Item key={type} value={type}>
      <Accordion.Control styles={{ control: { outline: 'none' } }}>
        <Flex justify={'space-between'} align='center'>
          <Badge size='lg' fz={14} leftSection={icon} c='#00D2FF' bg='#F9F9F9'>
            {type}
          </Badge>
          <Text c='dimmed' mr={4} fz={14}>
            {entities.length} Results
          </Text>
        </Flex>
      </Accordion.Control>
      <Accordion.Panel>
        {entities.map((entity: any) => (
          <AccordionEntityItem key={entity.id} entity={entity} />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export const EnhancedSearch = () => {
  const { searchString, setSearchString, entities } = useExplorerContext()
  const theme = useMantineTheme()

  const [debouncedSearchString, setDebouncedSearchString] = useState(searchString)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchString(searchString)
    }, 300) // Adjust the delay as needed

    return () => {
      clearTimeout(handler)
    }
  }, [searchString])

  const entitiesGroupedByType = useMemo(() => {
    const matchesSearch = (entity: any) => {
      if (!entity.profile || !entity.profile.name || !entity.profile.description) return false
      const nameMatch = entity.profile.name.toLowerCase().includes(debouncedSearchString.toLowerCase())
      const descriptionMatch = entity.profile.description.toLowerCase().includes(debouncedSearchString.toLowerCase())
      return nameMatch || descriptionMatch
    }

    const typeToIconMap = {
      dao: <DaoIcon />,
      project: <Project />,
    }

    return Object.entries(
      entities.reduce(
        (acc, entity) => {
          if (!matchesSearch(entity)) return acc

          const type = entity.type
          if (!includedEntityTypes.includes(type)) return acc
          if (!acc[type]) {
            acc[type] = { type, entities: [], icon: typeToIconMap[type] || <LiaObjectGroup /> }
          }
          acc[type].entities.push(entity)
          return acc
        },
        {} as Record<string, { type: string; entities: any[]; icon: React.ReactNode }>,
      ),
    )
      .map(([_, value]) => value)
      .filter((group: any) => group.entities.length > 0) as any // Filter out empty groups
  }, [entities, debouncedSearchString])

  return (
    <Flex direction='column' pos={'relative'} w='600px' mx='auto'>
      <TextInput
        radius={'md'}
        rightSection={<AssistantIcon />}
        size='lg'
        placeholder='Search'
        style={{ overflow: 'hidden', zIndex: 2 }}
        onChange={(event) => setSearchString(event.target.value)}
      />
      {debouncedSearchString && (
        <Box
          bg='white'
          w='100%'
          p='md'
          mt='xs'
          style={{
            borderRadius: 10,
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            top: '100%',
            zIndex: 1,
          }}
        >
          <Text c={theme.colors.gray[6]}>Quick Results</Text>
          <Flex w='100%'>
            <Accordion style={{ width: '100%' }} defaultValue={entitiesGroupedByType[0]?.type}>
              {entitiesGroupedByType.map((item: any) => (
                <AccordionItem key={item.type} {...item} />
              ))}
            </Accordion>
          </Flex>
        </Box>
      )}
    </Flex>
  )
}
