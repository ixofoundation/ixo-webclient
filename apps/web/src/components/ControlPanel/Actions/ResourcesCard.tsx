import { Flex, Box, Text, Avatar, ActionIcon } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaLinkSolid, LiaFilePdfSolid, LiaFileImageSolid, LiaExternalLinkSquareAltSolid } from 'react-icons/lia'
import { TEntityModel } from 'types/entities'
import { serviceEndpointToUrl } from 'utils/entities'
import { Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
type ResourcesCardProps = {
  entity: TEntityModel
}

const getResourceIcon = (mediaType: string) => {
  if (mediaType === 'pdf') {
    return <LiaFilePdfSolid size='1.5rem' />
  }
  if (mediaType === 'image') {
    return <LiaFileImageSolid size='1.5rem' />
  }
  return <LiaLinkSolid size='1.5rem' />
}

const ResourceItem = ({
  mediaType,
  description,
  id,
  serviceEndpoint,
  service,
}: {
  mediaType: string
  description: string
  id: string
  serviceEndpoint: string
  service: Service[]
}) => {
  const idName = id.split('#')[1]
  let extension = ''

  switch (mediaType) {
    case 'application/pdf':
      extension = '.pdf'
      break
    case 'image/jpeg':
    case 'image/png':
      extension = '.jpg'
      break
    default:
      extension = ''
  }

  const filename = `${idName}${extension}`

  const handleOpen = () => {
    window.open(serviceEndpointToUrl(serviceEndpoint, service), '_blank')
  }
  return (
    <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }} gap='md' mb='sm'>
      <Avatar radius='sm'>{getResourceIcon('pdf')}</Avatar>
      <Box ml={4}>
        <Text>{description}</Text>
        <Text size='sm' c='dimmed'>
          {filename}
        </Text>
      </Box>
      <Box ml='auto'>
        <ActionIcon variant='transparent' color='gray' onClick={handleOpen}>
          <LiaExternalLinkSquareAltSolid size='1.5rem' />
        </ActionIcon>
      </Box>
    </Flex>
  )
}

const ResourcesCard = ({ entity }: ResourcesCardProps) => {
  return (
    <ActionCard title='Resources' icon={<LiaLinkSolid />}>
      {entity.linkedResource.map((resource) => (
        <ResourceItem
          mediaType={resource.mediaType}
          description={resource.description}
          id={resource.id}
          serviceEndpoint={resource.serviceEndpoint}
          service={entity.service}
        />
      ))}
    </ActionCard>
  )
}

export default ResourcesCard
