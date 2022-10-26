import React, { useState } from 'react'
import styled from 'styled-components'
import { theme, Typography } from 'modules/App/App.styles'
import { ImageUploadModal } from 'common/modals'

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
  border-radius: 50%;
  transition: all 0.2s;
  text-align: center;

  width: 60px;
  height: 60px;

  &:hover {
    opacity: 0.8;
  }
`

interface Props {
  icon: string
  handleChange: (value) => void
}

const IconUpload: React.FC<Props> = ({ icon, handleChange }): JSX.Element => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <Wrapper background={icon} onClick={(): void => setOpenModal(true)}>
        {!icon && (
          <Typography
            fontWeight={600}
            fontSize="14px"
            lineHeight="18px"
            color={theme.ixoWhite}
          >
            Asset Icon
          </Typography>
        )}
      </Wrapper>
      <ImageUploadModal
        open={openModal}
        onClose={(): void => setOpenModal(false)}
        value={icon}
        handleChange={handleChange}
      />
    </>
  )
}

export default IconUpload
