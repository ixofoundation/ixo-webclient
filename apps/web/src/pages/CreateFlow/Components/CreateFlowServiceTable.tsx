import { ActionIcon, Box, Flex, Text, rem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import KeyValueTable from 'components/KeyValueTable'
import { Column } from 'components/KeyValueTable/KeyValueTable'
import { ServiceSetupModal } from 'components/Modals'
import { LiaHddSolid, LiaPlusSolid } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { initialCellnodeService, initialIpfsService } from 'redux/createEntity/createEntity.reducer'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'

const initialServiceSetupState = [initialIpfsService, initialCellnodeService]

export const CreateFlowServiceTable = ({ title }: { title?: string }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const { service } = useAppSelector((state) => state.createFlow)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const [isOpen, { open, close }] = useDisclosure(false)

  const servicecolumns: Column[] = [
    {
      title: '',
      render: (row: any) => <LiaHddSolid size={24} color={primaryColor} />,
      style: { style: { width: rem(30) } },
    },
    {
      title: 'Service',
      render: (row: any) => row.type,
      style: { style: { width: '100%' } },
    },
    {
      title: 'Type',
      render: (row: any) => <Text>Storage</Text>,
      style: { style: { width: rem(40) } },
    },
    {
      title: 'Active',
      render: (row: any) => (row.type.includes('display') ? 'No' : 'Yes'),
      style: { style: { width: rem(30) } },
    },
  ]

  return (
    <Flex w='100%' justify={'center'}>
      <Box w='70%'>
        <Text fz={'lg'}>{title}</Text>
        <KeyValueTable valueType={'service'} columns={servicecolumns} data={service} themeColor={primaryColor} />
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
            Add a Service
          </Text>
        </Flex>
      </Box>
      <ServiceSetupModal open={isOpen} onClose={close} service={service} />
    </Flex>
  )
}
