import { LinkedResource, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import useCurrentEntity from 'hooks/currentEntity'
import React from 'react'
import { ReactComponent as PdfIcon } from 'assets/images/linked-files/pdf.svg'
import { ReactComponent as ImageIcon } from 'assets/images/linked-files/image.svg'
import { ReactComponent as TextIcon } from 'assets/images/linked-files/text.svg'

const MediaTypeToIconMap = {
  'application/pdf': PdfIcon,
  'application/image': ImageIcon,
  'application/text': TextIcon,
}

const LinkedFileBox = (linkedFile: LinkedResource) => {
  const { service } = useCurrentEntity()
  const Icon = MediaTypeToIconMap[linkedFile.mediaType]
  const [identifier, key] = linkedFile.serviceEndpoint.split(':')
  const usedService: Service | undefined = service.find((item: Service) => item.id.includes(identifier))
  const to = usedService ? usedService.serviceEndpoint + key : ''

  return (
    <a href={to} target='_blank' rel='noreferrer'>
      <FlexBox
        width='150px'
        py={4}
        px={5}
        borderRadius='4px'
        background='#F8F9FD'
        direction='column'
        alignItems='center'
        justifyContent='center'
        gap={2}
        textAlign='center'
        cursor='pointer'
        color={theme.ixoBlack}
      >
        <Icon />
        <Typography weight='medium'>{linkedFile.description}</Typography>
      </FlexBox>
    </a>
  )
}

interface Props {
  linkedFiles: LinkedResource[]
}

const LinkedFiles: React.FC<Props> = ({ linkedFiles }) => {
  if (linkedFiles.length === 0) {
    return null
  }
  return (
    <FlexBox width='100%' direction='column' gap={5} px={5} pt={5} pb={9} background='white' borderRadius='4px'>
      <Typography variant='secondary' size='2xl'>
        Linked Files
      </Typography>
      <FlexBox gap={4} flexWrap='wrap'>
        {linkedFiles.map((linkedFile: LinkedResource, index: number) => (
          <LinkedFileBox key={index} {...linkedFile} />
        ))}
      </FlexBox>
    </FlexBox>
  )
}

export default LinkedFiles
