import React from 'react'
import styled from 'styled-components'
import { theme, Typography } from 'modules/App/App.styles'
import { ReactComponent as IconImage } from 'assets/images/icon-image.svg'

const Wrapper = styled.div<{ background?: string }>`
  ${(props): string =>
    props.background
      ? `background: url(${props.background}) center center no-repeat;`
      : `background: ${props.theme.ixoNewBlue};`}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: inherit;
  transition: all 0.2s;

  width: 100%;
  height: 240px;

  &:hover {
    opacity: 0.8;
  }
`

interface Props {
  image: string
  handleChange: (value) => void
}

const ImageUpload: React.FC<Props> = ({ image }): JSX.Element => {
  return (
    <Wrapper background={image}>
      <IconImage className="mb-3" />
      <Typography
        fontWeight={600}
        fontSize="16px"
        lineHeight="20px"
        color={theme.ixoWhite}
      >
        Upload an Image
      </Typography>
      <Typography
        fontWeight={600}
        fontSize="16px"
        lineHeight="20px"
        color={theme.ixoWhite}
      >
        or provide a valid image link
      </Typography>
    </Wrapper>
  )
}

export default ImageUpload
