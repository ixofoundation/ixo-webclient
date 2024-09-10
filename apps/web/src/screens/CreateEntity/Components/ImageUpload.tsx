import React, { useState } from 'react'
import styled from 'styled-components'

import IconImage from 'assets/images/icon-image-fill.svg'
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
  image: string | undefined
  handleChange: (value: string) => void
  allowEdit?: boolean
}

const ImageUpload: React.FC<Props> = ({ image, handleChange, allowEdit = true }): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)

  const handleClick = () => {
    if (allowEdit) {
      setOpenModal(true)
    }
  }
  return (
    <>
      <Wrapper background={image} onClick={handleClick}>
        {!image ? (
          <>
            <IconImage />
            <Typography color='white' size='xl'>
              Upload an Image
            </Typography>
            <Typography color='white' size='xl'>
              or provide a valid image link
            </Typography>
          </>
        ) : (
          allowEdit && (
            <Overlay>
              <IconImage />
              <Typography color='white' size='xl'>
                Click to replace
              </Typography>
            </Overlay>
          )
        )}
      </Wrapper>
      <ImageUploadModal
        aspect={16 / 9}
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={image || ''}
        handleChange={handleChange}
      />
    </>
  )
}

export default ImageUpload
