import React from 'react'
import { HeaderImage, ImageDescription } from './Header.styles'

interface Props {
  name: string
  imageDescription: string
  image: string
}

const Header: React.FunctionComponent<Props> = ({ name, image, imageDescription }) => {
  return (
    <>
      <HeaderImage src={image} alt={name} />
      <ImageDescription>{imageDescription}</ImageDescription>
    </>
  )
}

export default Header
