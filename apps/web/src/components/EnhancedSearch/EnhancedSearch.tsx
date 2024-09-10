import { Accordion, Avatar, Badge, Box, Flex, Text, TextInput, useMantineTheme, Skeleton } from '@mantine/core'

import AssistantIcon from 'assets/images/icon-assistant.svg'
import { useExplorerContext } from 'contexts/ExplorerContext'
import { useMemo, useState, useEffect, useRef } from 'react'
import { LiaObjectGroup } from 'react-icons/lia'
import countries from 'constants/maps/countryLatLng.json'
import { DaoIcon } from 'components/Icons'
import { AssetIcon } from 'components/Icons/AssetIcon'
import { InvestmentIcon } from 'components/Icons/InvestmentIcon'
import { ProjectIcon } from 'components/Icons/ProjectIcon'
import { Link, useNavigate } from 'react-router-dom'
import styles from './EnhancedSearch.module.css'
import { EntityInterface } from 'redux/entitiesState/slice'
import { useDisclosure } from '@mantine/hooks'

type AccordionItemProps = {
  type: string
  entities: any
}

const entityTypeTagMap = {
  dao: 'Dao Type',
  project: 'Project Type',
  asset: 'Asset Type',
  investment: 'Investment Type',
}

const includedEntityTypes = ['dao', 'project', 'asset', 'investment']

const AccordionEntityItem = ({ entity, isLoading }: { entity?: EntityInterface; isLoading: boolean }) => {
  if (isLoading || !entity) {
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
          <Avatar src={entity.settings?.Profile?.data?.image} alt={entity.settings?.Profile?.data?.name} size={24} />
          <Text ml={15}>{entity.settings?.Profile?.data?.name}</Text>
        </Flex>
        <Text w={180} size='sm' c='dimmed'>
          {
            entity?.settings?.Tags?.data?.tags?.find((tag: any) => tag?.category === entityTypeTagMap[entity.type])
              ?.tags[0]
          }
        </Text>
        <Text w={100} size='sm' c='dimmed'>
          {entity.settings?.Profile?.data?.location === 'AA'
            ? 'Global'
            : countries.find((country) => country.alpha2 === entity.settings?.Profile?.data?.location)?.country}
        </Text>
      </Flex>
    </Link>
  )
}

const typeToIconMap = {
  dao: <DaoIcon fill='#00D2FF' size={15} />,
  project: <ProjectIcon fill='#00D2FF' size={15} />,
  asset: <AssetIcon fill='#00D2FF' size={15} />,
  investment: <InvestmentIcon fill='#00D2FF' size={15} />,
}

const AccordionItem = ({ type, entities, isLoading }: AccordionItemProps & { isLoading: boolean }) => {
  const limitedEntities = entities.slice(0, 10)
  return (
    <Accordion.Item key={type} value={type} className={styles.accordionItem}>
      <Accordion.Control styles={{ control: { outline: 'none' } }}>
        <Flex justify={'space-between'} align='center'>
          <Badge size='xl' fz={14} leftSection={typeToIconMap[type]} c='#00D2FF' bg='#F9F9F9' tt='capitalize' fw={500}>
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
              <AccordionEntityItem key={`skeleton-${type}-${index}`} isLoading={true} />
            ))
          : limitedEntities.map((entity: any) => (
              <AccordionEntityItem key={entity.id} entity={entity} isLoading={false} />
            ))}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export const EnhancedSearch = () => {
  const [isOpen, { open: openSearch, close: closeSearch }] = useDisclosure(false)
  const { searchString, setSearchString, entities, entitiesLoading } = useExplorerContext()
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)

  const groupEntities = useMemo(() => {
    return entities.reduce(
      (acc, entity) => {
        const type = entity.type
        if (!acc[type]) {
          acc[type] = { type, entities: [] }
        }
        if (acc[type].entities.length < 5) {
          acc[type].entities.push(entity)
        }
        return acc
      },
      {} as Record<string, { type: string; entities: any[] }>,
    )
  }, [entities])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeSearch])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
    if (event.target.value.length > 0) {
      openSearch()
    } else {
      closeSearch()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      closeSearch()
      // You might want to trigger a search action here
    }
  }

  const handleAssistantIconClick = () => {
    closeSearch()
    navigate('/explore-new/search')
  }

  return (
    <Flex direction='column' pos={'relative'} w='600px' mx='auto' ref={searchRef}>
      <TextInput
        radius={'md'}
        rightSection={<AssistantIcon onClick={handleAssistantIconClick} />}
        size='lg'
        placeholder='Search'
        style={{ overflow: 'hidden', zIndex: 2 }}
        value={searchString}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
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
            <Accordion style={{ width: '100%' }} defaultValue={Object.keys(groupEntities)[0]}>
              {Object.entries(groupEntities).map(([type, { entities }]) => (
                <AccordionItem key={type} type={type} entities={entities} isLoading={entitiesLoading} />
              ))}
            </Accordion>
          </Flex>
        </Box>
      )}
    </Flex>
  )
}
