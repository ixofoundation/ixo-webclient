import { FC } from 'react'
import { requireCheckDefault } from 'utils/images'

import { ButtonImage } from '../Filters.styles'

interface Props {
  icon: string
}

const IconButtonImage: FC<Props> = ({ icon, ...props }) => {
  return (
    <ButtonImage src={requireCheckDefault(require(`assets/icons/${icon}`))} alt={icon.replace('.svg', '')} {...props} />
  )
}

export default IconButtonImage
