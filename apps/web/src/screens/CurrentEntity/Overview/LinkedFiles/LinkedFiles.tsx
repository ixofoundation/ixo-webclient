import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'

import { useTheme } from 'styled-components'
import { serviceEndpointToUrl } from 'utils/entities'

const MediaTypeToIconMap = {
  'application/pdf': '/assets/images/linked-files/pdf.svg',
  'image/jpeg': '/assets/images/linked-files/image.svg',
  'image/png': '/assets/images/linked-files/image.svg',
  'text/plain': '/assets/images/linked-files/text.svg',
}

const LinkedFileBox = (props: LinkedResource & { service: any }) => {
  const theme: any = useTheme()
  const Icon = MediaTypeToIconMap[props.mediaType as keyof typeof MediaTypeToIconMap]
  const to = serviceEndpointToUrl(props.serviceEndpoint, props.service)

  return (
    <a href={to} target='_blank' rel='noreferrer'>
      <FlexBox
        width='150px'
        py={4}
        px={5}
        $borderRadius='4px'
        background='#F8F9FD'
        $direction='column'
        $alignItems='center'
        $justifyContent='center'
        $gap={2}
        $textAlign='center'
        cursor='pointer'
        color={theme.ixoBlack}
      >
        {Icon && <img src={Icon} />}
        <Typography weight='medium'>{props.description}</Typography>
      </FlexBox>
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
    <FlexBox width='100%' $direction='column' $gap={5} px={5} pt={5} pb={9} background='white' $borderRadius='4px'>
      <Typography variant='secondary' size='2xl'>
        Linked Files
      </Typography>
      <FlexBox $gap={4} $flexWrap='wrap'>
        {linkedFiles.map((linkedFile: LinkedResource, index: number) => (
          <LinkedFileBox key={index} {...linkedFile} service={service} />
        ))}
      </FlexBox>
    </FlexBox>
  )
}

export default LinkedFiles
