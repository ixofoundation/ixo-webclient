import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { Typography } from 'components/Typography'
import React from 'react'
import { Flex, useMantineTheme } from '@mantine/core'
import { serviceEndpointToUrl } from 'utils/entities'
import { LiaFileAlt, LiaFilePdf, LiaImage } from 'react-icons/lia'

const MediaTypeToIconMap = {
  'application/pdf': LiaFilePdf,
  'image/jpeg': LiaImage,
  'image/png': LiaImage,
  'text/plain': LiaFileAlt,
}

const LinkedFileBox = (props: LinkedResource & { service: any }) => {
  const theme = useMantineTheme()
  const Icon = MediaTypeToIconMap[props.mediaType]
  const to = serviceEndpointToUrl(props.serviceEndpoint, props.service)

  return (
    <a href={to} target='_blank' rel='noreferrer'>
      <Flex
        w='150px'
        py={4}
        px={5}
        style={{ borderRadius: '4px', background: '#F8F9FD', cursor: 'pointer' }}
        direction='column'
        align='center'
        justify='center'
        gap={2}
        color={theme.colors.black[5]}
      >
        {Icon && <Icon />}
        <Typography weight='medium'>{props.description}</Typography>
      </Flex>
    </a>
  )
}

interface Props {
  linkedFiles: LinkedResource[]
  service?: any
}

const LinkedFiles: React.FC<Props> = ({ linkedFiles, service }) => {
  if (linkedFiles.length === 0) {
    return null
  }
  return (
    <Flex w='100%' direction='column' gap={5} px={5} pt={5} pb={9} bg='white' style={{ borderRadius: '4px' }}>
      <Typography variant='secondary' size='2xl'>
        Linked Files
      </Typography>
      <Flex gap={4} wrap='wrap'>
        {linkedFiles.map((linkedFile: LinkedResource, index: number) => (
          <LinkedFileBox key={index} {...linkedFile} service={service} />
        ))}
      </Flex>
    </Flex>
  )
}

export default LinkedFiles
