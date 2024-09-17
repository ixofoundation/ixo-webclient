import { Flex } from '@mantine/core'
import { PDFIcon } from 'components/Icons/PDFIcon'
import { StorageIcon } from 'components/Icons/StorageIcon'
import { LiaCodeSolid, LiaExternalLinkAltSolid, LiaFile } from 'react-icons/lia'

const iconStyles = {
  size: 20,
  fill: 'white',
  stroke: 'white',
}

export const getLinkedResourceIcons = (mediaType: string, styles?: { color: string }) => {
  const getIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'application/pdf':
        return <PDFIcon {...iconStyles} {...styles} />
      case 'text/html':
        return <LiaExternalLinkAltSolid {...iconStyles} {...styles} />
      case 'application/json':
      case 'application/json-ld':
        return <LiaCodeSolid {...iconStyles} {...styles} />
      default:
        return <LiaFile {...iconStyles} {...styles} />
    }
  }

  return (
    <Flex justify='center' align='center' bg='#D5D5D5' w={32} h={32} styles={{ root: { borderRadius: 4 } }}>
      {getIcon(mediaType)}
    </Flex>
  )
}

export const getServicesIcon = (styles?: { color: string }) => {
  return (
    <Flex justify='center' align='center' bg='#D5D5D5' w={32} h={32} styles={{ root: { borderRadius: 4 } }}>
      <StorageIcon {...iconStyles} {...styles} />
    </Flex>
  )
}
