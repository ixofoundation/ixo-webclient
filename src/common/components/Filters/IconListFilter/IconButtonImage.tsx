import React, { FC } from 'react'

import { ButtonImage } from '../Filters.styles'

interface Props {
  icon: string
}

const IconButtonImage: FC<Props> = ({ icon, ...props }) => {
  return (
    <ButtonImage
      src={require(`./assets/icons/${icon}`)}
      alt={icon.replace('.svg', '')}
      {...props}
    />
  )
}

export default IconButtonImage
