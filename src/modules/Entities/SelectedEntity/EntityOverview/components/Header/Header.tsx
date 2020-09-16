import React from 'react'
import { HeaderImage, Description } from './Header.styles'

interface Props {
  name: string
  description: string
  image: string
}

const Header: React.FunctionComponent<Props> = ({
  name,
  image,
  description,
}) => {
  return (
    <>
      <HeaderImage src={image} alt={name} />
      <Description>{description}</Description>
    </>
  )
}

export default Header
