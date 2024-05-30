import { LiaCodeSolid, LiaExternalLinkAltSolid, LiaFile, LiaFilePdf } from 'react-icons/lia'

const iconStyles = {
    size: 24
}

export const getLinkedResourceIcons = (mediaType: string, styles?: { color: string }) => {
  switch (mediaType) {
    case 'application/pdf':
      return <LiaFilePdf {...iconStyles} {...styles} />
    case 'text/html':
      return <LiaExternalLinkAltSolid {...iconStyles} />
    case 'application/json':
    case 'application/json-ld':
      return <LiaCodeSolid {...iconStyles} />
    default:
      return <LiaFile {...iconStyles} />
  }
}
