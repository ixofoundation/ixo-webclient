import React, { useState } from 'react'
import styled from 'styled-components'
import { theme, Typography } from 'components/App/App.styles'
import { ImageUploadModal } from 'modals'

const Wrapper = styled.div<{ background?: string }>`
  ${(props): string =>
    props.background
      ? `background: url(${props.background}) center center no-repeat;`
      : `background: ${props.theme.ixoNewBlue};`}
  background-size: contain;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  text-align: center;

  width: 60px;
  height: 60px;

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
  border-radius: 50%;
`

interface Props {
  icon: string
  handleChange: (value: any) => void
}

const IconUpload: React.FC<Props> = ({ icon, handleChange }): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Wrapper background={icon} onClick={(): void => setOpenModal(true)}>
        {!icon ? (
          <Typography fontWeight={600} fontSize='14px' lineHeight='18px' color={theme.ixoWhite}>
            Asset Icon
          </Typography>
        ) : (
          <Overlay>
            <Typography fontWeight={600} fontSize='14px' lineHeight='18px' color={theme.ixoWhite}>
              Replace
            </Typography>
          </Overlay>
        )}
      </Wrapper>
      <ImageUploadModal
        aspect={1}
        circularCrop={true}
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={icon}
        handleChange={handleChange}
      />
    </>
  )
}

export default IconUpload
