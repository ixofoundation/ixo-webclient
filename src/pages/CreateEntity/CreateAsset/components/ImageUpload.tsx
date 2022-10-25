import React, { useState } from 'react'
import styled from 'styled-components'
import { theme, Typography } from 'modules/App/App.styles'
import { ReactComponent as IconImage } from 'assets/images/icon-image.svg'
import { ImageUploadModal } from 'common/modals'

const Wrapper = styled.div<{ background?: string }>`
  ${(props): string =>
    props.background
      ? `background: url(${props.background}) center center no-repeat;`
      : `background: ${props.theme.ixoNewBlue};`}
  background-size: cover;

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

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

interface Props {
  image: string
  handleChange: (value: string) => void
}

const ImageUpload: React.FC<Props> = ({ image, handleChange }): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Wrapper background={image} onClick={(): void => setOpenModal(true)}>
        {!image ? (
          <>
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
          </>
        ) : (
          <Overlay>
            <IconImage className="mb-3" />
            <Typography
              fontWeight={600}
              fontSize="16px"
              lineHeight="20px"
              color={theme.ixoWhite}
            >
              Click to replace
            </Typography>
          </Overlay>
        )}
      </Wrapper>
      <ImageUploadModal
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={image}
        handleChange={handleChange}
      />
    </>
  )
}

export default ImageUpload
