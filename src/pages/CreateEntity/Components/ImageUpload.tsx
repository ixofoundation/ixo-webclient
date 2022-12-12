import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as IconImage } from 'assets/images/icon-image-fill.svg'
import { ImageUploadModal } from 'components/Modals'
import { Typography } from 'components/Typography'

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
            <IconImage className='mb-3' />
            <Typography weight='semi-bold' color='white'>
              Upload an Image
            </Typography>
            <Typography weight='semi-bold' color='white'>
              or provide a valid image link
            </Typography>
          </>
        ) : (
          <Overlay>
            <IconImage className='mb-3' />
            <Typography weight='semi-bold' color='white'>
              Click to replace
            </Typography>
          </Overlay>
        )}
      </Wrapper>
      <ImageUploadModal
        aspect={16 / 9}
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={image}
        handleChange={handleChange}
      />
    </>
  )
}

export default ImageUpload
