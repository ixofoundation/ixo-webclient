import { Accordion, Avatar, Badge, Box, Flex, Text, TextInput, useMantineTheme, Skeleton } from '@mantine/core'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useExplorerContext } from 'contexts/ExplorerContext'
import { useMemo, useState, useEffect } from 'react'
import { LiaObjectGroup } from 'react-icons/lia'
import countries from 'constants/maps/countryLatLng.json'
import { DaoIcon } from 'components/Icons'
import { AssetIcon } from 'components/Icons/AssetIcon'
import { InvestmentIcon } from 'components/Icons/InvestmentIcon'
import { ProjectIcon } from 'components/Icons/ProjectIcon'
import { Link } from 'react-router-dom'
import styles from './EnhancedSearch.module.css'

type AccordionItemProps = {
  type: string
  entities: any
  icon: React.ReactNode
}

const entityTypeTagMap = {
  dao: 'Dao Type',
  project: 'Project Type',
  asset: 'Asset Type',
  investment: 'Investment Type',
}

const includedEntityTypes = ['dao', 'project', 'asset', 'investment']

const AccordionEntityItem = ({ entity, isLoading }: { entity: any; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <Flex p={8} align='center' justify={'space-between'}>
        <Flex align='center' w={270}>
          <Skeleton height={24} circle />
          <Skeleton height={20} ml={15} width={200} />
        </Flex>
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={100} />
      </Flex>
    )
  }

  return (
    <Link to={`/entity/${entity.id}/overview/page`} style={{ textDecoration: 'none', color: 'black' }}>
      <Flex p={12} align='center' justify={'space-between'} td='none' className={styles.entityItem}>
        <Flex align='center' w={270}>
          <Avatar src={entity.profile.image} alt={entity.profile.name} size={24} />
          <Text ml={15}>{entity.profile.name}</Text>
        </Flex>
        <Text w={180} size='sm' c='dimmed'>
          {entity?.tags?.find((tag: any) => tag?.category === entityTypeTagMap[entity.type])?.tags[0]}
        </Text>
        <Text w={100} size='sm' c='dimmed'>
          {entity.profile.location === 'AA'
            ? 'Global'
            : countries.find((country) => country.alpha2 === entity.profile.location)?.country}
        </Text>
      </Flex>
    </Link>
  )
}

const AccordionItem = ({ type, entities, icon, isLoading }: AccordionItemProps & { isLoading: boolean }) => {
  const limitedEntities = entities.slice(0, 10)
  return (
    <Accordion.Item key={type} value={type} className={styles.accordionItem}>
      <Accordion.Control styles={{ control: { outline: 'none' } }}>
        <Flex justify={'space-between'} align='center'>
          <Badge size='xl' fz={14} leftSection={icon} c='#00D2FF' bg='#F9F9F9' tt='capitalize' fw={500}>
            {type}s
          </Badge>
          <Text c='dimmed' mr={4} fz={14}>
            {isLoading ? <Skeleton height={20} width={80} /> : `${entities.length} Results`}
          </Text>
        </Flex>
      </Accordion.Control>
      <Accordion.Panel>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <AccordionEntityItem key={`skeleton-${type}-${index}`} entity={{}} isLoading={true} />
            ))
          : limitedEntities.map((entity: any) => (
              <AccordionEntityItem key={entity.id} entity={entity} isLoading={false} />
            ))}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export const EnhancedSearch = () => {
  const { searchString, setSearchString, entities } = useExplorerContext()
  const theme = useMantineTheme()

  const [debouncedSearchString, setDebouncedSearchString] = useState(searchString)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const handler = setTimeout(() => {
      setDebouncedSearchString(searchString)
      setIsLoading(false)
    }, 900)

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
      dao: <DaoIcon fill='#00D2FF' size={15} />,
      project: <ProjectIcon fill='#00D2FF' size={15} />,
      asset: <AssetIcon fill='#00D2FF' size={15} />,
      investment: <InvestmentIcon fill='#00D2FF' size={15} />,
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
      .map(([_, value]: any) => ({ ...value, entities: value.entities.slice(0, 10) }))
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
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />
      {searchString && (
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
                <AccordionItem key={item.type} {...item} isLoading={isLoading} />
              ))}
            </Accordion>
          </Flex>
        </Box>
      )}
    </Flex>
  )
}
