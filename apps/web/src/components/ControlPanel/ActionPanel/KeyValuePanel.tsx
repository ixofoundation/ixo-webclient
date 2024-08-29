import { Anchor, Box, Button, Flex, Text } from '@mantine/core'
import { truncate, upperFirst } from 'lodash'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useTheme } from 'styled-components'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { transformStorageEndpoint } from '@ixo-webclient/utils'
import { ActionCard } from 'components/ActionCard'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { createPlugins } from 'components/ReactPDFViewer/PageThumbnailPlugin'
import { Link } from 'react-router-dom'

const KeyValuePanel = ({ data }: { data: any }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const serviceEnpointURL = transformStorageEndpoint(data?.serviceEndpoint)
  const plugins = createPlugins()

  const renderValue = (data: any, key: string) => {
    // if (key === 'file') {
    //   return (
    //     <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 5 }}>
    //       <object className='pdfIframe' data={serviceEndpointToUrl(data[key], service)}></object>
    //     </Flex>
    //   )
    // }

    if (data[key] === undefined || data[key]?.length <= 0)
      return (
        <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 50 }}>
          <Text ml={25} size='sm'>
            {'N/A'}
          </Text>
        </Flex>
      )

    return (
      <Flex w='100%' bg='#E8E8E9' p={10} style={{ borderRadius: 50 }} align={'center'}>
        <Text ml={25} size='sm'>
          {truncate(data[key], { length: 30 })}{' '}
        </Text>
        {key === 'serviceEndpoint' && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={transformStorageEndpoint(data[key])}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <LiaExternalLinkAltSolid size={24} style={{ verticalAlign: 'middle' }} />
          </a>
        )}
      </Flex>
    )
  }

  return (
    <ActionCard
      title={upperFirst(data?.type.split('#')[1])}
      icon={<AssistantIcon height={15} width={15} />}
      editable={false}
    >
      <Box h={260}>
        {serviceEnpointURL && (
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
            <Viewer fileUrl={serviceEnpointURL} plugins={plugins} />
          </Worker>
        )}
      </Box>
      <ActionCard.Footer>
        <Button
          component='a'
          w='100%'
          variant='outline'
          radius='sm'
          target='_blank'
          rel='noopener noreferrer'
          href={transformStorageEndpoint(serviceEnpointURL)}
        >
          View
        </Button>
      </ActionCard.Footer>
    </ActionCard>
  )
}

export default KeyValuePanel
