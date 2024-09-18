import { transformStorageEndpoint } from 'new-utils'
import { LinkedResourceSDKType } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Box, Button, Flex, Image, ScrollArea, Text } from '@mantine/core'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { ActionCard } from 'components/ActionCard'
import { createPlugins } from 'components/ReactPDFViewer/PageThumbnailPlugin'
import { truncate, upperFirst } from 'lodash'
import { useEffect, useState } from 'react'
import { LiaExternalLinkAltSolid } from 'react-icons/lia'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { useAppSelector } from 'redux/hooks'
import { useTheme } from 'styled-components'

const KeyValuePanel = ({ data }: { data: any }) => {
  const theme = useTheme()
  const config = useAppSelector(selectEntityConfig)
  const primaryColor = config.theme.primaryColor ?? theme.ixoNewBlue
  const serviceEnpointURL = transformStorageEndpoint(data?.serviceEndpoint)

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
      icon={<img src='/assets/images/icon-assistant.svg' height={15} width={15} />}
      editable={false}
    >
      <Box h={260}>
        <PreviewDoc data={data} />
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

const isText = (data: LinkedResourceSDKType) => data?.mediaType && data?.mediaType.includes('text')
const isImage = (data: LinkedResourceSDKType) => data?.mediaType && data?.mediaType.includes('image')
const isPDF = (data: LinkedResourceSDKType) => data?.mediaType && data?.mediaType.includes('pdf')
const isJson = (data: LinkedResourceSDKType) => data?.mediaType && data?.mediaType.includes('json')

const PreviewDoc = ({ data }: { data: LinkedResourceSDKType }) => {
  const fileUrl = transformStorageEndpoint(data?.serviceEndpoint)
  if (!fileUrl) return null

  if (isPDF(data)) {
    const plugins = createPlugins()
    return (
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js'>
        <Viewer fileUrl={fileUrl} plugins={plugins} />
      </Worker>
    )
  }

  if (isImage(data)) {
    return <Image h={260} fit='cover' src={fileUrl} alt='Resource' />
  }

  if (isText(data)) {
    const res = fileUrl && fetch(fileUrl)
    return (
      <Flex w='100%' bg='#E8E8E9' h={'100%'} p={10} style={{ borderRadius: 50 }}>
        <PreviewTextFile url={fileUrl} />
      </Flex>
    )
  }

  if (isJson(data)) {
    return (
      <ScrollArea h={260} type='hover'>
        <Flex w='100%' bg='#E8E8E9' p={10}>
          <p>
            <code>{JSON.stringify(data, null, 2)}</code>
          </p>
        </Flex>
      </ScrollArea>
    )
  }

  return 'Could not load the resource please click the view button to view the resource on the browser tab'
}

const PreviewTextFile = ({ url }: { url: string }) => {
  const [text, setText] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch text file')
        const text = await response.text()
        setText(text)
      } catch (error) {
        console.error('Error fetching text file', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (loading) return <Text>Loading...</Text>

  if (!text) return <Text>Failed to load the Text file please Click View to open the file in browser</Text>

  return (
    <ScrollArea h={260} type='hover'>
      <Text p={10} h={'100%'}>
        {truncate(text, {
          length: 1000,
        })}
      </Text>
    </ScrollArea>
  )
}

export default KeyValuePanel
