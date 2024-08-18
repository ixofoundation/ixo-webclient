import { ActionIcon, Box, Flex, Text, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import KeyValueTable, { friendlyLinkedResourceNames, getLinkedResourceIcons } from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { AddLinkedResourceModal, LinkedResourceSetupModal } from 'components/Modals'
import { upperFirst } from 'lodash'
import { useMemo, useState } from 'react'
import { LiaPlusSolid } from 'react-icons/lia'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { addLinkedResource } from 'redux/createFlow/slice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'

const excludedResourceTypes = ['Settings', 'VerifiableCredential']

export const CreateFlowResourceTable = ({ title }: { title?: string }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const { linkedResource } = useAppSelector((state) => state.createFlow)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const [isOpen, { open, close }] = useDisclosure(false)
  const [resourceKey, setResourceKey] = useState('')
  const dispatch = useAppDispatch()

  const tableData = useMemo(() => {
    return linkedResource.filter((resource) => !excludedResourceTypes.includes(resource.type))
  }, [linkedResource])

  const linkedResourceColumns: Column[] = [
    {
      title: '',
      render: (row: any) => getLinkedResourceIcons(row.mediaType, { color: primaryColor }),
      style: { style: { width: rem(30) } },
    },
    {
      title: 'Resource',
      render: (row: any) => friendlyLinkedResourceNames(row.mediaType),
      style: { style: { width: '100%' } },
    },
    {
      title: 'File',
      render: (row: any) => upperFirst(row?.description),
      style: { style: { width: rem(30) } },
    },
    {
      title: 'Type',
      render: (row: any) => upperFirst(row?.type),
      style: { style: { width: rem(40) } },
    },
    {
      title: 'Access',
      render: (row: any) => <Text>Yes</Text>,
      style: { style: { width: rem(30) } },
    },
  ]

  const addLinkedResourceKey = (key: any) => {
    console.log({ key })
    setResourceKey(key)
  }

  const addLinkedResourceToState = (resource: any) => {
    const emptyResource = {
      id: '',
      type: '',
      description: '',
      mediaType: '',
      serviceEndpoint: '',
      proof: '',
      encrypted: 'false',
      right: '',
    }
    dispatch(addLinkedResource({ ...emptyResource, ...resource }))
    setResourceKey('')
  }

  console.log()

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='70%'>
        <Text fz={'lg'}>{title}</Text>
        <KeyValueTable
          valueType={'resource'}
          columns={linkedResourceColumns}
          data={tableData}
          themeColor={primaryColor}
        />
        <Flex
          bg='#F2FEFF'
          h={60}
          w='100%'
          style={{ borderRadius: '10px' }}
          p={10}
          align='center'
          gap={20}
          onClick={open}
        >
          <ActionIcon bg='transparent' size='md'>
            <LiaPlusSolid fill='#00D2FF' size={20} />
          </ActionIcon>
          <Text c='#00D2FF' fz={14}>
            Add a Resource
          </Text>
        </Flex>
      </Box>
      <AddLinkedResourceModal open={isOpen} onClose={close} onAdd={addLinkedResourceKey} />
      {resourceKey && (
        <LinkedResourceSetupModal
          linkedResource={{ type: resourceKey } as any}
          open={Boolean(resourceKey)}
          onClose={close}
          onChange={addLinkedResourceToState}
        />
      )}
    </Flex>
  )
}
